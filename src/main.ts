import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';
import { redisUrl } from './redis.config';

const appPort = process.env.APP_PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.REDIS,
    options: {
      url: redisUrl,
    },
  });
  await app.startAllMicroservicesAsync();

  await app.listen(appPort);
}

bootstrap();
