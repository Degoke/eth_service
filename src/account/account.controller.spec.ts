import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { mockAccounts } from '.././utils/mocks';
import { ACCOUNT_REPOSITORY } from '.././utils/constants';
import { Web3Service } from '.././web3/web3.service';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

describe('AccountController', () => {
  let controller: AccountController;
  let service: AccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [
        AccountService,
        {
          provide: ACCOUNT_REPOSITORY,
          useValue: {},
        },
        Web3Service,
        ConfigService,
      ],
    }).compile();

    service = module.get<AccountService>(AccountService);
    controller = module.get<AccountController>(AccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of accounts', async () => {
      jest
        .spyOn(service, 'findAll')
        .mockImplementation(() => Promise.resolve(mockAccounts));

      expect(await controller.findAll()).toBe(mockAccounts);
    });
  });
});
