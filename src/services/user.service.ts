import { Injectable, Inject, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities';
import { NewUser, UserDetails, UserResponse } from '../interfaces';
import { hashPassword } from '../utils';
import { validateOrReject, validate, ValidationError } from 'class-validator';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

    /*
    * Returns the User on the basis on id
    * @param: [id: number]: Id number of the user
    * @returns: [type: UserResponse]: The response containing the user data
	*/
    public async getUser(id: number): Promise<UserResponse> {
        let user: User;
        try {
            user = await this.usersRepository.findOne({
                select: ['userName', 'firstName', 'lastName', 'organizationId', 'role', 'email'],
                where: [{ id }],
            });
        } catch (error) {
            Logger.error('Error while looking for user in DB: ' + error);
            return {
                success: false,
                message: {
                    error_message: 'Error looking in DB.',
                },
                data: {},
            };
        }
        if (!user) {
            Logger.error('No user found!');
            return {
                success: false,
                message: {
                    error_message: 'No user found!',
                },
                data: {},
            };
        } else {
            Logger.log('User found' + user);
            return {
                success: true,
                message: 'User found!',
                data: user,
            };
        }
    }

    /*
    * Creates a new user
    * @param: [data: newUser]: Essential details for New User
    * @returns: [type: UserResponse]: The response containing the user data
	*/
    public async createUser(data: NewUser): Promise<UserResponse> {

        let existingUser: User[] = [];
        if (!data.userName) {
            Logger.warn('userName not provided');
            return {
                success: false,
                message: {
                    error_message: 'userName not provided',
                },
                data: {},
            };
        }

        try {
            existingUser = await this.usersRepository.find({
                select: ['id', 'userName', 'firstName', 'lastName', 'organizationId', 'role', 'email'],
                where: [{ userName: data.userName }],
            });
        } catch (error) {
            Logger.error('Error finding user ' + error);
            return {
                success: false,
                message: {
                    error_message: 'Error while running query',
                },
                data: {},
            };
        }

        if (existingUser.length >= 1) {
            Logger.warn('User already exists');
            return {
                success: false,
                message: {
                    error_message: 'User already existing with the same userName',
                },
                data: {},
            };
        }

        const user = new User();
        user.userName = data.userName;
        user.password = null;
        if (data.password) {
            user.password = hashPassword(data.password);
        }
        user.organizationId = data.organizationId;
        user.role = data.role;
        user.email = data.email;
        user.firstName = data.firstName;
        user.lastName = data.lastName;

        let vErrors: ValidationError[] = [];

        try {
            vErrors = await validate(user);
        } catch (error) {
            Logger.error('Error while validating data' + error);
            return {
                success: false,
                message: {
                    error_message: 'Error while Validating',
                },
                data: {},
            };
        }

        if (vErrors.length >= 1) {
            Logger.error('Invalidate data' + vErrors);
            return {
                success: false,
                message: {
                    error_message: vErrors[0].constraints,
                },
                data: {},
            };
        }

        try {
            await this.usersRepository.save(user);
        } catch (error) {
            Logger.error('Error while saving user' + error);
            return {
                success: false,
                message: {
                    error_message: error.message,
                },
                data: {},
            };
        }

        return {
            success: true,
            message: 'User created!',
            data: {},
        };
    }
}
