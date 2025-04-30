import { Module } from '@nestjs/common';
import { CacheModule as NestCacheModule } from '@nestjs/cache-manager';
import { RedisCacheService } from './redis.service';
import { EnvService } from '../../env/env.service';
import { EnvModule } from '../../env/env.module';

@Module({
  imports: [
    NestCacheModule.registerAsync({
      imports: [EnvModule],
      inject: [EnvService],
      useFactory: async (envService: EnvService) => ({
        store: 'ioredis',
        host: envService.getCacheHost(),
        port: envService.getCachePort(),
        ttl: envService.getCacheTTL(),
      }),
    }),
  ],
  providers: [RedisCacheService],
  exports: [RedisCacheService],
})
export class RedisCacheModule {}
