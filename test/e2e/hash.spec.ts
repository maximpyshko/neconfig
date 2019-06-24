import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { HashConfigModule } from '../src/hash-config/hash-config.module';
import { HashConfigService } from '../src/hash-config/hash-config.service';

describe('HashConfig', () => {
  let app: INestApplication;
  let configService: HashConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [HashConfigModule],
    }).compile();
    app = module.createNestApplication();
    await app.init();
  });

  beforeEach(() => {
    configService = app.get(HashConfigService);
  });

  it('should read config from hash', () => {
    expect(configService.someString).toBe('Some string'); // defined in module
    expect(configService.someFlag).toBe(false); // default value
    expect(configService.optionalInt).toBeUndefined();
  });
});
