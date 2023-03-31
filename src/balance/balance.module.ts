import { Module } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { BalanceController } from './balance.controller';
import { Web3Service } from '.././web3/web3.service';
import { AccountModule } from '.././account/account.module';
import { AccountService } from '.././account/account.service';
import { Web3Module } from '.././web3/web3.module';
import { DatabaseModule } from '.././database/database.module';
import { accountProviders } from '.././account/account.providers';

@Module({
  controllers: [BalanceController],
  providers: [...accountProviders, BalanceService, AccountService],
  imports: [DatabaseModule, AccountModule],
})
export class BalanceModule {}
