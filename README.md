# Neconfig

## Description

Neconfig - configuration module for [Nestjs](https://github.com/nestjs/nest).

<a href="https://www.npmjs.com/package/neconfig">
   <img src="https://img.shields.io/npm/v/neconfig.svg?style=flat-square" alt="NPM Version" />
</a>
<a href="https://www.npmjs.com/package/neconfig">
   <img src="https://img.shields.io/npm/l/neconfig.svg?style=flat-square" alt="Package License" />
</a>

## Example

[neconfig-examples](https://github.com/maximpyshko/neconfig-examples)

## Installation

```bash
npm i neconfig
```

## Features

- Reading environment variables
- Reading from multiple .env files (using dotenv)
- Reading plain js objects
- Providing default values
- Providing different config per module

```typescript
    // String
    const host: string | undefined = config.getString('host'); // optional
    const host2: string = config.getString('host', 'localhost'); // default value
    const host3: string = config.getStringOrThrow('host'); // required, throwing error if host didn't provided
    const host4: string = config.getStringOrThrow('host', 'Host is required'); // specified error message

    // Integer
    const port: number | undefined = config.getInt('port');
    const port2: number = config.getInt('port', 3000);
    const port3: number = config.getIntOrThrow('port');

    // Number
    const price: number | undefined = config.getNumber('price');
    const price2: number = config.getNumber('price', 1.99);
    const price3: number = config.getNumberOrThrow('price');

    // Boolean
    const logsEnabled: boolean | undefined = config.getBoolean('logs_enabled');
    const logsEnabled2: boolean = config.getBoolean('logs_enabled', true);
    const logsEnabled3: boolean = config.getBooleanOrThrow('logs_enabled');
```

## Types

- `getString` reads any thing that have toString() method, returns undefined otherwise
- `getInt` parses value using `parseInt(value, 10)`, returns undefined if NaN
- `getNumber` parses value using `parseFloat(value)`, returns undefined if NaN
- `getBoolean` parses value with checks

```bash
# Truthy values for boolean
true, 'true', 'yes', 'y', '1', 1

# Falsy values for boolean
false, 'false', 'no', 'n', '0', 0
```

## Readers

There are few readers:

- `env` reader, that allows to read from environment variables and if required, from .env files
- `hash` reader, that allows to read from plain js objects

## Env reader

```typescript
NeconfigModule.register({
  readers: [
    { name: 'env', file: path.resolve(process.cwd(), '.env') }
  ]
})
```

Here, `file` is optional, allowing to read config from files (using dotenv)

If the file option provided and file exists, Neconfig will parse that file content with dotenv
and merge with process.env

Variables from file will be overridden by environment variables.
**Example:**

### .env file

```dotenv
HOST=myhost.com
PORT=3000
```

### Setting environment variable and run

```bash
$ export PORT=80
$ npm start
> Listening on http://myhost.com:80
```

## Hash reader

```typescript
NeconfigModule.register({
  readers: [
    {
      name: 'hash',
      data: { HOST: 'localhost', PORT: 3000 }
    }
  ]
})
```

## Overriding config

You can register NeconfigModule with several readers:

```typescript
NeconfigModule.register({
  readers: [
    { name: 'hash', data: { HOST: 'localhost', PORT: 3000 } }, // (1)
    { name: 'env', file: path.resolve(process.cwd(), '.env') } // (2)
    { name: 'env', file: path.resolve(process.cwd(), 'dev.env') } // (3)
  ]
})
```

### .env file

```dotenv
APP_NAME = Neconfig
HOST = myhost.com
PORT = 80
```

### dev.env file

```dotenv
HOST = 0.0.0.0
PORT = 4000
```

### Run

```bash
$ npm start
> config: {HOST: '0.0.0.0', PORT: 4000, APP_NAME: 'Neconfig'}
```

- First reader `(1)` sets `HOST` to `localhost` and `PORT` to `3000`
- Second reader `(2)` overrides `HOST` to `myhost.com`, `PORT` to `80` and adds new key `APP_NAME`
- Third reader `(3)` overrides `HOST` to `0.0.0.0` and `PORT` to `4000`

If you remove `dev.env` file you will see:

```bash
$ npm start
> config: {HOST: 'myhost.com', PORT: 80, APP_NAME: 'Neconfig'}
```

## Provide different config per modules

### app.module.ts

```typescript
@Module({
  imports: [
    NeconfigModule.register({
      readers: [
        { name: 'env', file: path.resolve(process.cwd(), 'configs', 'app.env') }
      ]
    })
  ]
})
export class AppModule {}
```

### feat.module.ts

```typescript
@Module({
  imports: [
    NeconfigModule.register({
      readers: [
        { name: 'env', file: path.resolve(process.cwd(), 'configs', 'feat.env') }
      ]
    })
  ]
})
export class FeatModule {}
```

`AppModule` and `FeatModule` have different instances of `ConfigReader`

## Contributing

You are welcome with this project for contributing, just make a PR
