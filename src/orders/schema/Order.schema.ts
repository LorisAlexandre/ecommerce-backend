import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date, now } from 'mongoose';
import { Article } from 'src/articles/schema';
import { UserInfos } from 'src/users/schema';

@Schema()
export class Order {
  @Prop({ required: true })
  articles: [
    {
      id: {
        type: [mongoose.Schema.Types.ObjectId];
        ref: 'articles';
        required: true;
      };
      quantity: { type: number; required: true };
    },
  ];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: UserInfos.name,
    required: true,
  })
  userInfos: UserInfos;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  shippingFees: number;

  @Prop({ type: Object, required: false })
  parcel: {
    id: { type: string; required: false };
    trackingNumber: { type: string; required: false };
    label: {
      url: string;
      public_id: string;
    };
    status: {
      type: string;
      required: false;
      enum: ['creation', 'sent', 'transit', 'delivered'];
      default: 'creation';
    };
  };

  @Prop({ required: false, type: Object })
  invoice: {
    url: string;
    public_id: string;
  };

  @Prop({ required: true, default: now, type: Date })
  purchaseDate: Date;

  @Prop({ required: true, type: Object })
  address: {
    houseNumber: { type: number; required: true };
    street: { type: string; required: true };
    city: { type: string; required: true };
    postalCode: { type: number; required: true };
    country: { type: string; required: true };
  };
}

export const OrderSchema = SchemaFactory.createForClass(Order);
