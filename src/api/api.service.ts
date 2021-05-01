import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientRedis } from '@nestjs/microservices';

import { redisPricePushKey } from '../redis.config';
import { REDIS_PUB_CLIENT } from './api.constants';

@Injectable()
export class ApiService {
  private logger: Logger = new Logger(ApiService.name)

  constructor(
    @Inject(REDIS_PUB_CLIENT) private client: ClientRedis,
  ) {}

  public async pushPrice(userName: string): Promise<void> {
    this.logger.log(`Price push requested for '${userName}'`);
    this.client.emit(redisPricePushKey, userName);
  }
}
