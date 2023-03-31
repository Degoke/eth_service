import { Document } from 'mongoose';

export interface Transaction extends Document {
  readonly from: string;
  readonly to: string;
  readonly value: string;
  readonly status: string;
  readonly blockHash: string;
  readonly transactionHash: string;
  readonly transactionIndex: number;
  readonly cumulativeGasUsed: number;
  readonly numberOfConfirmations: number;
  readonly gasUsed: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface TransactionToSign {
  from: string;
  to: string;
  value: string;
  gasPrice: string;
  nonce: number;
  gas?: number;
}
