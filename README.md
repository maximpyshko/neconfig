## Description

Neconfig - configuration module for [Nest](https://github.com/nestjs/nest).

<a href="https://www.npmjs.com/package/neconfig">
   <img src="https://img.shields.io/npm/v/neconfig.svg?style=flat-square" alt="NPM Version" />
</a>
<a href="https://www.npmjs.com/package/neconfig">
   <img src="https://img.shields.io/npm/l/neconfig.svg?style=flat-square" alt="Package License" />
</a>

## Features

- Support multiple env files (using dotenv)
- Support env variables
- Support js objects
- Throwing error for undefined required variable

## Installation

```bash
$ npm i neconfig
```

## Example

#### src/app.config.ts

```typescript
import { ConfigReader } from 'neconfig';
// import ...

@Injectable()
class AppConfig {
   readonly host: string;
   readonly port: number;
   readonly secret: string;
   
   constructor(config: ConfigReader) {
     this.host = config.getString('HOST', 'localhost');
     this.port = config.getInt('PORT', 3000);
     this.secret = config.getStringOrThrow('SECRET', 'Please set app secret!');
   }
}
```

#### src/app.module.ts

```typescript
import { NeconfigModule } from 'neconfig';
// import ...

@Module({
  imports: [
    NeconfigModule.register({
      readers: [ // merge two readers.
        {
          name: 'hash', // simple config
          data: {
            someData: 'Some data'
          }
        },
        {
          name: 'env', // env reader
          file: path.join(process.cwd(), '.env'), // optional, allows to read from env (using dotenv)
        },
      ],
    }),
  ],
  providers: [AppConfig],
})
export class AppModule {}
```

#### .env
```dotenv
PORT = 4000
# override someData from first reader
someData = Some data from .env
```

#### src/main.ts

```typescript
(async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(AppConfig);
  await app.listen(config.port, config.host); // using config
})();
```

## Contributing
- You are welcome with this project for contributing, just make a PR
- Translation is required for readme(RU -> EN), if you want to help, please email me: maximpyshko@gmail.com
