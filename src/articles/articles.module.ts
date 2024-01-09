import { Module } from '@nestjs/common';
import { MongooseModelsModule } from 'src/mongoose/mongoose.module';
import { ArticlesControllers } from './articles.controllers';
import { ArticlesServices } from './articles.services';

@Module({
  imports: [MongooseModelsModule],
  controllers: [ArticlesControllers],
  providers: [ArticlesServices],
})
export class ArticlesModule {}
