import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { transactionProviders } from './transaction.providers';
import { AccountService } from '.././account/account.service';
import { AccountModule } from '.././account/account.module';
import { Web3Module } from '.././web3/web3.module';
import { Web3Service } from '.././web3/web3.service';
import { DatabaseModule } from '.././database/database.module';
import { accountProviders } from '.././account/account.providers';

@Module({
  controllers: [TransactionController],
  providers: [
    ...transactionProviders,
    ...accountProviders,
    TransactionService,
    AccountService,
  ],
  imports: [DatabaseModule, AccountModule],
})
export class TransactionModule {}
