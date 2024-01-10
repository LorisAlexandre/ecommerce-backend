import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class UpdateUserLoginInfosDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  // @IsStrongPassword()
  @IsString()
  password: string;
}
