import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class PriceQueryGuards implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const param = request.params;
    const queries = ['price', 'shippingFees'];

    if (!queries.includes(param.query))
      throw new HttpException('Bad request, Query does not exist', 404);

    return true;
  }
}
