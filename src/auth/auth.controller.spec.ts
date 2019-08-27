import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JWTSecret } from '../constants';
import { AuthService } from '../services';
import { LocalStrategy, JwtStrategy } from '../strategies';

describe('Auth Controller', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
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
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
