import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { Article } from 'src/articles/schema';

export class WebCartDto {
  @IsArray()
  @ValidateNested()
  articles: [
    {
      article: Article;
      quantity: number;
    },
  ];

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  shippingFees: number;
}
