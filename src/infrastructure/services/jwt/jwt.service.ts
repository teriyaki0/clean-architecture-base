import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { IJwtPayload, IJwtService } from 'src/domain/adapters/jwt.interface';

@Injectable()
export class JwtService implements IJwtService {
  constructor(private readonly jwtService: NestJwtService) {}

  sign(payload: IJwtPayload, secret: string, expiresIn: string): string {
    return this.jwtService.sign(payload, {
      secret: secret,
      expiresIn: expiresIn,
    });
  }

  async verify(token: string): Promise<IJwtPayload | null> {
    try {
      const decoded = await this.jwtService.verifyAsync(token);
      return decoded;
    } catch (error) {
      return null;
    }
  }
}
