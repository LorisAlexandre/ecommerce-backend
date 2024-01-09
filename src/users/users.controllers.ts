import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guards';
import { UserInfos } from './schema';
import { Model } from 'mongoose';

@Controller('users')
export class UsersControllers {
  @Get('me')
  @UseGuards(JwtGuard)
  getMe(@GetUser() user: Model<UserInfos>) {
    return { result: true, user };
  }
}
