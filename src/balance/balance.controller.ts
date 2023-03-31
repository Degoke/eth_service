import { Controller, Get, Param } from '@nestjs/common';
import { BalanceService } from './balance.service';
@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Get(':account')
  findOne(@Param('account') account: string) {
    return this.balanceService.getBalance(account);
  }
}
