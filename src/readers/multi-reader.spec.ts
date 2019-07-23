import { ConfigReader } from './config-reader';
import { HashConfigReader } from './hash-config-reader';
import { MultiReader } from './multi-reader';

describe('MultiReader', () => {
  let reader: ConfigReader;

  it('should read from few readers', () => {
    reader = new MultiReader([
      new HashConfigReader({ a: 1 }),
      new HashConfigReader({ b: 2 }),
      new HashConfigReader({ c: 3, d: 4 }),
      new HashConfigReader({ d: 5 }),
    ]);
    expect(reader.getInt('a')).toBe(1);
    expect(reader.getInt('b')).toBe(2);
    expect(reader.getInt('c')).toBe(3);
    expect(reader.getInt('d')).toBe(5);
  });

  it('should read in back order', () => {
    reader = new MultiReader([new HashConfigReader({ i: 1 }), new HashConfigReader({ i: 2 }), new HashConfigReader({ i: 3 })]);
    expect(reader.getInt('i')).toBe(3);
  });

  it('should use last available value', () => {
    reader = new MultiReader([
      new HashConfigReader({ i: 1 }),
      new HashConfigReader({ i: 2 }),
      new HashConfigReader({ c: 'test' }),
      new HashConfigReader({}),
    ]);
    expect(reader.getInt('i')).toBe(2);
    expect(reader.getString('c')).toBe('test');
    expect(reader.getInt('i', 5)).toBe(2);
    expect(reader.getString('c', 'default for test')).toBe('test');
    expect(reader.getIntOrThrow('i')).toBe(2);
    expect(reader.getStringOrThrow('c')).toBe('test');
  });
});
