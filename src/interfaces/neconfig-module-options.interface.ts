import { HashReaderOptions } from './hash-reader-options.interface';
import { EnvReaderOptions } from './env-reader-options.interface';

export interface NeconfigModuleOptions {
  readers: Array<HashReaderOptions | EnvReaderOptions>;
}
