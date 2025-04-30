import { Module } from '@nestjs/common';
import { LoginUserUseCase } from 'src/application/use-cases/auth/login.usecase';
import { LogoutUserUseCase } from 'src/application/use-cases/auth/logout.usecase';
import { RegisterUserUseCase } from 'src/application/use-cases/auth/register.usecase';
import { PrismaUserRepository } from 'src/infrastructure/data/database/prisma/repositories/user.repository';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { AuthController } from './controllers/auth.controller';
import { USER_REPOSITORY } from 'src/domain/repositories/user/user.const';

@Module({
  imports: [InfrastructureModule],
  controllers: [AuthController],
  providers: [RegisterUserUseCase, LoginUserUseCase, LogoutUserUseCase, { provide: USER_REPOSITORY, useClass: PrismaUserRepository }],
  exports: [],
})
export class HttpModule {}
