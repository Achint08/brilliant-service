import { Controller, Request, Post, Get, UseGuards, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services';

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
    async login(@Request() req) {
        const user = await this.authService.login(req.user);
        Logger.log('Response returned ' + user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    async getProfile(@Request() req) {
        const user = await req.user;
        Logger.log('Response returned ' + user);
        return user;
    }
}
