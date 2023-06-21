<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# DSS (decision support system) Project

Simple application for Identification problem and provide some solution, build using Nest JS include any library like TypeOrm, class-validator, mysql2, bcrypt, etc

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)

## Tech Stack

**Library and Framework:** Nest JS, JWT, TypeORM, class-validator, dotenv, mysql2, bcrypt, etc

## API Reference

#### Authentication

```http
 {BASE_ENDPOINT}/auth/{register/login}
```

#### Categories

```http
{BASE_ENDPOINT}/categories
```

#### Problems

```http
{BASE_ENDPOINT}/problems
```

#### Classification

```http
{BASE_ENDPOINT}/classifications
```

#### More Endpoint can Fork/Import Collection

#### Comming soon

## Screenshots (Database Schema)

![database](screenshot/erd.png)

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Authors

- [@Zainal21](https://www.github.com/Zainal21)

## License

Nest is [MIT licensed](LICENSE).
