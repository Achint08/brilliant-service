import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDetails } from '../interfaces';
import { hashPassword } from '../utils';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
      const userdetails: LoginDetails = {
          userName: username,
          password,
      };
      const user = await this.authService.validateUser(userdetails);
      if (!user) {
        Logger.warn('Unauthorized User');
        throw new UnauthorizedException();
      }
      return user;
  }
}
