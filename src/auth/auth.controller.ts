import { Controller, Request, Post, Get, UseGuards, Res, Logger, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    /*
    * Guards have a single responsibility. They determine
    * whether a given request will be handled by the route handler or not,
    * depending on certain conditions (like permissions, roles, ACLs, etc.)
    * present at run-time. This is often referred to as authorization.
    */
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req, @Res() res: Response) {
        const user = await this.authService.login(req.user);
        Logger.log('Response returned ' + user);
        return res.status(HttpStatus.OK).json(user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    async getProfile(@Request() req, @Res() res: Response) {
        const user = await req.user;
        Logger.log('Response returned ' + user);
        return res.status(HttpStatus.OK).json(user);
    }
}
