import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class SigninDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsEnum(['user', 'admin'])
  @IsNotEmpty()
  role: string;
}
