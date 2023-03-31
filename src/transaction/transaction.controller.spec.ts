import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { mockTransactions } from '.././utils/mocks';
import { AccountService } from '.././account/account.service';
import {
  ACCOUNT_REPOSITORY,
  TRANSACTION_REPOSITORY,
} from '.././utils/constants';
import { Web3Service } from '.././web3/web3.service';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

describe('TransactionController', () => {
  let controller: TransactionController;
  let service: TransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [
        TransactionService,
        AccountService,
        Web3Service,
        ConfigService,
        {
          provide: ACCOUNT_REPOSITORY,
          useValue: {},
        },
        {
          provide: TRANSACTION_REPOSITORY,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
    controller = module.get<TransactionController>(TransactionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of transactions', async () => {
      jest
        .spyOn(service, 'findAll')
        .mockImplementation(() => Promise.resolve(mockTransactions));

      expect(await controller.getAll()).toBe(mockTransactions);
    });
  });
});
