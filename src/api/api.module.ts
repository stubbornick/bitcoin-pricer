import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { redisUrl } from '../redis.config';
import { REDIS_PUB_CLIENT } from './api.constants';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: REDIS_PUB_CLIENT,
        transport: Transport.REDIS,
        options: {
          url: redisUrl,
        },
      },
    ]),
  ],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
