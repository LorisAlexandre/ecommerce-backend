import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty()
  @IsString()
  cityName: string;

  @IsNotEmpty()
  @IsString()
  cityNameKanji: string;

  @IsNotEmpty()
  @IsString()
  meaning: string;

  @IsNotEmpty()
  @IsString()
  primaryColor: string;

  @IsNotEmpty()
  @IsString()
  secondaryColor: string;

  @IsNotEmpty()
  @IsString()
  story: string;

  // @IsNotEmpty()
  // @IsNumber()
  // price: number;

  // @IsNotEmpty()
  // @IsNumber()
  // stock: number;

  // @IsNotEmpty()
  // @IsObject()
  // @ValidateNested()
  // dimension: {
  //   width: number;
  //   height: number;
  // };

  @IsNotEmpty()
  @IsString()
  suite: string;
}
