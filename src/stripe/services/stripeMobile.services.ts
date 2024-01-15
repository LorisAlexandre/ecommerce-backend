import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { MobileCartDto } from '../dtos';

@Injectable()
export class StripeMobileServices {
  constructor(private configService: ConfigService) {}

  stripe = new Stripe(this.configService.get('STRIPE_PRIVATE_KEY'));

  async createPaymentSheet(mobileCartDto: MobileCartDto) {
    try {
      const customer = await this.stripe.customers.create();

      const ephemeralKeys = await this.stripe.ephemeralKeys.create({
        customer: customer.id,
      });

      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: Math.floor(mobileCartDto.price * 100),
        currency: 'EUR',
        customer: customer.id,
      });

      return {
        result: true,
        paymentIntent: paymentIntent.client_secret,
        ephemeralKeys: ephemeralKeys.secret,
        customer: customer.id,
        publishableKey: this.configService.get('STRIPE_PUBLIC_KEY'),
      };
    } catch (error) {
      return { result: false, error };
    }
  }
}
