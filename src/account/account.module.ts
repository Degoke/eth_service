import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { accountProviders } from './account.providers';
import { DatabaseModule } from '.././database/database.module';
import { Web3Module } from '.././web3/web3.module';
import { Web3Service } from '.././web3/web3.service';

@Module({
  controllers: [AccountController],
  providers: [...accountProviders, AccountService],
  exports: [AccountService],
  imports: [DatabaseModule],
})
export class AccountModule {}
