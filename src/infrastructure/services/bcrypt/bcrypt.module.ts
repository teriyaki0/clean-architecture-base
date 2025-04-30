import { Module } from '@nestjs/common';
import { BcryptService } from './bcrypt.service';
import { EnvModule } from 'src/infrastructure/env/env.module';

@Module({
  imports: [EnvModule],
  providers: [BcryptService],
  exports: [BcryptService],
})
export class BcryptModule {}
