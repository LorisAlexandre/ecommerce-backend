import { Module } from '@nestjs/common';
import { MyWebSocketGateway } from './websocket.gateway';

@Module({
  imports: [],
  controllers: [],
  providers: [MyWebSocketGateway],
})
export class WebSocketModule {}
