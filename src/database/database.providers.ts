import * as mongoose from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { DATABASE_CONNECTION } from '.././utils/constants';

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: (configService: ConfigService): Promise<typeof mongoose> => {
      const uri =
        configService.get('env') === 'test'
          ? configService.get('database.test.uri')
          : configService.get('database.mongo.uri');
      return mongoose.connect(uri);
    },
    inject: [ConfigService],
  },
];
