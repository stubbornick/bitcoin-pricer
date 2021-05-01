import { Module } from '@nestjs/common';
import { RedisModule } from 'nestjs-redis';

import { redisUrl } from '../redis.config';
import { PricerController } from './pricer.controller';
import { PricerService } from './pricer.service';

@Module({
  imports: [
      RedisModule.register({
        url: redisUrl,
      }),
  ],
  controllers: [PricerController],
  providers: [PricerService],
  exports: [PricerService],
})
export class PricerModule {}
