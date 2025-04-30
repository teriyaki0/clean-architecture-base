import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from './jwt.service';
import { EnvModule } from 'src/infrastructure/env/env.module';
import { EnvService } from 'src/infrastructure/env/env.service';

@Module({
  imports: [
    EnvModule,
    JwtModule.registerAsync({
      imports: [EnvModule],
      inject: [EnvService],
      useFactory: async (envService: EnvService) => ({
        secret: envService.getJwtSecret(),
        signOptions: {
          expiresIn: envService.getJwtExpirationTime(),
        },
      }),
    }),
  ],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtAuthModule {}
