import { Controller, HttpStatus, Post, Get, UseGuards, Param, Body, Res, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../services';
import { User } from '../entities';
import { Response } from 'express';

@Controller('user')
export class UserController {

    constructor(private service: UserService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id([0-9]+)')
    async get(@Param() params, @Res() res: Response) {
        Logger.log('User ID' + params.id);
        const queryResponse = await this.service.getUser(params.id);

        if (!queryResponse.success) {
            return res.status(HttpStatus.NOT_FOUND).json(queryResponse);
        } else {
            return res.status(HttpStatus.OK).json(queryResponse);
        }
    }

    @Post('create')
    async create(@Body() user: User, @Res() res: Response) {
        const creationResponse = await this.service.createUser(user);
        if (!creationResponse.success) {
            return res.status(HttpStatus.PRECONDITION_FAILED).json(creationResponse);
        } else {
            return res.status(HttpStatus.OK).json(creationResponse);
        }
    }
}
