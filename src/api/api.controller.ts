import { Body, Controller, HttpCode, HttpStatus , Post } from '@nestjs/common';

import { ApiService } from './api.service';
import { PricePushRequestDto } from './dto/price-push.request.dto';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Post('/push')
  @HttpCode(HttpStatus.ACCEPTED)
  public create(
    @Body() pricePushRequestDto: PricePushRequestDto,
  ): Promise<void> {
    const { userName } = pricePushRequestDto;
    return this.apiService.pushPrice(userName);
  }
}
