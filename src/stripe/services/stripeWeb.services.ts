import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { WebCartDto } from '../dtos';

@Injectable()
export class StripeWebServices {
  constructor(private configService: ConfigService) {}

  stripe = new Stripe(this.configService.get('STRIPE_PRIVATE_KEY'));

  async createCheckoutSession(webCartDto: WebCartDto) {
    try {
      const cartArticles = webCartDto.articles.map((a) => ({
        price_data: {
          currency: 'EUR',
          product_data: {
            name: a.article.cityName,
          },
          unit_amount: Math.floor(a.article.price * 100),
        },
        quantity: a.quantity,
      }));

      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          ...cartArticles,
          {
            price_data: {
              currency: 'EUR',
              product_data: {
                name: 'Shippings Fees',
              },
              unit_amount: Math.floor(webCartDto.shippingFees * 100),
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel',
      });

      return { result: true, url: session.url };
    } catch (error) {
      return { error, result: false };
    }
  }
}
