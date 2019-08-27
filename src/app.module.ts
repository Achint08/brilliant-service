import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { User } from './entities';

@Module({
  imports: [
  /*
  * The forRoot() method accepts the same configuration
  * object as createConnection() from the TypeORM package.
  */
  TypeOrmModule.forRoot(),
  /*
    * The module uses forFeature() method to define
    * which repositories shall be registered in the current scope.
    */
  TypeOrmModule.forFeature([User]),
  UserModule,
  AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}

}
