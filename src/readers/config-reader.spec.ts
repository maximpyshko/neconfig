import { ConfigReader, ReaderDataType } from './config-reader';
import { InvalidParameterException } from '../exceptions';

class StubReader extends ConfigReader {
  constructor(private readonly values: { [key: string]: any }) {
    super();
  }

  getBoolean(key: string): boolean | undefined;
  getBoolean(key: string, defaultValue: boolean): boolean;
  getBoolean(key: string, defaultValue?: boolean): boolean | undefined {
    return this.values[key];
  }

  getInt(key: string): number | undefined;
  getInt(key: string, defaultValue: number): number;
  getInt(key: string, defaultValue?: number): number | undefined {
    return this.values[key];
  }

  getNumber(key: string): number | undefined;
  getNumber(key: string, defaultValue: number): number;
  getNumber(key: string, defaultValue?: number): number | undefined {
    return this.values[key];
  }

  getString(key: string): string | undefined;
  getString(key: string, defaultValue: string): string;
  getString(key: string, defaultValue?: string): string | undefined {
    return this.values[key];
  }

  protected defaultErrorMessage(key: string, dataType: ReaderDataType) {
    return 'Default error';
  }
}

describe('ConfigReader', () => {
  let reader: ConfigReader;

  describe('getStringOrThrow', () => {
    it('should not throw error', () => {
      reader = new StubReader({ t: 'Some string' });
      expect(reader.getStringOrThrow('t')).toBe('Some string');
    });
    it('should throw error', () => {
      reader = new StubReader({});
      expect(() => reader.getStringOrThrow('t')).toThrow(new InvalidParameterException('Default error'));
      expect(() => reader.getStringOrThrow('t', 'My message')).toThrow(new InvalidParameterException('My message'));
    });
  });

  describe('getIntOrThrow', () => {
    it('should not throw error', () => {
      reader = new StubReader({ t: 1 });
      expect(reader.getIntOrThrow('t')).toBe(1);
    });
    it('should throw error', () => {
      reader = new StubReader({});
      expect(() => reader.getIntOrThrow('t')).toThrow(new InvalidParameterException('Default error'));
      expect(() => reader.getIntOrThrow('t', 'My message')).toThrow(new InvalidParameterException('My message'));
    });
  });

  describe('getNumberOrThrow', () => {
    it('should not throw error', () => {
      reader = new StubReader({ t: 1 });
      expect(reader.getNumberOrThrow('t')).toBe(1);
    });
    it('should throw error', () => {
      reader = new StubReader({});
      expect(() => reader.getNumberOrThrow('t')).toThrow(new InvalidParameterException('Default error'));
      expect(() => reader.getNumberOrThrow('t', 'My message')).toThrow(new InvalidParameterException('My message'));
    });
  });

  describe('getBooleanOrThrow', () => {
    it('should not throw error', () => {
      reader = new StubReader({ t: 1 });
      expect(reader.getBooleanOrThrow('t')).toBe(1);
    });
    it('should throw error', () => {
      reader = new StubReader({});
      expect(() => reader.getBooleanOrThrow('t')).toThrow(new InvalidParameterException('Default error'));
      expect(() => reader.getBooleanOrThrow('t', 'My message')).toThrow(new InvalidParameterException('My message'));
    });
  });
});
