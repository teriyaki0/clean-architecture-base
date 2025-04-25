export interface IJwtPayload {
  id: string;
}

export interface IJwtService {
  sign(payload: IJwtPayload, secret: string, expiresIn: string): string;
  verify(token: string): Promise<any>;
}
