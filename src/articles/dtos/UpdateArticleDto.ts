import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class UpdateArticleDto {
  @IsOptional()
  @IsString()
  cityName: string;

  @IsOptional()
  @IsString()
  cityNameKanji: string;

  @IsOptional()
  @IsString()
  meaning: string;

  @IsOptional()
  @IsString()
  primaryColor: string;

  @IsOptional()
  @IsString()
  secondaryColor: string;

  @IsOptional()
  @IsString()
  story: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  stock: number;

  @IsOptional()
  @IsString()
  suite: string;

  @IsOptional()
  @IsObject()
  dimension?: {
    width: number;
    height: number;
  };
}
