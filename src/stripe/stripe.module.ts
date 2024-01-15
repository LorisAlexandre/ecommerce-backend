import { Module } from '@nestjs/common';
import { StripeMobileControllers, StripeWebControllers } from './controllers';
import { StripeMobileServices, StripeWebServices } from './services';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [StripeMobileServices, StripeWebServices],
  controllers: [StripeMobileControllers, StripeWebControllers],
})
export class StripeModule {}
