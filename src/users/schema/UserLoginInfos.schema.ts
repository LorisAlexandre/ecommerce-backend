import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class UserLoginInfos {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: ['user', 'admin'], default: 'user' })
  role: string;
}

export const UserLoginInfosSchema =
  SchemaFactory.createForClass(UserLoginInfos);
