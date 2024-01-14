import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { WebSocketModule } from './websocket/websocket.module';
import { ArticlesModule } from './articles/articles.module';
import { CloudinaryModule } from 'nestjs-cloudinary';
import { MongooseModelsModule } from './mongoose/mongooseModels.module';
import { OrdersModule } from './orders/orders.module';

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
    // WebSocketModule, WebSocket not support on Vercel, fix it later alt: Pusher
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
