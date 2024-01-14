import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from '../schema';
import { Model } from 'mongoose';
import { CreateOrderDto } from '../dtos';

@Injectable()
export class OrdersUsersServices {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async createOrder(createOrderDto: CreateOrderDto) {
    try {
      console.log(createOrderDto);

      const newOrder = new this.orderModel(createOrderDto);
      const savedOrder = await newOrder.save();

      return { result: true, savedOrder };
    } catch (error) {
      return { error };
    }
  }

  async getById(id: string, userInfos) {
    try {
      const order = await this.orderModel.findById(id);

      if (order.userInfos.toString() !== userInfos)
        throw new UnauthorizedException();

      return { result: true, order };
    } catch (error) {
      return { error };
    }
  }

  async getByUser(userInfos: string) {
    try {
      const orders = await this.orderModel.find({ userInfos });

      return { result: true, orders };
    } catch (error) {
      return { error };
    }
  }

  /*
  functions: 
  - create
  - getById
  - getByUser
  */
}
