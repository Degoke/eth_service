import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { mockTransactions } from '.././utils/mocks';
import { AccountService } from '.././account/account.service';
import {
  ACCOUNT_REPOSITORY,
  TRANSACTION_REPOSITORY,
} from '.././utils/constants';
import { Web3Service } from '.././web3/web3.service';
import { TransactionService } from './transaction.service';

describe('TransactionService', () => {
  let service: TransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
          useValue: {
            find: jest.fn().mockImplementation(() => ({
              exec: jest.fn().mockImplementation(() => mockTransactions),
            })),
          },
        },
      ],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of transactions', async () => {
      expect(await service.findAll()).toBe(mockTransactions);
    });
  });
});
