import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as jwt from '../../jwt.json';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

    constructor() {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwt.secret_key,
      });
    }

    async validate(payload, done: any) {
      try {
        done(null, payload);
      } catch (err) {
        throw new UnauthorizedException('unauthorized', err.message);
      }
    }
}
