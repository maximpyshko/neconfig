import { Module } from '@nestjs/common';
import { HashConfigModule } from './hash-config/hash-config.module';

@Module({
  imports: [HashConfigModule],
})
export class AppModule {}
