import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { WebSocketModule } from './websocket/websocket.module';
import { ArticlesModule } from './articles/articles.module';
import { CloudinaryModule } from 'nestjs-cloudinary';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_STRING'),
      }),
      inject: [ConfigService],
    }),
    CloudinaryModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        cloud_name: configService.get<string>('CLOUDINARY_NAME'),
        api_key: configService.get<string>('CLOUDINARY_KEY'),
        api_secret: configService.get<string>('CLOUDINARY_SECRET'),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    ArticlesModule,
    WebSocketModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
