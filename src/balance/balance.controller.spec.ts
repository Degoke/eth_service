import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { mockAccounts } from '.././utils/mocks';
import { AccountService } from '.././account/account.service';
import { ACCOUNT_REPOSITORY } from '.././utils/constants';
import { Web3Service } from '.././web3/web3.service';
import { BalanceController } from './balance.controller';
import { BalanceService } from './balance.service';

describe('BalanceController', () => {
  let controller: BalanceController;
  let service: BalanceService;
  let web3Service: Web3Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BalanceController],
      providers: [
        BalanceService,
        AccountService,
        Web3Service,
        {
          provide: ACCOUNT_REPOSITORY,
          useValue: {},
        },
        ConfigService,
      ],
    }).compile();

    controller = module.get<BalanceController>(BalanceController);
    service = module.get<BalanceService>(BalanceService);
    web3Service = module.get<Web3Service>(Web3Service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    it('should return balance of account', async () => {
      jest.spyOn(service, 'getBalance').mockImplementation(() =>
        Promise.resolve({
          balance: web3Service.utils.fromWei('0', 'ether'),
        }),
      );
      expect(await controller.findOne(mockAccounts[0].address)).toEqual({
        balance: '0',
      });
    });
  });
});
