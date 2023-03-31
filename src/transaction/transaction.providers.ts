import {
  DATABASE_CONNECTION,
  TRANSACTION_REPOSITORY,
} from '.././utils/constants';
import { TransactionSchema } from './schemas/transaction.schema';

export const transactionProviders = [
  {
    provide: TRANSACTION_REPOSITORY,
    useFactory: (connection) =>
      connection.model('Transaction', TransactionSchema),
    inject: [DATABASE_CONNECTION],
  },
];
