import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserInfos, UserLoginInfos, UserSettings } from './schema';
import { Model } from 'mongoose';
import { UpdateUserInfosDto } from './dtos';

@Injectable({})
export class UsersServices {
  constructor(
    @InjectModel(UserInfos.name) private userInfosModel: Model<UserInfos>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(UserLoginInfos.name)
    private userLoginInfosModel: Model<UserLoginInfos>,
    @InjectModel(UserSettings.name)
    private userSettingsModel: Model<UserSettings>,
  ) {}

  async updateUserInfos(id: string, updateUserInfosDto: UpdateUserInfosDto) {
    try {
      const updatedUserInfos = await this.userInfosModel.findByIdAndUpdate(
        id,
        { ...updateUserInfosDto },
        { new: true },
      );
      if (!updatedUserInfos) throw new HttpException('User not found', 404);

      return { result: true, updatedUserInfos };
    } catch (error) {
      throw new HttpException('User not found', 404);
    }
  }

  async deleteUser(id: string) {
    try {
      const foundUser = await this.userModel
        .findOne({ UserInfos: id })
        .populate('UserInfos');
      await this.userSettingsModel.deleteOne({
        _id: foundUser.UserInfos.settings,
      });
      await this.userInfosModel.deleteOne({ _id: foundUser.UserInfos });
      await this.userLoginInfosModel.deleteOne({
        _id: foundUser.UserLoginInfos,
      });
      await this.userModel.deleteOne({ _id: foundUser._id });

      return { result: true };
    } catch (error) {
      throw new HttpException('User not found', 404);
    }
  }
}
