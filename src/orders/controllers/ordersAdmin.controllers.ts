import {
  Controller,
  Get,
  Param,
  ParseArrayPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards';
import { OrdersAdminServices } from '../services';
import { DateGuards, PriceQueryGuards, StatusGuard } from '../guards';

// @UseGuards(JwtGuard)
@Controller('orders/admin')
export class OrdersAdminController {
  constructor(private ordersAdminServices: OrdersAdminServices) {}

  @Get('all')
  getAllOrders() {
    return this.ordersAdminServices.getAllOrders();
  }

  @Get('byId/:id')
  getById(@Param('id') id: string) {
    return this.ordersAdminServices.getById(id);
  }

  @Get('byUser/:id')
  getByUserInfos(@Param('id') userInfos: string) {
    return this.ordersAdminServices.getByUserInfos(userInfos);
  }

  @UseGuards(StatusGuard)
  @Get('byStatus/:status')
  getByStatus(@Param('status') status: string) {
    return this.ordersAdminServices.getByStatus(status);
  }

  @Get('byCountry/:country')
  getByCountry(@Param('country') country: string) {
    return this.ordersAdminServices.getByCountry(country);
  }

  // @UseGuards(DateGuards)
  @Get('byDate/:date')
  getByDate(@Param('date') date: string) {
    return this.ordersAdminServices.getByDate(date);
  }

  @Get('totalOrder')
  getTotalOrders() {
    return this.ordersAdminServices.getTotalOrders();
  }

  @UseGuards(PriceQueryGuards)
  @Get('avgPrice/:query')
  getAvgPrice(@Param('query') query: string) {
    return this.ordersAdminServices.getAvgPrice(query);
  }

  @UseGuards(PriceQueryGuards)
  @Get('total/:query')
  getTotalPrice(@Param('query') query: string) {
    return this.ordersAdminServices.getTotalPriceByQuery(query);
  }

  @Get('bestBuyer')
  getBestBuyer() {
    return this.ordersAdminServices.getBestBuyer();
  }

  @Get('bestSoldArticle')
  getBestSoldArticle() {
    return this.ordersAdminServices.getBestSoldArticle();
  }

  @Get('bestProfitableArticle')
  getBestProfitableArticle() {
    return this.ordersAdminServices.getBestProfitableArticle();
  }

  @Get('articlesDetails')
  getArticlesDetails() {
    return this.ordersAdminServices.getArticlesDetails();
  }
}
