import { Article } from 'src/articles/schema';

export class InvoiceDto {
  date: Date;
  order: string;
  orderUrl: string;
  price: number;
  shippingFees: number;
  articles: [
    {
      article: Article;
      quantity: number;
    },
  ];
}
