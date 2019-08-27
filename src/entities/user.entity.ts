import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Length, IsNotEmpty } from 'class-validator';

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
    @Length(4, 20)
    userName: string;

    @Column()
    @Length(4, 20)
    firstName: string;

    @Column()
    @Length(4, 20)
    lastName: string;

    @Column()
    @Length(4, 100)
    password: string;

    @Column()
    organizationId: string;

    @Column()
    @IsNotEmpty()
    role: string;

    @Column()
    email: string;

    @Column()
    @CreateDateColumn()
    userCreationTime: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
}
