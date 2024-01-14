import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwt: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const bearerToken = request.headers['authorization'].split(' ')[1];
    const decoded = this.jwt.decode(bearerToken, {});

    if (!decoded['role'] || decoded['role'] !== 'admin')
      throw new UnauthorizedException();
    return true;
  }
}
