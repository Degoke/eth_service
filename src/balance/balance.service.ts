import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountService } from '.././account/account.service';
import { Web3Service } from '.././web3/web3.service';

@Injectable()
export class BalanceService {
  constructor(
    private readonly web3Service: Web3Service,
    private readonly accountService: AccountService,
  ) {}
  async getBalance(account: string) {
    const accountExists = await this.accountService.findOneByAddress(account);
    if (!accountExists) {
      throw new NotFoundException(`Account ${account} not found`);
    }
    const balance = await this.web3Service.getBalance(account);
    return {
      balance: this.web3Service.utils.fromWei(balance, 'ether'),
    };
  }
}
