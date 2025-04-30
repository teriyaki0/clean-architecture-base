import { Injectable } from '@nestjs/common';
import { EnvService } from 'src/infrastructure/env/env.service';

import * as bcrypt from 'bcrypt';
import { IBcryptService } from 'src/domain/adapters/bcrypt.interface';

@Injectable()
export class BcryptService implements IBcryptService {
  constructor(private readonly envService: EnvService) {}

  async hash(password: string): Promise<string> {
    const saltRounds = this.envService.getSaltRounds();
    return bcrypt.hash(password, saltRounds);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
