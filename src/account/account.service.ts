import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { ACCOUNT_REPOSITORY } from '.././utils/constants';
import { Web3Service } from '.././web3/web3.service';
import { Account } from './interfaces/accountKeystore.interface';

@Injectable()
export class AccountService {
  constructor(
    @Inject(ACCOUNT_REPOSITORY)
    private accountModel: Model<Account>,
    private web3Sevice: Web3Service,
    private configService: ConfigService,
  ) {}
  async create() {
    try {
      const secret = this.configService.get('secret');
      const account = await this.web3Sevice.create();
      const encryptedAccount = await this.web3Sevice.encrypt(
        account.privateKey,
        secret,
      );

      await this.web3Sevice.fundAccount(account.address);

      await this.accountModel.create({
        address: account.address,
        encrypted_private_key: encryptedAccount,
      });
      return {
        message: 'created',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: new Error(error),
      });
    }
  }

  async findAll(): Promise<any> {
    try {
      return await this.accountModel
        .find()
        .select('-encrypted_private_key')
        .exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: new Error(error),
      });
    }
  }

  async findOneByAddress(address: string): Promise<Account> {
    try {
      return await this.accountModel.findOne({ address }).exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: new Error(error),
      });
    }
  }
}
