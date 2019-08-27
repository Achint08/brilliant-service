import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JWTSecret } from '../constants';
import { UserResponse } from '../interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: JWTSecret.secret,
    });
    }

    async validate(payload: any): Promise<UserResponse> {
        return {
            success: true,
            message: 'User Data returned!',
            data: {
                id: payload.id,
                userName: payload.userName,
            },
        };
    }
}
