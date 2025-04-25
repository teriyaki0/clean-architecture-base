type ConfigValue = string | number | boolean;

export interface IEnvService {
  get(key: string): ConfigValue;
}
