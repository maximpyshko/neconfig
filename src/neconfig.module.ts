import * as fs from 'fs';
import * as dotenv from 'dotenv';
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { NeconfigModuleOptions, ReaderOptions } from './interfaces';
import { ConfigReader, HashConfigReader } from './readers';
import { MultiReader } from './readers/multi-reader';

@Module({})
export class NeconfigModule {
  static register(options: NeconfigModuleOptions): DynamicModule {
    const readers: ConfigReader[] = options.readers.map(readerOptions => {
      return new HashConfigReader(this.provideData(readerOptions));
    });
    const configProvider: Provider = {
      provide: ConfigReader,
      useValue: new MultiReader(readers),
    };

    return {
      module: NeconfigModule,
      providers: [configProvider],
      exports: [configProvider],
    };
  }

  private static provideData(options: ReaderOptions): { [p: string]: any } {
    switch (options.name) {
      case 'hash':
        return options.data;
      case 'env': {
        if (options.file && fs.existsSync(options.file)) {
          const env = dotenv.parse(fs.readFileSync(options.file));
          return { ...env, ...process.env };
        }
        return process.env;
      }
      default:
        throw new Error(`Can't provide reader for ${options}`);
    }
  }
}
