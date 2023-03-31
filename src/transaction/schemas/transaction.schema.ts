import * as mongoose from 'mongoose';

export const TransactionSchema = new mongoose.Schema(
  {
    from: String,
    to: String,
    value: String,
    status: String,
    blockHash: String,
    transactionHash: String,
    transactionIndex: Number,
    cumulativeGasUsed: Number,
    numberOfConfirmations: Number,
    gasUsed: Number,
    createdAt: Date,
    updatedAt: Date,
  },
  {
    timestamps: true,
  },
);
