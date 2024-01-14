import { Module } from '@nestjs/common';
import { MongooseModelsModule } from 'src/mongoose/mongooseModels.module';
import { ArticlesControllers } from './articles.controllers';
import { ArticlesServices } from './articles.services';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModelsModule, ConfigModule, JwtModule],
  controllers: [ArticlesControllers],
  providers: [ArticlesServices],
})
export class ArticlesModule {}
