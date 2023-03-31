import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AccountModule } from './account/account.module';
import { TransactionModule } from './transaction/transaction.module';
import { Web3Module } from './web3/web3.module';
import configuration from './config/configuration';
import { DatabaseModule } from './database/database.module';
import { BalanceModule } from './balance/balance.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      cache: true,
    }),
    DatabaseModule,
    AccountModule,
    TransactionModule,
    Web3Module,
    BalanceModule,
  ],
})
export class AppModule {}
