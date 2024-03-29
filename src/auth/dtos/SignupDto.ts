import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  ValidateNested,
} from 'class-validator';

export class UserSettingsDto {
  @IsOptional()
  newsLetter: boolean;

  @IsOptional()
  notification: boolean;
}

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsPhoneNumber('FR')
  @IsOptional()
  phone: string;

  // UserLoginInfosDto
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  // @IsStrongPassword()
  password: string;

  @IsEnum(['user', 'admin'])
  @IsOptional()
  role: string;

  // UserSettings
  @IsObject()
  @IsOptional()
  settings?: UserSettingsDto;
}
