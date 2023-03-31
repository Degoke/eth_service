import { Test, TestingModule } from '@nestjs/testing';
import { ACCOUNT_REPOSITORY } from '.././utils/constants';
import { AccountService } from '.././account/account.service';
import { Web3Service } from '.././web3/web3.service';
import { BalanceService } from './balance.service';
import { ConfigService } from '@nestjs/config';
import { mockAccounts } from '.././utils/mocks';

describe('BalanceService', () => {
  let service: BalanceService;
  let web3Service: Web3Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BalanceService,
        AccountService,
        Web3Service,
        {
          provide: ACCOUNT_REPOSITORY,
          useValue: {
            findOne: jest.fn().mockImplementation((payload) => ({
              exec: jest
                .fn()
                .mockImplementation(() =>
                  mockAccounts.find((a) => a.address === payload.address),
                ),
            })),
          },
        },
        ConfigService,
      ],
    }).compile();

    service = module.get<BalanceService>(BalanceService);
    web3Service = module.get<Web3Service>(Web3Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getBalance', () => {
    it('should return the balance of an account', async () => {
      jest
        .spyOn(web3Service, 'getBalance')
        .mockImplementation(() => Promise.resolve('0'));
      expect(await service.getBalance(mockAccounts[0].address)).toEqual({
        balance: '0',
      });
    });
  });
});
