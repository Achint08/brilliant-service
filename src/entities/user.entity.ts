import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Length, IsNotEmpty, IsEmail } from 'class-validator';

/*
* The TypeORM supports the repository design pattern, so each entity has its own Repository.
* These repositories can be obtained from the database connection.
*/
@Entity()
@Unique(['userName'])
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    @Length(4, 20)
    userName: string;

    @Column()
    @IsNotEmpty()
    @Length(4, 20)
    firstName: string;

    @Column()
    @IsNotEmpty()
    @Length(4, 20)
    lastName: string;

    @Column()
    @IsNotEmpty()
    @Length(4, 100)
    password: string;

    @Column()
    @IsNotEmpty()
    @Length(2, 20)
    organizationId: string;

    @Column()
    @IsNotEmpty()
    @Length(2, 20)
    role: string;

    @Column()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Column()
    @CreateDateColumn()
    userCreationTime: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
}
