import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { redisPricePushKey } from '../redis.config';
import { PricerService } from './pricer.service';

@Controller('pricer')
export class PricerController {
  constructor(private pricerService: PricerService) {}

  @MessagePattern(redisPricePushKey)
  public pushPrice(@Payload() userName: string): Promise<void> {
    return this.pricerService.pushPrice(userName);
  }
}
