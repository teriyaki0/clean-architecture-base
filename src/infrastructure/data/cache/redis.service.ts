import { Injectable, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ICacheService } from 'src/domain/adapters/cache.interface';

@Injectable()
export class RedisCacheService implements ICacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async get<T>(key: string): Promise<T | null> {
    const value = await this.cacheManager.get(key);
    return value ? JSON.parse(value as string) : null;
  }

  async set<T>(key: string, value: T, ttl: number): Promise<void> {
    await this.cacheManager.set(key, JSON.stringify(value), ttl);
  }

  async del(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }
}
