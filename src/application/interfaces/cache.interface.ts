export interface ICacheService {
  get<T = any>(key: string): Promise<T | undefined>;

  set<T = any>(key: string, value: T, ttl?: number): Promise<void>;

  del(key: string): Promise<void>;
}
