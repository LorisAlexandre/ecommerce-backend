import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Redirect,
  UseGuards,
} from '@nestjs/common';
import { AuthServices } from './auth.services';
import { SigninDto, SignupDto, UpdateUserLoginInfosDto } from './dtos';
import { JwtGuard } from './guards';
import { GetUser } from './decorator';

@Controller('auth')
export class AuthControllers {
  constructor(private authService: AuthServices) {}

  @Post('register')
  signup(@Body() signupDto: SignupDto) {
    return this.authService.signup({ ...signupDto, role: 'user' });
  }

  @Post('register/admin')
  // @Redirect('http://localhost:3000/admin', 301)
  signupAdmin(@Body() signupDto: SignupDto) {
    return this.authService.signup({ ...signupDto, role: 'admin' });
  }

  @HttpCode(200)
  @Post('connection')
  signin(@Body() signinDto: SigninDto) {
    return this.authService.signin({ ...signinDto, role: 'user' });
  }

  @Post('connection/admin')
  signinAdmin(@Body() signinDto: SigninDto) {
    return this.authService.signin({ ...signinDto, role: 'admin' });
  }

  @UseGuards(JwtGuard)
  @Patch('updateUserLoginInfos')
  updateUserLoginInfos(
    @GetUser('_id') id: string,
    @Body() updateUserLoginInfosDto: UpdateUserLoginInfosDto,
  ) {
    return this.authService.updateUserLoginInfos(id, updateUserLoginInfosDto);
  }
}
