import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guards';
import { UserInfos } from './schema';
import { Model, ObjectId } from 'mongoose';
import { UsersServices } from './users.services';
import { UpdateUserInfosDto } from './dtos';

@Controller('users')
export class UsersControllers {
  constructor(private usersServices: UsersServices) {}

  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@GetUser() user: Model<UserInfos>) {
    if (!user) throw new HttpException('User not found', 404);
    return { result: true, user };
  }

  @UseGuards(JwtGuard)
  @Patch('updateUserInfos')
  updateUserInfos(
    @Body() updateUserInfosDto: UpdateUserInfosDto,
    @GetUser('_id') id: string,
  ) {
    return this.usersServices.updateUserInfos(id, updateUserInfosDto);
  }

  @UseGuards(JwtGuard)
  @Delete('deleteUser')
  deleteUser(@GetUser('_id') id: string) {
    return this.usersServices.deleteUser(id);
  }
}
