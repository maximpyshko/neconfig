import { HashReaderOptions } from './hash-reader-options.interface';
import { EnvReaderOptions } from './env-reader-options.interface';

export type ReaderOptions = HashReaderOptions | EnvReaderOptions;

export interface NeconfigModuleOptions {
  readers: ReaderOptions[];
}
