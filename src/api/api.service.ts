import { Inject, Injectable } from '@nestjs/common';
import { ClientRedis } from '@nestjs/microservices';

import { redisPricePushKey } from '../redis.config';
import { REDIS_PUB_CLIENT } from './api.constants';

@Injectable()
export class ApiService {
  constructor(
    @Inject(REDIS_PUB_CLIENT) private client: ClientRedis,
  ) {}

  public async pushPrice(userName: string): Promise<void> {
    this.client.emit(redisPricePushKey, userName);
  }
}
