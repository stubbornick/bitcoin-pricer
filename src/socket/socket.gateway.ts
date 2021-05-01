import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { PricerService } from '../pricer/pricer.service';

@WebSocketGateway()
export class SocketGateway
implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server

  private logger: Logger = new Logger(SocketGateway.name)

  constructor(private pricerService: PricerService) {}

  @SubscribeMessage('hello')
  public handleMessage(client: Socket, payload: string): void {
    this.logger.log(`Message from client: ${payload}`);
  }

  @SubscribeMessage('authorize')
  public handleAuthorize(client: Socket, name: string): void {
    this.pricerService.addSubscriber({
      id: client.id,
      name,
      emitter: (message) => client.emit('price', message),
    });

    client.emit('message', `You authorized as '${name}'`);
  }

  public afterInit(): void {
    this.logger.log('WebSocket gateway initialized');
  }

  public handleDisconnect(client: Socket): void {
    this.pricerService.removeSubscriber(client.id);
    this.logger.log(`[Client: ${client.id}] Disconnected`);
  }

  public handleConnection(client: Socket): void {
    this.logger.log(`[Client: ${client.id}] New connection`);
  }
}
