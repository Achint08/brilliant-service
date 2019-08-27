import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JWTSecret } from '../constants';
import { LocalStrategy, JwtStrategy } from '../strategies';
import { AuthController } from '../auth/auth.controller';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(),
        TypeOrmModule.forFeature([User]),
        PassportModule,
        JwtModule.register({
          secret: JWTSecret.secret,
          signOptions: { expiresIn: '1h' },
        }),
       ],
       providers: [
         AuthService,
         LocalStrategy,
         JwtStrategy,
       ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
