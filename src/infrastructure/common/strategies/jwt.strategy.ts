import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import { IJwtPayload } from 'src/domain/adapters/jwt.interface';
import { EnvService } from 'src/infrastructure/env/env.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly envService: EnvService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: envService.getJwtSecret(),
    });
  }

  async validate(payload: IJwtPayload) {
    return { userId: payload.id };
  }
}
