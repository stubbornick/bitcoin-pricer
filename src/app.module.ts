import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

import { ApiModule } from './api/api.module';
import { PricerModule } from './pricer/pricer.module';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [ApiModule, PricerModule, SocketModule],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidUnknownValues: true,
        forbidNonWhitelisted: true,
        validationError: {
          target: process.env.NODE_ENV === 'development',
        },
      }),
    },
  ],
})
export class AppModule {}
