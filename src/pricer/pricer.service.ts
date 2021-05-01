import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { RedisService } from 'nestjs-redis';

import { redisPriceKey } from '../redis.config';

export type Price = Record<string, string>

export interface PricerUserInterface {
  id: string
  name: string
  emitter: (message: Price) => void
}

@Injectable()
export class PricerService {
  private users = new Map<string, PricerUserInterface>();

  private usersNames = new Map<string, PricerUserInterface>();

  private redisClient: Redis;

  constructor(private readonly redisService: RedisService) {}

  public async onModuleInit(): Promise<void> {
    this.redisClient = await this.redisService.getClient();
  }

  public addSubscriber(user: PricerUserInterface): void {
    if (this.users.has(user.id)) {
      throw new Error(`'${user.id}' already registered!`);
    }

    this.users.set(user.id, user);
    this.usersNames.set(user.name, user);
  }

  public removeSubscriber(userId: string): void {
    const user = this.users.get(userId);

    if (user) {
      this.users.delete(userId);
      this.usersNames.delete(user.name);
    }
  }

  public async pushPrice(userName: string): Promise<void> {
    const price = JSON.parse(await this.redisClient.get(redisPriceKey));

    const user = this.usersNames.get(userName);
    if (user) {
      user.emitter(price);
    }
  }
}
