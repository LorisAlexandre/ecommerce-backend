import { Body, Controller, Post } from '@nestjs/common';
import { InvoiceServices } from './invoice.services';
import { InvoiceDto } from './dtos';

@Controller('invoice')
export class InvoiceControllers {
  constructor(private invoiceServices: InvoiceServices) {}

  @Post('create')
  createInvoice(@Body() invoiceDto: InvoiceDto) {
    const invoice = this.invoiceServices.createInvoice(invoiceDto);
    return this.invoiceServices.createPdf(invoice);
  }
}
