import { Module } from '@nestjs/common';

import { EnvModule } from './env/env.module';
import { PrismaModule } from './database/prisma/prisma.module';
import { RedisCacheModule } from './cache/redis.module';
import { LoggerModule } from './logger/logger.module';
import { BcryptModule } from './services/bcrypt/bcrypt.module';

@Module({
  imports: [
    EnvModule,
    LoggerModule,
    PrismaModule,
    RedisCacheModule,
    BcryptModule,
  ],
  providers: [],
  exports: [],
})
export class InfrastructureModule {}
