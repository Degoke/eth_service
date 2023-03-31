import { Test, TestingModule } from '@nestjs/testing';
import { Web3Service } from '.././web3/web3.service';
import { ACCOUNT_REPOSITORY } from '.././utils/constants';
import { AccountService } from './account.service';
import { ConfigService } from '@nestjs/config';
import { mockAccounts } from '.././utils/mocks';

describe('AccountService', () => {
  let service: AccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        {
          provide: ACCOUNT_REPOSITORY,
          useValue: {
            find: jest.fn().mockImplementation(() => ({
              select: jest.fn().mockImplementation(() => ({
                exec: jest.fn().mockImplementation(() => mockAccounts),
              })),
            })),
            findOne: jest.fn().mockImplementation((payload) => ({
              exec: jest
                .fn()
                .mockImplementation(() =>
                  mockAccounts.find((a) => a.address === payload.address),
                ),
            })),
          },
        },
        Web3Service,
        ConfigService,
      ],
    }).compile();

    service = module.get<AccountService>(AccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of accounts', async () => {
      expect(await service.findAll()).toBe(mockAccounts);
    });
  });

  describe('findOneByAddress', () => {
    it('should return an account', async () => {
      expect(await service.findOneByAddress(mockAccounts[0].address)).toBe(
        mockAccounts[0],
      );
    });
  });
});
