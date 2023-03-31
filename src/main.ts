import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AccountService } from './account/account.service';
import { AppModule } from './app.module';
import { Web3Service } from './web3/web3.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.enableCors();

  app.use(helmet());

  const options = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 8000;
  await app.listen(port);
  Logger.log(`Application listening on port ${port}`, 'Bootstrap');

  const accountService = app.get(AccountService);
  await accountService.create();
  await accountService.create();
  Logger.log('Accounts created', 'Bootstrap');
}
bootstrap();
