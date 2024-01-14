import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MyWebSocketGateway } from './websocket.gateway';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { IpAddressInterceptor } from './interceptor';
import { IpAddressService } from './ipAddress.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [
    MyWebSocketGateway,
    { provide: WebSocketModule, useClass: IpAddressInterceptor },
    IpAddressService,
  ],
})
export class WebSocketModule {}
