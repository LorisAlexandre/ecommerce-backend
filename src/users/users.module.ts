import { Module } from '@nestjs/common';

import { MongooseModelsModule } from 'src/mongoose/mongooseModels.module';
import { UsersControllers } from './users.controllers';
import { UsersServices } from './users.services';

@Module({
  imports: [MongooseModelsModule],
  controllers: [UsersControllers],
  providers: [UsersServices],
})
export class UsersModule {}
