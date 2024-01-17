import { Body, Controller, Post } from '@nestjs/common';
import { InvoiceServices } from './invoice.services';
import { InvoiceDto } from './dtos';

@Controller('invoice')
export class InvoiceControllers {
  constructor(private invoiceServices: InvoiceServices) {}
}
