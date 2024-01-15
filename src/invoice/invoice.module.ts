import { Module } from '@nestjs/common';
import { InvoiceControllers } from './invoice.controllers';
import { InvoiceServices } from './invoice.services';

@Module({
  imports: [],
  providers: [InvoiceServices],
  controllers: [InvoiceControllers],
})
export class InvoiceModule {}
