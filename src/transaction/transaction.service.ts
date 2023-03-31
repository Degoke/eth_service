import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { AccountService } from '.././account/account.service';
import { TRANSACTION_REPOSITORY } from '.././utils/constants';
import { Web3Service } from '.././web3/web3.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import {
  Transaction,
  TransactionToSign,
} from './interfaces/transaction.interface';

@Injectable()
export class TransactionService {
  constructor(
    @Inject(TRANSACTION_REPOSITORY)
    private transactionModel: Model<Transaction>,
    private web3Service: Web3Service,
    private accountService: AccountService,
    private configService: ConfigService,
  ) {}
  async create(createTransactionDto: CreateTransactionDto) {
    try {
      const gasPrice = await this.web3Service.getGasPrice();
      const account = await this.accountService.findOneByAddress(
        createTransactionDto.from,
      );

      if (!account) {
        throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
      }

      const { privateKey } = await this.web3Service.decrypt(
        account.encrypted_private_key,
        this.configService.get('secret'),
      );

      const transaction: TransactionToSign = {
        from: createTransactionDto.from,
        to: createTransactionDto.to,
        value: this.web3Service.utils.toWei(
          createTransactionDto.value,
          'ether',
        ),
        gasPrice: gasPrice,
        nonce: await this.web3Service.getTransactionCount(
          createTransactionDto.from,
        ),
      };

      const gas = await this.web3Service.estimateGas(transaction);

      transaction.gas = gas;

      const { rawTransaction, transactionHash } =
        await this.web3Service.signTransaction(transaction, privateKey);

      const createdTransaction = await this.transactionModel.create({
        from: createTransactionDto.from,
        to: createTransactionDto.to,
        value: createTransactionDto.value,
        status: 'pending',
        nubmerOfConfirmations: 0,
        transactionHash,
      });

      this.web3Service
        .sendSignedTransaction(rawTransaction)
        .on('confirmation', async (confirmationNumber) => {
          await this.transactionModel.findByIdAndUpdate(
            createdTransaction._id,
            {
              status: 'confirmed',
              numberOfConfirmations: confirmationNumber,
            },
          );
        })
        .on('receipt', async (receipt) => {
          await this.transactionModel.findByIdAndUpdate(
            createdTransaction._id,
            {
              blockHash: receipt.blockHash,
              transactionIndex: receipt.transactionIndex,
              cumulativeGasUsed: receipt.cumulativeGasUsed,
              gasUsed: receipt.gasUsed,
            },
          );
        })
        .on('error', async (error) => {
          await this.transactionModel.findByIdAndUpdate(
            createdTransaction._id,
            {
              status: 'failed',
            },
          );
          throw error;
        });

      return createdTransaction;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: new Error(error),
      });
    }
  }

  async findAll(): Promise<any> {
    try {
      return await this.transactionModel.find().exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: new Error(error),
      });
    }
  }
}
