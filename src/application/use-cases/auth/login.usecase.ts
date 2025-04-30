import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/domain/repositories/user/user.const';
import { UserRepository } from 'src/domain/repositories/user/user.repository';
import { BcryptService } from 'src/infrastructure/services/bcrypt/bcrypt.service';
import { JwtService } from 'src/infrastructure/services/jwt/jwt.service';
import { LoginUserDto } from 'src/presentation/http/dtos/auth/login-user.dto';

@Injectable()
export class LoginUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly bcryptService: BcryptService,
  ) {}

  async execute(loginUserDto: LoginUserDto) {
    return null;
  }
}
