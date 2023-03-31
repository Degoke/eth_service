import * as mongoose from 'mongoose';

export const AccountSchema = new mongoose.Schema(
  {
    address: { type: String, index: true },
    encrypted_private_key: Object,
    createdAt: Date,
    updatedAt: Date,
  },
  {
    timestamps: true,
  },
);
