# NestJS Skeleton

# Getting Started

This project is the the skeleton that provides basic functionalities to build a working microservice.

## Running service locally

Before you start make sure that you have installed:

* NodeJS that includes `yarn`
* [PostgreSQL](https://www.postgresql.org/) `v10.7`
* Optionally [Docker](https://www.docker.com/) with [Docker Compose](https://docs.docker.com/compose/)

### Locally

```sh
$ yarn
$ yarn start:dev
```

### Inside Docker container

```sh
$ docker-compose up --build -V
```

For Docker user, in order to execute commands in the project, you should run the interactive `bash` shell in the container

```sh
$ docker ps # Get the ID of service container
$ docker exec -it <service-container-id> /bin/bash
```

## Database Migration

### Generating migrations

In order to keep everything consistent within the service, engineers are advised to restrain from making changes to database schema directly but to rely on TypeORM to generate migration files from changes on entities.

```sh
$ yarn typeorm:migration:create <migration-file-name>
```

*Migration files should be named in kebab case without captial letters*

after running the above script, new migration files will be available for review in `src/migrations`. The migration files are prefixed with timestamp of the creation date, and sorted chronologically, so engineers should not rename the file or the within class.

### Execute migrations

Engineers should execute database migration whenever pull code from the remote repository

```sh
$ yarn typeorm:migration:run
```

## DTO, Validation and Swagger

### DTO and Validation

`DTO` stands for Data Transfer Object, which in this case, is the definition of incoming or outgoing data of the service. `DTO` should be determined using simple class.

NestJS provides us with the ability to configure global data validation with `ValidationPipe` making use of the [class-validator](https://www.npmjs.com/package/class-validator). Using decorators, we can define data valiation rules within DTO classes, without extra code required on the controller (exempt complicated cases involving querying databases or execute business logics).

An example of DTO with validation enabled:

```typescript
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateCatDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;
}
```

### Swagger

Using `@nestjs/swagger`, we keep the the API document maintainance part of the development. API document is generated automatically using the information provided with decorators. `@nestjs/swagger` can be used side-by-side with `class-validator` and other native `nestjs` decorators without conflict.

The Swagger document should be available at `/api-doc`, while the JSON version is at `/api-doc-json`.

Example DTO:
```typescript
import { ApiProperty } from '@nestjs/swagger';

export class CreateCatDto {
  @ApiProperty({
    description: 'Name of the cat'
  })
  name: string;

  @ApiProperty({
    description: 'Age of the cat',
    minimum: 1,
  })
  age: number;
}

```

Example Controller:
```typescript
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('cats')
@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @ApiResponse({ status: 201, description: 'The cat has been successfully recorded.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }
}

```

# References

* https://docs.nestjs.com/techniques/database#sequelize-integration
* https://docs.nestjs.com/techniques/validation
* https://docs.nestjs.com/openapi/introduction
* https://typeorm.io/#/entities
* https://typeorm.io/#/relations
* https://typeorm.io/#/migrations
* https://www.npmjs.com/package/class-validator
