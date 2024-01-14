import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class StatusGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const status = ['delivered', 'transit', 'creation'];
    const param = request.params;

    if (!status.includes(param.status))
      throw new HttpException('Bad Request', 400);

    return true;
  }
}
