import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import * as jwt from '../../jwt.json';

export enum Provider {
  GOOGLE = 'google',
}

@Injectable()
export class AuthService {
    async validateOAuthLogin(thirdPartyId: string, provider: Provider): Promise<string> {
        try {
          return sign({
            thirdPartyId,
            provider,
          }, jwt.secret_key, {
            expiresIn: 3600,
          });
        } catch (err) {
          throw new InternalServerErrorException('validateOAuthLogin', err.message);
        }
    }
}
