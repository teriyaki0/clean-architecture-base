import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfig } from '@nestjs/config';
import { ICacheConfig } from 'src/domain/config/cache.interface';
import { ICryptConfig } from 'src/domain/config/crypt.interface';
import { IJwtConfig } from 'src/domain/config/jwt.interface';

@Injectable()
export class EnvService implements IJwtConfig, ICryptConfig, ICacheConfig {
  constructor(private readonly nestConfig: NestConfig) {}

  getCacheTTL(): number {
    const value = this.nestConfig.get<number>('REDIS_TTL');
    return value;
  }

  getCachePort(): number {
    const value = this.nestConfig.get<number>('REDIS_PORT');
    return value;
  }

  getCacheHost(): string {
    const value = this.nestConfig.get<string>('REDIS_HOST');
    return value;
  }

  getSaltRounds(): number {
    const value = this.nestConfig.get<number>('SALT');
    return value;
  }

  getJwtSecret(): string {
    const value = this.nestConfig.get<string>('JWT_SECRET');
    return value;
  }

  getJwtExpirationTime(): string {
    const value = this.nestConfig.get<string>('JWT_EXPIRES_IN');
    return value;
  }
}
