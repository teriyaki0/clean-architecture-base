import { Controller, Post, Body, Get, UseGuards, HttpStatus } from '@nestjs/common';
import { LoginUserUseCase } from 'src/application/use-cases/auth/login.usecase';
import { LogoutUserUseCase } from 'src/application/use-cases/auth/logout.usecase';
import { RegisterUserUseCase } from 'src/application/use-cases/auth/register.usecase';
import { LoginUserDto } from '../dtos/auth/login-user.dto';
import { RegisterUserDto } from '../dtos/auth/register-user.dto';
import { JwtAuthGuard } from 'src/infrastructure/common/guard/jwt.guard';
import { SUCCESS } from 'src/infrastructure/common/constants/success-code.consts';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly logoutUserUseCase: LogoutUserUseCase,
  ) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    const token = await this.registerUserUseCase.execute(registerUserDto);
    return {
      statusCode: HttpStatus.OK,
      message: SUCCESS.AUTH.SUCCESS_REGISTER,
      data: { token },
    };
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const token = await this.loginUserUseCase.execute(loginUserDto);
    return {
      statusCode: HttpStatus.OK,
      message: SUCCESS.AUTH.SUCCESS_LOGIN,
      data: { token },
    };
  }

  @Get('logout')
  @UseGuards(JwtAuthGuard)
  async logout() {
    await this.logoutUserUseCase.execute();
    return {
      statusCode: HttpStatus.OK,
      message: SUCCESS.AUTH.SUCCESS_LOGOUT,
    };
  }
}
