import {
  IsArray,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateOrderDto {
  userInfos: string;

  @IsString()
  invoice: string;

  @IsNumber()
  price: number;

  @IsNumber()
  shippingFees: number;

  @IsObject()
  @ValidateNested()
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
      id: string;
      quantity: number;
    },
  ];
}
