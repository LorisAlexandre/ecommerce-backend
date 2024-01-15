import { Body, Controller, Post, Redirect } from '@nestjs/common';
import { StripeWebServices } from '../services';
import { WebCartDto } from '../dtos';

@Controller('stripe')
export class StripeWebControllers {
  constructor(private stripeWebServices: StripeWebServices) {}

  @Post('checkout-session')
  createCheckoutSession(@Body() webCartDto: WebCartDto) {
    return this.stripeWebServices.createCheckoutSession(webCartDto);
  }
}
