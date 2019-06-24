import { join } from 'path';
import { Module } from '@nestjs/common';
import { NeconfigModule } from '../../../src';
import { EnvConfigService } from './env-config.service';

@Module({
  imports: [
    NeconfigModule.register({
      readers: [
        {
          name: 'env',
          file: join(process.cwd(), 'test/src/env-config/test.env'),
        },
      ],
    }),
  ],
  providers: [EnvConfigService],
  exports: [EnvConfigService],
})
export class EnvConfigModule {}
