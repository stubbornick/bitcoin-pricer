import { Module } from '@nestjs/common';

import { PricerModule } from '../pricer/pricer.module';
import { SocketGateway } from './socket.gateway';

@Module({
  imports: [PricerModule],
  providers: [SocketGateway],
})
export class SocketModule {}
