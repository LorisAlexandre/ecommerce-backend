import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from 'src/articles/schema';
import {
  User,
  UserInfos,
  UserInfosSchema,
  UserLoginInfos,
  UserLoginInfosSchema,
  UserSchema,
  UserSettings,
  UserSettingsSchema,
} from 'src/users/schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: UserInfos.name,
        schema: UserInfosSchema,
      },
      {
        name: UserLoginInfos.name,
        schema: UserLoginInfosSchema,
      },
      {
        name: UserSettings.name,
        schema: UserSettingsSchema,
      },
      {
        name: Article.name,
        schema: ArticleSchema,
      },
    ]),
  ],
  exports: [MongooseModule],
})
export class MongooseModelsModule {}
