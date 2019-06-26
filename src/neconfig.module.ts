import * as fs from 'fs';
import * as dotenv from 'dotenv';
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { NeconfigModuleOptions } from './interfaces';
import { ConfigReader, HashConfigReader } from './readers';
import { MultiReader } from './readers/multi-reader';

@Module({})
export class NeconfigModule {
  static register(options: NeconfigModuleOptions): DynamicModule {
    const readers: ConfigReader[] = options.readers.map(reader => {
      if (reader.name === 'hash') {
        return new HashConfigReader(reader.data);
      } else if (reader.name === 'env') {
        let hash = process.env;
        if (reader.file && fs.existsSync(reader.file)) {
          const env = dotenv.parse(fs.readFileSync(reader.file));
          hash = { ...hash, ...env };
        }
        return new HashConfigReader(hash);
      }
      throw new Error('Unknown reader: ' + reader);
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
}
