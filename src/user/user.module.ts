import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { UserService, AuthService } from '../services';
import { UserController } from './user.controller';
import { User } from '../entities';
import { LocalStrategy } from '../strategies';
import { JwtModule } from '@nestjs/jwt';
import { JWTSecret } from 'src/constants';

@Module({
  imports: [
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
    LocalStrategy,
  ],
  controllers: [UserController],
  exports: [UserService],
})

export class UserModule { }
