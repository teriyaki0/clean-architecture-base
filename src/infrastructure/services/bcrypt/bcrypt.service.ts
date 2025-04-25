import { Injectable } from '@nestjs/common';
import { EnvService } from 'src/infrastructure/env/env.service';

import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  constructor(private readonly envService: EnvService) {}

  async hash(password: string): Promise<string> {
    const saltRounds = this.envService.get<number>('SALT');
    return bcrypt.hash(password, saltRounds);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
