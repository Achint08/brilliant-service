import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AuthModule } from '../src/auth/auth.module';
import { UserModule } from '../src/user/user.module';
import { UserService } from '../src/services';
import { INestApplication, HttpModule, HttpService } from '@nestjs/common';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/entities';
import { Repository } from 'typeorm';
import { createConnection } from 'net';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let httpService: HttpService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [UserModule, TypeOrmModule.forRoot(), UserService, HttpModule],
        providers: [ UserService, {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    })
    .compile();

    app = moduleFixture.createNestApplication();
    httpService = moduleFixture.get<HttpService>(HttpService);
    await app.init();
  });

  afterEach(async done => {
    done();
  });

  it('/ (GET)', async () => {
    const response = await request(app.getHttpServer())
        .post('/auth/login')
        .expect(200)
        .expect('Hello World!');
  });
});
