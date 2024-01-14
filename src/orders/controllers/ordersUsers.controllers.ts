import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrdersUsersServices } from '../services';
import { GetUser } from 'src/auth/decorator';
import { CreateOrderDto } from '../dtos';
import { JwtGuard } from 'src/auth/guards';

@Controller('orders')
export class OrdersUsersController {
  constructor(private ordersUsersService: OrdersUsersServices) {}

  @UseGuards(JwtGuard)
  @Post('create')
  createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @GetUser('_id') userInfos: string,
  ) {
    return this.ordersUsersService.createOrder({
      ...createOrderDto,
      userInfos,
    });
  }

  @UseGuards(JwtGuard)
  @Get('byId/:id')
  getById(@Param('id') id: string, @GetUser('_id') userInfos: string) {
    return this.ordersUsersService.getById(id, userInfos.toString());
  }

  @Get('byUser/:id')
  getByUser(@Param('id') userInfos: string) {
    return this.ordersUsersService.getByUser(userInfos);
  }
}
