import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/domain/repositories/user/user.const';
import { UserRepository } from 'src/domain/repositories/user/user.repository';
import { ERROR } from 'src/infrastructure/common/constants/error-code.consts';
import { EnvService } from 'src/infrastructure/env/env.service';
import { BcryptService } from 'src/infrastructure/services/bcrypt/bcrypt.service';
import { JwtService } from 'src/infrastructure/services/jwt/jwt.service';
import { RegisterUserDto } from 'src/presentation/http/dtos/auth/register-user.dto';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly bcryptService: BcryptService,
    private readonly envService: EnvService,
  ) {}

  async execute(registerUserDto: RegisterUserDto) {
    const existing = await this.userRepository.findByEmail(registerUserDto.email);

    if (existing) {
      throw new ConflictException(ERROR.AUTH.EMAIL_ALREADY_EXISTS);
    }

    const hashedPassword = await this.bcryptService.hash(registerUserDto.password);

    const user = await this.userRepository.create({
      ...registerUserDto,
      password: hashedPassword,
    });

    const payload = { id: user.id, email: user.email };
    const token = this.jwtService.sign(payload, this.envService.getJwtSecret(), this.envService.getJwtExpirationTime());

    return token;
  }
}
