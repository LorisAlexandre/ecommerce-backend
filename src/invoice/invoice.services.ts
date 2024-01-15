import { Injectable } from '@nestjs/common';
import { InvoiceDto } from './dtos';
import * as PDFDocument from 'pdfkit';
import { CloudinaryService } from 'nestjs-cloudinary';

@Injectable()
export class InvoiceServices {
  constructor(private cloudinaryService: CloudinaryService) {}
  createInvoice(invoiceDto: InvoiceDto) {
    const invoice = `
<html>
  <head>
    <style>
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: monospace;
      }
      body {
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 350px;
        margin: 1rem 0;
      }
      table {
        width: 75%;
        border-top: 1px dashed;
        border-bottom: 1px dashed;
        margin: 1.5rem 0 1rem 0;
      }
      td {
        text-align: center;
        padding: 0.5rem;
      }
    </style>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <h1>Mugensei</h1>
    <br />
    <h2>Facture - ${invoiceDto.date}</h2>
    <table>
      <tbody>
        ${invoiceDto.articles.map(
          (a) => `
          <tr>
            <td>${a.article.cityName}</td>
            <td>x${a.quantity}</td>
            <td>€ ${a.article.price}</td>
            <td>€ ${a.article.price * a.quantity}</td>
        </tr>
        `,
        )}
        <tr>
          <td>Shipping Fees</td>
          <td>${invoiceDto.shippingFees ? 'x1' : '--'}</td>
          <td>€ ${invoiceDto.shippingFees || '--'}</td>
          <td>€ ${invoiceDto.shippingFees || 'Free'}</td>
        </tr>
      </tbody>
    </table>
    <h3>Payé €${invoiceDto.price}</h3>
    <br />
    <h2>Commande n°${invoiceDto.order}</h2>
    <a href="${invoiceDto.orderUrl}" target="_blank">Suivre colis</a>
  </body>
</html>
`;
    return invoice;
  }

  async createPdf(invoice) {}

  uploadFile(fileBuffer: Buffer) {
    return new Promise((resolve, reject) => {
      this.cloudinaryService.cloudinary.uploader
        .upload_stream(
          {
            resource_type: 'auto',
          },
          (err, result) => {
            if (err) reject(err);
            else
              resolve({ url: result.secure_url, public_id: result.public_id });
          },
        )
        .end(fileBuffer);
    });
  }
}
