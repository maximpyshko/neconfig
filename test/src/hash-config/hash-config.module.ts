import { Module } from '@nestjs/common';
import { NeconfigModule } from '../../../src';
import { HashConfigService } from './hash-config.service';

const config = {
  someString: 'Some string',
};

@Module({
  imports: [NeconfigModule.register({ readers: [{ name: 'hash', data: config }] })],
  providers: [HashConfigService],
  exports: [HashConfigService],
})
export class HashConfigModule {}
