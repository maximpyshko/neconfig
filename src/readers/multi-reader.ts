import { ConfigReader, ReaderDataType } from './config-reader';

export class MultiReader extends ConfigReader {
  private readonly readers: ConfigReader[];

  constructor(readers: ConfigReader[]) {
    super();
    this.readers = readers.reverse();
  }

  getString(key: string): string | undefined;
  getString(key: string, defaultValue: string): string;
  getString(key: string, defaultValue?: string): string | undefined {
    return this.findOne(defaultValue, reader => reader.getString(key));
  }

  getBoolean(key: string): boolean | undefined;
  getBoolean(key: string, defaultValue: boolean): boolean;
  getBoolean(key: string, defaultValue?: boolean): boolean | undefined {
    return this.findOne(defaultValue, reader => reader.getBoolean(key));
  }

  getInt(key: string): number | undefined;
  getInt(key: string, defaultValue: number): number;
  getInt(key: string, defaultValue?: number): number | undefined {
    return this.findOne(defaultValue, reader => reader.getInt(key));
  }

  getNumber(key: string): number | undefined;
  getNumber(key: string, defaultValue: number): number;
  getNumber(key: string, defaultValue?: number): number | undefined {
    return this.findOne(defaultValue, reader => reader.getNumber(key));
  }

  protected defaultErrorMessage(key: string, dataType: ReaderDataType): string {
    return `[Neconfig]: Missing value for key ${key} (${dataType})`;
  }

  private findOne<T>(defaultValue: T, readFor: (reader: ConfigReader) => T | undefined): T | undefined {
    for (const reader of this.readers) {
      const res = readFor(reader);
      if (res !== undefined) {
        return res;
      }
    }

    return defaultValue;
  }
}
