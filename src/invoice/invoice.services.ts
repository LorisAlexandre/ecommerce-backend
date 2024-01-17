import { Injectable } from '@nestjs/common';
import { InvoiceDto } from './dtos';
import { CloudinaryService } from 'nestjs-cloudinary';

@Injectable()
export class InvoiceServices {
  constructor(private cloudinaryService: CloudinaryService) {}
  createInvoice(invoiceDto: InvoiceDto) {
    try {
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
      h2 {
        text-align: center;
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
    <h2>Facture - ${String(invoiceDto.date.getDate() + 1).padStart(
      2,
      '0',
    )}/${String(invoiceDto.date.getMonth() + 1).padStart(
      2,
      '0',
    )}/${invoiceDto.date.getFullYear()}</h2>
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
  </body>
</html>
`;
      return { invoice, result: true };
    } catch (error) {
      return { error };
    }
  }

  async createPdf(invoice: string) {
    try {
      const file = Buffer.from(invoice);
      const uploadedFile = await this.uploadFile(file);

      return { uploadedFile, result: true };
    } catch (error) {
      return { error };
    }
  }

  uploadFile(
    fileBuffer: Buffer,
  ): Promise<
    | { url: string; public_id: string }
    | { err: Error; url: string; public_id: string }
  > {
    return new Promise((resolve, reject) => {
      this.cloudinaryService.cloudinary.uploader
        .upload_stream(
          {
            resource_type: 'auto',
            folder: 'invoice',
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
