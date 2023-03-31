import { ACCOUNT_REPOSITORY, DATABASE_CONNECTION } from '.././utils/constants';
import { AccountSchema } from './schemas/account.schema';

export const accountProviders = [
  {
    provide: ACCOUNT_REPOSITORY,
    useFactory: (connection) => connection.model('Account', AccountSchema),
    inject: [DATABASE_CONNECTION],
  },
];
