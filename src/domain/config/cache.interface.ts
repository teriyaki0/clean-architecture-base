export interface ICacheConfig {
  getCacheTTL(): number;
  getCachePort(): number;
  getCacheHost(): string;
}
