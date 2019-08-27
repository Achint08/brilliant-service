import { Injectable, Inject, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { LoginDetails, UserDetails, UserResponse } from '../interfaces';
import { JwtService } from '@nestjs/jwt';
import { checkIfUnencryptedPasswordIsValid } from '../utils';
import { UserModule } from 'src/user/user.module';

@Injectable()
export class AuthService {

    private user: User;

    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(User) private usersRepository: Repository<User>) { }

    /*
    * Validates the user
    * @param: [data: newUser]: Essential details for New User
    */
    public async validateUser(data: LoginDetails): Promise<UserDetails | null> {
      let user: User;
      try {
          user = await this.usersRepository.findOne({
            select: ['id', 'password', 'userName', 'firstName', 'lastName', 'organizationId', 'role', 'email'],
            where: [{ userName : data.userName }],
          });
        } catch (error) {
          Logger.error('Error while looking in DB' + error);
          return null;
        }
      Logger.warn('No User found for ' + data.userName);
      if (user && checkIfUnencryptedPasswordIsValid(data.password, user.password)) {
          Logger.warn('User ' + data.userName + ' Validated!');
          return user;
        }
      Logger.warn('Password Mismatch for ' + data.userName);
      return null;
    }

    /*
    * Logins the user
    * @param: [data: user]: User deatils for logins
    * @returns: [token: any]: Signed JWT Token
    */
    public async login(user: any): Promise<UserResponse> {
        let accessToken: string;
        const payload = { userName: user.userName, id: user.id };
        Logger.log('User ' + payload.userName + ' Authenticated');
        try {
          accessToken = this.jwtService.sign(payload);
        } catch (error) {
          Logger.error('Error while generating JWT string');
          return {
            success: false,
            message: {
              error_message: 'Error while generating JWT.',
            },
            data: {},
          };
        }
        return {
          success: true,
          message: 'Authenticated!',
          data: {
            access_token: accessToken,
          },
        };
      }
}
