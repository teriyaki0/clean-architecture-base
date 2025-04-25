import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfig } from '@nestjs/config';
import { IEnvService } from 'src/application/interfaces/env.interface';

@Injectable()
export class EnvService implements IEnvService {
  constructor(private readonly nestConfig: NestConfig) {}

  get<T = string>(key: string): T {
    const value = this.nestConfig.get<T>(key);
    return value;
  }
}
