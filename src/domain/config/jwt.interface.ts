export interface IJwtConfig {
  getJwtSecret(): string;
  getJwtExpirationTime(): string;
}
