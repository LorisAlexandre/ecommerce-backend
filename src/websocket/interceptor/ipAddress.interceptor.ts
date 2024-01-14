import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map, tap } from 'rxjs';
import { IpAddressService } from '../ipAddress.service';

@Injectable()
export class IpAddressInterceptor implements NestInterceptor {
  constructor(private ipAddressService: IpAddressService) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const client = context.switchToWs().getClient();

    const ipAddress =
      client.handshake.headers['x-forwarded-for'] || client.handshake.address;

    this.ipAddressService.setIpAddress(ipAddress);

    return next.handle();
  }
}
