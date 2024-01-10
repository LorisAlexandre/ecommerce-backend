import {
  CanActivate,
  ExecutionContext,
  Header,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    configService: ConfigService,
    private jwt: JwtService,
  ) {}

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
