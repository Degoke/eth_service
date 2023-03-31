import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Web3 from 'web3';
import ganache from 'ganache-cli';

@Injectable()
export class Web3Service {
  private web3: Web3;
  public utils: any;
  constructor(private readonly configService: ConfigService) {
    this.web3 =
      this.configService.get('env') === 'test'
        ? new Web3(ganache.provider())
        : new Web3(
            new Web3.providers.HttpProvider(configService.get('web3.provider')),
          );
    this.utils = this.web3.utils;
  }

  async create() {
    try {
      return await this.web3.eth.accounts.create();
    } catch (error) {
      throw error;
    }
  }

  async getBalance(address: string) {
    try {
      return await this.web3.eth.getBalance(address);
    } catch (error) {
      throw error;
    }
  }

  async signTransaction(transaction: any, privateKey: string) {
    try {
      return await this.web3.eth.accounts.signTransaction(
        transaction,
        privateKey,
      );
    } catch (error) {
      throw error;
    }
  }

  sendSignedTransaction(signedTransaction: any) {
    try {
      return this.web3.eth.sendSignedTransaction(signedTransaction);
    } catch (error) {
      throw error;
    }
  }

  async encrypt(privateKey: string, password: string) {
    try {
      return await this.web3.eth.accounts.encrypt(privateKey, password);
    } catch (error) {
      throw error;
    }
  }

  async decrypt(keystore: any, password: string) {
    try {
      return await this.web3.eth.accounts.decrypt(keystore, password);
    } catch (error) {
      throw error;
    }
  }

  async getGasPrice() {
    try {
      return await this.web3.eth.getGasPrice();
    } catch (error) {
      throw error;
    }
  }

  async getTransactionCount(address: string) {
    try {
      return await this.web3.eth.getTransactionCount(address);
    } catch (error) {
      throw error;
    }
  }

  async estimateGas(transaction: any) {
    try {
      return await this.web3.eth.estimateGas(transaction);
    } catch (error) {
      throw error;
    }
  }

  async getAccounts() {
    try {
      return await this.web3.eth.personal.getAccounts();
    } catch (error) {
      throw error;
    }
  }

  async fundAccount(account: string) {
    try {
      const index = Math.floor(Math.random() * 10);
      const accounts = await this.getAccounts();
      const transaction = {
        from: accounts[index],
        to: account,
        value: this.utils.toWei('1', 'ether'),
      };
      return await this.web3.eth.sendTransaction(transaction);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
