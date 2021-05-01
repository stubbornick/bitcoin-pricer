import { Test, TestingModule } from '@nestjs/testing';

import { PricerController } from './pricer.controller';

describe('PricerController', () => {
  let controller: PricerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PricerController],
    }).compile();

    controller = module.get<PricerController>(PricerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
