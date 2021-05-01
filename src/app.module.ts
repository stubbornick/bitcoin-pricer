import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

import { ApiModule } from './api/api.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PricerModule } from './pricer/pricer.module';
import { SocketGateway } from './socket.gateway';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [ApiModule, PricerModule, SocketModule],
  controllers: [AppController],
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
    AppService,
    SocketGateway,
  ],
})
export class AppModule {}
