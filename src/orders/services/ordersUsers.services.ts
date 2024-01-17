import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from '../schema';
import { Model } from 'mongoose';
import { CreateOrderDto } from '../dtos';
import { InvoiceServices } from 'src/invoice/invoice.services';

@Injectable()
export class OrdersUsersServices {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    private invoiceServices: InvoiceServices,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto) {
    try {
      // créer l'order
      const newOrder = await new this.orderModel(createOrderDto);
      // update les infos manquantes invoice
      const invoice = await this.invoiceServices.createInvoice({
        date: new Date(String(newOrder.purchaseDate)),
        order: newOrder._id.toString(),
        price: createOrderDto.price,
        shippingFees: createOrderDto.shippingFees,
        articles: [...createOrderDto.articles],
      });

      if (invoice.result) {
        const uploadedFile = await this.invoiceServices.createPdf(
          invoice.invoice,
        );
        if (uploadedFile.result) {
          newOrder.invoice = { ...uploadedFile.uploadedFile };
          const savedOrder = await newOrder.save();

          return { result: true, savedOrder };
        }
        return uploadedFile;
      }
      return invoice;
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
