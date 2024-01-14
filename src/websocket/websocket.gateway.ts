import { UseInterceptors } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { IpAddressInterceptor } from './interceptor';
import { IpAddressService } from './ipAddress.service';

@WebSocketGateway()
export class MyWebSocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private ipAddressService: IpAddressService) {}
  @WebSocketServer() server: Server;

  @UseInterceptors(IpAddressInterceptor)
  @SubscribeMessage('userInfos')
  async handleConnection(client: Socket, payload) {
    // Faire logique pour incrémenter le nb de personnes sur le site IRL
    // incrémente nb de visite total sur le site + date (ajouter une date à un tableau pour ensuite les trier)
    const ipAddress = await this.ipAddressService.getIpAddress();
    console.log('connected', client.id, payload, ipAddress);
  }

  @SubscribeMessage('activeCart')
  handleActiveCart() {
    // incrément activeCart
  }

  @SubscribeMessage('disactiveCart')
  handleDisactiveCart() {
    // décrémente activeCart
  }

  handleDisconnect(client: Socket) {
    // Faire logique pour décrémenter le nb de personnes sur le site
    console.log('disconnected', client.id);
  }
}
