import { InvalidParameterException } from '../exceptions';

export type ReaderDataType = 'string' | 'int' | 'number' | 'boolean';

export abstract class ConfigReader {
  abstract getString(key: string): string | undefined;
  abstract getString(key: string, defaultValue: string): string;

  abstract getInt(key: string): number | undefined;
  abstract getInt(key: string, defaultValue: number): number;

  abstract getNumber(key: string): number | undefined;
  abstract getNumber(key: string, defaultValue: number): number;

  abstract getBoolean(key: string): boolean | undefined;
  abstract getBoolean(key: string, defaultValue: boolean): boolean;

  getStringOrThrow(key: string, errorMessage?: string): string {
    return this.get(this.getString, key).orThrow('string', errorMessage);
  }

  getIntOrThrow(key: string, errorMessage?: string): number {
    return this.get(this.getInt, key).orThrow('int', errorMessage);
  }

  getNumberOrThrow(key: string, errorMessage?: string): number {
    return this.get(this.getNumber, key).orThrow('number', errorMessage);
  }

  getBooleanOrThrow(key: string, errorMessage?: string): boolean {
    return this.get(this.getBoolean, key).orThrow('boolean', errorMessage);
  }

  protected abstract defaultErrorMessage(key: string, dataType: ReaderDataType): string;

  private get<T>(method, key: string) {
    const that = this;

    return {
      orThrow<U>(dataType: ReaderDataType, errorMessage?: string): U {
        const value = method.call(that, key);
        if (value === undefined) {
          throw new InvalidParameterException(errorMessage || that.defaultErrorMessage(key, dataType));
        }

        return value;
      },
    };
  }
}
