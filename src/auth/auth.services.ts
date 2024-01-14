import * as bcrypt from 'bcrypt';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import {
  User,
  UserInfos,
  UserLoginInfos,
  UserSettings,
} from 'src/users/schema';
import { SignupDto, SigninDto, UpdateUserLoginInfosDto } from './dtos';

@Injectable({})
export class AuthServices {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(UserInfos.name) private userInfosModel: Model<UserInfos>,
    @InjectModel(UserSettings.name)
    private userSettingsModel: Model<UserSettings>,
    @InjectModel(UserLoginInfos.name)
    private userLoginInfosModel: Model<UserLoginInfos>,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(signupDto: SignupDto) {
    try {
      const findUser = await this.userLoginInfosModel.findOne({
        email: signupDto.email,
        role: signupDto.role,
      });

      if (findUser) {
        throw new HttpException('User already exist', 409);
      }

      const newUserSettings = new this.userSettingsModel(signupDto.settings);
      const savedUserSettings = await newUserSettings.save();

      const newUserInfos = new this.userInfosModel({
        ...signupDto,
        settings: savedUserSettings,
      });
      const savedUserInfos = await newUserInfos.save();

      const password = await bcrypt.hash(signupDto.password, 10);
      const newUserLoginInfos = new this.userLoginInfosModel({
        email: signupDto.email,
        password,
        role: signupDto.role,
      });
      const savedUserLoginInfos = await newUserLoginInfos.save();

      const newUser = new this.userModel({
        UserInfos: savedUserInfos,
        UserLoginInfos: savedUserLoginInfos,
      });
      const savedUser = await newUser.save();

      const access_token = await this.signToken(
        savedUser._id.toString(),
        savedUser.UserLoginInfos.email,
        signupDto.role,
      );

      return {
        result: true,
        access_token,
      };
    } catch (error) {
      return { error, result: false };
    }
  }

  async signin(signinDto: SigninDto) {
    try {
      const findUser = await this.userLoginInfosModel
        .findOne({
          email: signinDto.email,
          role: signinDto.role,
        })
        .exec();

      if (!findUser) {
        throw new HttpException('Bad email or bad password', 400);
      } else if (!bcrypt.compare(signinDto.password, findUser.password)) {
        throw new HttpException('Bad email or bad password', 400);
      } else {
        const access_token = await this.signToken(
          findUser._id.toString(),
          findUser.email,
          signinDto.role,
        );
        return { result: true, access_token };
      }
    } catch (error) {
      return error;
    }
  }

  async updateUserLoginInfos(
    id: string,
    updateUserLoginInfosDto: UpdateUserLoginInfosDto,
  ) {
    try {
      const foundUser = await this.userModel
        .findOne({ UserInfos: id })
        .populate(['UserLoginInfos', 'UserInfos']);

      const updatedUserInfos = await this.userInfosModel.findByIdAndUpdate(
        foundUser.UserInfos,
        { email: updateUserLoginInfosDto.email },
        { new: true },
      );

      await this.userLoginInfosModel.findByIdAndUpdate(
        foundUser.UserLoginInfos,
        {
          email: updateUserLoginInfosDto.email,
          password: await bcrypt.hash(updateUserLoginInfosDto.password, 10),
        },
      );

      const access_token = await this.signToken(
        updatedUserInfos._id.toString(),
        updatedUserInfos.email,
        updatedUserInfos.role,
      );
      return { result: true, access_token };
    } catch (error) {
      return error;
    }
  }

  signToken(userId: string, email: string, role: string): Promise<string> {
    const secret = this.config.get('JWT_SECRET');

    const payload = { sub: userId, email, role };

    return this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret,
    });
  }
}
