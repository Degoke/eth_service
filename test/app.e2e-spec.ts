import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

let app: INestApplication;
jest.setTimeout(100000);

beforeAll(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();
});

afterAll(async () => {
  await app.close();
});

describe('AppController (e2e)', () => {
  let testAddress1: string;
  let testAddress2: string;

  it('/accounts (POST)', () => {
    return request(app.getHttpServer())
      .post('/accounts')
      .expect(HttpStatus.CREATED)
      .expect({
        message: 'created',
      });
  });

  it('/accounts (POST)', () => {
    return request(app.getHttpServer())
      .post('/accounts')
      .expect(HttpStatus.CREATED)
      .expect({
        message: 'created',
      });
  });

  it('/accounts (GET)', () => {
    return request(app.getHttpServer())
      .get('/accounts')
      .expect(HttpStatus.OK)
      .expect((res) => {
        testAddress1 = res.body[res.body.length - 2].address;
        testAddress2 = res.body[res.body.length - 1].address;
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[0]).toHaveProperty('address');
        expect(res.body[0]).toHaveProperty('_id');
      });
  });

  it('tesh address 2 should have balance', () => {
    return request(app.getHttpServer())
      .get('/balance/' + testAddress1)
      .expect(HttpStatus.OK)
      .expect({
        balance: '1',
      });
  });

  it('test address 2 should have balance (GET)', () => {
    return request(app.getHttpServer())
      .get('/balance/' + testAddress1)
      .expect(HttpStatus.OK)
      .expect({
        balance: '1',
      });
  });

  it('/transactions (POST)', () => {
    return request(app.getHttpServer())
      .post('/transactions')
      .send({
        from: testAddress1,
        to: testAddress2,
        value: '0.1',
      })
      .expect(HttpStatus.CREATED)
      .expect((res) => {
        expect(res.body).toHaveProperty('transactionHash');
        expect(res.body.from).toBe(testAddress1);
        expect(res.body.to).toBe(testAddress2);
        expect(res.body.value).toBe('0.1');
        expect(res.body).toHaveProperty('status');
      });
  });

  it('/transactions (GET)', () => {
    return request(app.getHttpServer())
      .get('/transactions')
      .expect(HttpStatus.OK)
      .expect((res) => {
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[res.body.length - 1]).toHaveProperty('transactionHash');
        expect(res.body[res.body.length - 1].from).toBe(testAddress1);
        expect(res.body[res.body.length - 1].to).toBe(testAddress2);
        expect(res.body[res.body.length - 1].value).toBe('0.1');
        expect(res.body[res.body.length - 1]).toHaveProperty('status');
      });
  });

  it('/balancd/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/balance/' + testAddress2)
      .expect(HttpStatus.OK)
      .expect({
        balance: '1.1',
      });
  });
});
