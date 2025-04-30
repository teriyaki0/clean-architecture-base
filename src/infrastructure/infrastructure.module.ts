import { Module } from '@nestjs/common';
import { RedisCacheModule } from './data/cache/redis.module';
import { PrismaModule } from './data/database/prisma/prisma.module';
import { EnvModule } from './env/env.module';
import { LoggerModule } from './logger/logger.module';
import { BcryptModule } from './services/bcrypt/bcrypt.module';
import { JwtAuthModule } from './services/jwt/jwt.module';

@Module({
  imports: [EnvModule, LoggerModule, PrismaModule, RedisCacheModule, BcryptModule, JwtAuthModule],
  exports: [EnvModule, LoggerModule, PrismaModule, RedisCacheModule, BcryptModule, JwtAuthModule],
})
export class InfrastructureModule {}
