import {
  IsArray,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Article } from 'src/articles/schema';

export class CreateOrderDto {
  userInfos: string;

  @IsObject()
  @IsOptional()
  invoice: {
    url: string;
    public_id: string;
  };

  @IsNumber()
  price: number;

  @IsNumber()
  shippingFees: number;

  @IsObject()
  @IsOptional()
  parcel: {
    id: string;
    trackingNumber: string;
    label: string;
  };

  @IsObject()
  @ValidateNested()
  address: {
    houseNumber: number;
    street: string;
    city: string;
    postalCode: number;
    country: string;
  };

  @IsArray()
  @ValidateNested()
  articles: [
    {
      article: Article;
      quantity: number;
    },
  ];
}
