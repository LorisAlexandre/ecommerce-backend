import {
  IsBoolean,
  IsObject,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class UpdateUserSettingsDto {
  @IsOptional()
  @IsBoolean()
  newsLetter: boolean;

  @IsOptional()
  @IsBoolean()
  notification: boolean;
}

export class UpdateUserInfosDto {
  @IsOptional()
  @IsString()
  firstname: string;

  @IsOptional()
  @IsString()
  lastname: string;

  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsPhoneNumber('FR')
  phone: string;

  @IsOptional()
  @IsObject()
  settings: UpdateUserSettingsDto;
}
