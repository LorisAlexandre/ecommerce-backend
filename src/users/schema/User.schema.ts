import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserInfos } from './UserInfos.schema';
import mongoose from 'mongoose';
import { UserLoginInfos } from './UserLoginInfos.schema';

@Schema()
export class User {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserInfos',
    required: true,
  })
  UserInfos: UserInfos;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserLoginInfos',
    required: true,
  })
  UserLoginInfos: UserLoginInfos;
}

export const UserSchema = SchemaFactory.createForClass(User);
