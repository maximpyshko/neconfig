import { Injectable } from '@nestjs/common';
import { ConfigReader } from '../../../src/readers';

@Injectable()
export class HashConfigService {
  readonly someString: string;
  readonly someFlag: boolean;
  readonly optionalInt?: number;

  constructor(config: ConfigReader) {
    this.someString = config.getStringOrThrow('someString');
    this.someFlag = config.getBoolean('someFlag', false);
    this.optionalInt = config.getInt('optionalInt');
  }
}
