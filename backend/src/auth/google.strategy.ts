import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";
import { AuthService, Provider } from "./auth.service";
import * as credentials from '../../credentials.json';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

    constructor(
      private readonly authService: AuthService
    ) {
      super({
        clientID: credentials.web.client_id,
        clientSecret: credentials.web.client_secret,
        callbackURL: credentials.web.redirect_uris[0],
        passReqToCallback: true,
        scope: ['profile'],
      });
    }

    async validate(request: any, accessToken: string, refreshToken: string, profile, done: any) {
      try {
        console.log('validate', profile);
        const jwt: string = await this.authService.validateOAuthLogin(profile.id, Provider.GOOGLE);
        const user = {
          jwt,
        };
        done(null, user);
      } catch (err) {
        console.log('validate', err);
        done(err, false);
      }
    }

}
