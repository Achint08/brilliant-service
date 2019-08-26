import { Controller, Request, Post, Get, UseGuards, Param, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../services';
import { User } from '../entities';

@Controller('user')
export class UserController {

    constructor(private service: UserService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    get(@Param() params) {
        return this.service.getUser(params.id);
    }

    @Post()
    create(@Body() user: User) {
        return this.service.createUser(user);
    }
}
