import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import * as ormConfig from './ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
