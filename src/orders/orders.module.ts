import { Module } from '@nestjs/common';
import { MongooseModelsModule } from 'src/mongoose/mongooseModels.module';
import { OrdersAdminController, OrdersUsersController } from './controllers';
import { OrdersAdminServices, OrdersUsersServices } from './services';
import { InvoiceModule } from 'src/invoice/invoice.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModelsModule, InvoiceModule, JwtModule],
  providers: [OrdersAdminServices, OrdersUsersServices],
  controllers: [OrdersAdminController, OrdersUsersController],
})
export class OrdersModule {}
