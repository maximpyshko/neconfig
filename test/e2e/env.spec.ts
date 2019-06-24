import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { EnvConfigModule } from '../src/env-config/env-config.module';
import { EnvConfigService } from '../src/env-config/env-config.service';

describe('EnvConfig', () => {
  let app: INestApplication;
  let configService: EnvConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [EnvConfigModule],
    }).compile();
    app = module.createNestApplication();
    await app.init();
  });

  beforeEach(() => {
    configService = app.get(EnvConfigService);
  });

  it('should read config from env', () => {
    expect(configService.someString).toBe('Some string'); // defined in module
    expect(configService.someFlag).toBe(false); // default value
    expect(configService.optionalInt).toBeUndefined();
  });
});
