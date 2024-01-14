import { Module } from '@nestjs/common';
import { AuthServices } from './auth.services';
import { AuthControllers } from './auth.controllers';
import { MongooseModelsModule } from 'src/mongoose/mongooseModels.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';

@Module({
  imports: [MongooseModelsModule, ConfigModule, JwtModule.register({})],
  controllers: [AuthControllers],
  providers: [AuthServices, JwtStrategy],
})
export class AuthModule {}
