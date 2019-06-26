import { ConfigReader } from './config-reader';
import { HashConfigReader } from './hash-config-reader';

describe('HashConfigReader', () => {
  let reader: ConfigReader;

  describe('getString', () => {
    it('should return value', () => {
      reader = new HashConfigReader({
        empty: '',
        someValue: 'Some string',
        a: 1,
        b: true,
      });
      expect(reader.getString('empty')).toBe('');
      expect(reader.getString('someValue')).toBe('Some string');
      expect(reader.getString('a')).toBe('1');
      expect(reader.getString('b')).toBe('true');
    });
    it('should return null', () => {
      reader = new HashConfigReader({});
      expect(reader.getString('someValue')).toBeUndefined();
    });
    it('should return default value', () => {
      reader = new HashConfigReader({});
      expect(reader.getString('someValue', 'Default string')).toBe('Default string');
    });
  });

  describe('getBoolean', () => {
    it('should return value', () => {
      reader = new HashConfigReader({ t: true, t2: 'trUe', t3: 'yEs', t4: '1', t5: 1, f: false, f2: 'fAlse', f3: 'No', f4: '0', f5: 0 });
      expect(reader.getBoolean('t')).toBe(true);
      expect(reader.getBoolean('t2')).toBe(true);
      expect(reader.getBoolean('t3')).toBe(true);
      expect(reader.getBoolean('t4')).toBe(true);
      expect(reader.getBoolean('t5')).toBe(true);
      expect(reader.getBoolean('f')).toBe(false);
      expect(reader.getBoolean('f2')).toBe(false);
      expect(reader.getBoolean('f3')).toBe(false);
      expect(reader.getBoolean('f4')).toBe(false);
      expect(reader.getBoolean('f5')).toBe(false);
    });
    it('should return null', () => {
      reader = new HashConfigReader({ a: 'just a string', b: 2, c: {} });
      expect(reader.getBoolean('someValue')).toBeUndefined();
      expect(reader.getBoolean('a')).toBeUndefined();
      expect(reader.getBoolean('b')).toBeUndefined();
      expect(reader.getBoolean('c')).toBeUndefined();
    });
    it('should return default value', () => {
      reader = new HashConfigReader({});
      expect(reader.getBoolean('someValue', false)).toBe(false);
    });
  });

  describe('getInt', () => {
    it('should return value', () => {
      reader = new HashConfigReader({ a: 1, b: 2.99, c: '3', d: -4.99 });
      expect(reader.getInt('a')).toBe(1);
      expect(reader.getInt('b')).toBe(2);
      expect(reader.getInt('c')).toBe(3);
      expect(reader.getInt('d')).toBe(-4);
    });
    it('should return null', () => {
      reader = new HashConfigReader({
        a: 'just a string',
        b: true,
        c: undefined,
      });
      expect(reader.getInt('someValue')).toBeUndefined();
      expect(reader.getInt('a')).toBeUndefined();
      expect(reader.getInt('b')).toBeUndefined();
      expect(reader.getInt('c')).toBeUndefined();
    });
    it('should return default value', () => {
      reader = new HashConfigReader({});
      expect(reader.getInt('someValue', 19)).toBe(19);
    });
  });

  describe('getNumber', () => {
    it('should return value', () => {
      reader = new HashConfigReader({ a: 1, b: 2.99, c: '3', d: -4.99 });
      expect(reader.getNumber('a')).toBe(1);
      expect(reader.getNumber('b')).toBe(2.99);
      expect(reader.getNumber('c')).toBe(3);
      expect(reader.getNumber('d')).toBe(-4.99);
    });
    it('should return null', () => {
      reader = new HashConfigReader({
        a: 'just a string',
        b: true,
        c: null,
        d: undefined,
      });
      expect(reader.getNumber('someValue')).toBeUndefined();
      expect(reader.getNumber('a')).toBeUndefined();
      expect(reader.getNumber('b')).toBeUndefined();
      expect(reader.getNumber('c')).toBeUndefined();
      expect(reader.getNumber('d')).toBeUndefined();
    });
    it('should return default value', () => {
      reader = new HashConfigReader({});
      expect(reader.getNumber('someValue', 19.5)).toBe(19.5);
    });
  });
});
