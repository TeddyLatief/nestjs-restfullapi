import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Auth E2E', () => {
  let app: INestApplication;
  let accessToken: string;

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

  it('POST /users', async () => {
    await request(app.getHttpServer())
      .post('/users')
      .send({
        email: `test${Date.now()}@mail.com`,
        password: 'password123',
      })
      .expect(201);
  });

  it('POST /auth/login', async () => {
    const email = `test${Date.now()}@mail.com`;
    const password = 'password123';

    await request(app.getHttpServer()).post('/users').send({ email, password });

    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email, password })
      .expect(201);

    accessToken = res.body.accessToken;
  });

  it('GET /users', async () => {
    await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
  });
});
