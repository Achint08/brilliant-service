import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { UserService, AuthService } from '../services';
import { UserController } from './user.controller';
import { User } from '../entities';
import { LocalStrategy } from '../strategies';
import { JwtModule } from '@nestjs/jwt';
import { JWTSecret } from '../constants';

@Module({
  imports: [
    /*
    * The module uses forFeature() method to define
    * which repositories shall be registered in the current scope.
    */
    TypeOrmModule.forFeature([User]),
    /*
    * Passport performs series of steps to:
    * Authenticate a user by verifying their "credentials"
    * (such as username/password, JSON Web Token (JWT),
    * or identity token from an Identity Provider).
    * Manage authenticated state (by issuing a portable
    * token, such as a JWT, or creating an Express session).
    * Attach information about the authenticated user to
    * the Request object for further use in route handlers
    */
    PassportModule,
    /*
    * JWT utilities module for Nest based on the jsonwebtoken package.
    */
    JwtModule.register({
      secret: JWTSecret.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    /*
    * Services
    */
   UserService,
   AuthService,
   /*
   * Strategies
   */
   LocalStrategy,
  ],
  controllers: [UserController],
  exports: [UserService],
})

export class UserModule { }
