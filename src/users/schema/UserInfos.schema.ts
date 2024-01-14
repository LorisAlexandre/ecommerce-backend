import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { UserSettings } from './UserSettings.schema';

@Schema()
export class UserInfos {
  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;

  @Prop()
  username: string;

  @Prop({ required: false })
  phone?: string;

  @Prop({ default: 'user', enum: ['user', 'admin'], required: true })
  role: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserSettings' })
  settings: UserSettings;
}

export const UserInfosSchema = SchemaFactory.createForClass(UserInfos);
