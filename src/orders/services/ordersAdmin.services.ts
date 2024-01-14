import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from '../schema';
import { Model } from 'mongoose';

@Injectable()
export class OrdersAdminServices {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async getAllOrders() {
    try {
      const orders = await this.orderModel.find();

      return { result: true, orders };
    } catch (error) {
      return { error };
    }
  }

  async getById(id: string) {
    try {
      const order = await this.orderModel.findById(id);

      return { result: true, order };
    } catch (error) {
      return { error };
    }
  }

  async getByUserInfos(userInfos: string) {
    try {
      const order = await this.orderModel.find({ userInfos });

      return { result: true, order };
    } catch (error) {
      return { error };
    }
  }

  async getByStatus(status: string) {
    try {
      const orders = await this.orderModel.find({ 'parcel.status': status });

      return { result: true, orders };
    } catch (error) {
      return { error };
    }
  }

  async getByCountry(country: string) {
    try {
      const orders = await this.orderModel.find({ 'address.country': country });

      return { result: true, orders };
    } catch (error) {
      return { error };
    }
  }

  async getByDate(date: string) {
    try {
      const orders = this.orderModel.find({ purchaseDate: date });

      return { result: true, orders };
    } catch (error) {
      return { error };
    }
  }

  async getTotalOrders() {
    try {
      const total = await this.orderModel.countDocuments();

      return { result: true, total };
    } catch (error) {
      return { error };
    }
  }

  async getAvgPrice(query: string) {
    try {
      const avgPrice = await this.orderModel.aggregate([
        { $group: { _id: '', avgPrice: { $avg: `$${query}` } } },
      ]);

      return { result: true, avgPrice };
    } catch (error) {
      return { error };
    }
  }

  async getTotalPriceByQuery(query: string) {
    try {
      const totalPrice = await this.orderModel.aggregate([
        { $group: { _id: '', totalPrice: { $sum: `$${query}` } } },
      ]);

      return { resul: true, totalPrice };
    } catch (error) {
      return { error };
    }
  }

  async getBestBuyer() {
    try {
      const bestBuyer = await this.orderModel.aggregate([
        {
          $group: {
            _id: '$userInfos',
            totalSpent: { $sum: '$price' },
          },
        },
        {
          $sort: { totalSpent: -1 },
        },
        {
          $limit: 1,
        },
      ]);

      return { result: true, bestBuyer };
    } catch (error) {
      return { error };
    }
  }

  async getBestSoldArticle() {
    try {
      const bestArticle = await this.orderModel.aggregate([
        {
          $group: {
            _id: '$article.id',
            bestArticle: { $sum: '$article.quantity' },
          },
        },
        { $sort: { bestArticle: -1 } },
        { $limit: 1 },
      ]);

      return { result: true, bestArticle };
    } catch (error) {
      return { error };
    }
  }

  async getBestProfitableArticle() {
    try {
      const bestArticle = await this.orderModel.aggregate([
        {
          $lookup: {
            from: 'articles',
            localField: 'article.id',
            foreignField: '_id',
            as: 'articleDetails',
          },
        },
        {
          $unwind: '$articleDetails',
        },
        {
          $group: {
            _id: '$articleDetails._id',
            bestArticle: { $sum: '$articleDetails.price' },
          },
        },
        { $sort: { bestArticle: -1 } },
        { $limit: 1 },
      ]);

      return { result: true, bestArticle };
    } catch (error) {
      return { error };
    }
  }

  async getArticlesDetails() {
    try {
      const articles = await this.orderModel.aggregate([
        {
          $lookup: {
            from: 'articles',
            localField: 'article.id',
            foreignField: '_id',
            as: 'articleDetails',
          },
        },
        {
          $unwind: '$articleDetails',
        },
        {
          $group: {
            _id: '$articleDetails._id',
            articleName: { $first: '$articleDetails.name' },
            quantitySold: { $sum: 1 },
            totalRevenue: { $sum: '$articleDetails.price' },
          },
        },
      ]);

      return { result: true, articles };
    } catch (error) {
      return { error };
    }
  }
}
