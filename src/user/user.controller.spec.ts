import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService, AuthService } from '../services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JWTSecret } from '../constants';
import { JwtStrategy } from '../strategies';

describe('User Controller', () => {
  let controller: UserController;

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
         UserService,
         AuthService,
         JwtStrategy,
       ],
       controllers: [UserController],
       exports: [UserService, AuthService],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
