import { Module } from '@nestjs/common';
import { AuthService } from '../services';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JWTSecret } from '../constants';
import { JwtStrategy, LocalStrategy } from '../strategies';

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
    AuthService,
    /*
    * Strategies
    */
    LocalStrategy,
    JwtStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
