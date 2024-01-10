import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Article {
  @Prop({ required: true, unique: true })
  cityName: string;

  @Prop({ required: true, unique: true })
  cityNameKanji: string;

  @Prop({ required: true })
  meaning: string;

  @Prop({ required: true })
  primaryColor: string;

  @Prop({ required: true })
  secondaryColor: string;

  @Prop({ required: true })
  story: string;

  @Prop({ required: true, unique: true, type: Object })
  topographicMap?: {
    url: string;
    public_id: string;
  };

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  stock: number;

  @Prop({ required: true, type: Object })
  dimension?: {
    width: number;
    height: number;
  };

  @Prop({ required: true })
  suite: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
