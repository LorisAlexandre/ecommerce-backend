import { IsNotEmpty, IsNumber } from 'class-validator';

export class MobileCartDto {
  @IsNumber()
  @IsNotEmpty()
  price: number;
}
