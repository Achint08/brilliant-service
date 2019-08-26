import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { NewUser, UserDetails } from '../interfaces';
import { hashPassword } from '../utils';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

    /*
    * Returns the User on the basis on id
    * @prop: [id: number]: Id number of the user
    * @returns: User
	*/
    public async getUser(id: number): Promise<UserDetails> {
        return await this.usersRepository.findOne({
            select: ['id', 'userName', 'firstName', 'lastName', 'organizationId', 'role', 'email'],
            where: [{ id }],
        });
    }

    /*
    * Creates a new user
    * @prop: [data: newUser]: Essential details for New User
	*/
    public async createUser(data: NewUser) {

        try {
            const existingUser = this.usersRepository.findOneOrFail({
                select: ['id', 'userName', 'firstName', 'lastName', 'organizationId', 'role', 'email'],
                where: [{ userName: data.userName }],
            });
        } catch (error) {
            return {
                success: false,
                message: error.message,
            };
        }

        const user = new User();
        user.userName = data.userName;
        user.password = hashPassword(data.password);
        user.organizationId = data.organizationId;
        user.role = data.role;
        user.email = data.email;
        user.firstName = data.firstName;
        user.lastName = data.lastName;

        try {
            await this.usersRepository.save(user);
        } catch (error) {
            return {
                success: false,
                message: error.message,
            };
        }

        const user1 = await this.usersRepository.findOne({
            select: ['id', 'userName', 'firstName', 'lastName', 'organizationId', 'role', 'email'],
            where: [{ userName: user.userName }],
        });
        return {
            success: true,
            message: user1,
        };
    }
}
