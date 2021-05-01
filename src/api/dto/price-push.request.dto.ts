import { IsString } from 'class-validator';

export class PricePushRequestDto {
  @IsString()
  readonly userName: string;
}
