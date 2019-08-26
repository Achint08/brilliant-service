import { Injectable, Inject, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { LoginDetails, UserDetails } from '../interfaces';
import { JwtService } from '@nestjs/jwt';
import { checkIfUnencryptedPasswordIsValid } from '../utils';

@Injectable()
export class AuthService {

    private user: User;

    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(User) private usersRepository: Repository<User>) { }

    /*
    * Validates the user
    * @prop: [data: newUser]: Essential details for New User
    */
    public async validateUser(data: LoginDetails): Promise<UserDetails | null> {
        const user = await this.usersRepository.findOne({
            select: ['id', 'password', 'userName', 'firstName', 'lastName', 'organizationId', 'role', 'email'],
            where: [{ userName : data.userName }],
          });
        Logger.log(user);
        if (user && checkIfUnencryptedPasswordIsValid(data.password, user.password)) {
            return user;
          }
        return null;
    }

    /*
    * Logins the user
    * @prop: [data: user]: User deatils for logins
    * @returns: [token: any]: Signed JWT Token
    */
    public async login(user: any) {
        const payload = { userName: user.userName, id: user.id };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
}
