import { ConfigReader, ReaderDataType } from './config-reader';

const truthyValues = [true, 'true', 'yes', 'y', '1', 1];
const falsyValues = [false, 'false', 'no', 'n', '0', 0];

export class HashConfigReader extends ConfigReader {
  constructor(private readonly map: { [key: string]: any }) {
    super();
  }

  getString(key: string): string | undefined;
  getString(key: string, defaultValue: string): string;
  getString(key: string, defaultValue?: string): string | undefined {
    if (typeof this.map[key] === 'string' || (this.map[key] && this.map[key].toString)) {
      return this.map[key].toString();
    }

    return defaultValue;
  }

  getBoolean(key: string): boolean | undefined;
  getBoolean(key: string, defaultValue: boolean): boolean;
  getBoolean(key: string, defaultValue?: boolean): boolean | undefined {
    let value = this.map[key];
    if (typeof value === 'string') {
      value = value.toLowerCase();
    }
    if (truthyValues.indexOf(value) !== -1) {
      return true;
    }
    if (falsyValues.indexOf(value) !== -1) {
      return false;
    }

    return defaultValue;
  }

  getInt(key: string): number | undefined;
  getInt(key: string, defaultValue: number): number;
  getInt(key: string, defaultValue?: number): number | undefined {
    const int = parseInt(this.map[key], 10);
    if (!isNaN(int)) {
      return int;
    }

    return defaultValue;
  }

  getNumber(key: string): number | undefined;
  getNumber(key: string, defaultValue: number): number;
  getNumber(key: string, defaultValue?: number): number | undefined {
    const num = parseFloat(this.map[key]);
    if (!isNaN(num)) {
      return num;
    }

    return defaultValue;
  }

  protected defaultErrorMessage(key: string, dataType: ReaderDataType): string {
    return `Missing value for key ${key} (${dataType})`;
  }
}
