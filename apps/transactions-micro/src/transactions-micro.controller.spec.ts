import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsMicroController } from './transactions-micro.controller';
import { TransactionsMicroService } from './transactions-micro.service';

describe('TransactionsMicroController', () => {
  let transactionsMicroController: TransactionsMicroController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsMicroController],
      providers: [TransactionsMicroService],
    }).compile();

    transactionsMicroController = app.get<TransactionsMicroController>(TransactionsMicroController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(transactionsMicroController.getHello()).toBe('Hello World!');
    });
  });
});
