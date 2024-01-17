import { Module } from '@nestjs/common';
import { MongooseModelsModule } from 'src/mongoose/mongooseModels.module';
import { OrdersAdminController, OrdersUsersController } from './controllers';
import { OrdersAdminServices, OrdersUsersServices } from './services';
import { InvoiceModule } from 'src/invoice/invoice.module';

@Module({
  imports: [MongooseModelsModule, InvoiceModule],
  providers: [OrdersAdminServices, OrdersUsersServices],
  controllers: [OrdersAdminController, OrdersUsersController],
})
export class OrdersModule {}
