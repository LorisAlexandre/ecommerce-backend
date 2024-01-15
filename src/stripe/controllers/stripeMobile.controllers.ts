import { Body, Controller, Post } from '@nestjs/common';
import { StripeMobileServices } from '../services';
import { MobileCartDto } from '../dtos';

@Controller('stripe')
export class StripeMobileControllers {
  constructor(private stripeMobileServices: StripeMobileServices) {}

  @Post('payment-sheet')
  createPaymentSheet(@Body() mobileCartDto: MobileCartDto) {
    return this.stripeMobileServices.createPaymentSheet(mobileCartDto);
  }
}
