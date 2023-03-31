import { Document } from 'mongoose';

export interface Account extends Document {
  readonly address: string;
  readonly encrypted_private_key: object;
  readonly data: object;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
