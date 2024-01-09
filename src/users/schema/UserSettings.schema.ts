import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class UserSettings {
  @Prop({ default: false, required: false })
  newsLetter: boolean;

  @Prop({ default: false, required: false })
  notification: boolean;
}

export const UserSettingsSchema = SchemaFactory.createForClass(UserSettings);
