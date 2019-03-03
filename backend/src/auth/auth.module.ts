import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './google.strategy';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [AuthController],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [AuthService, GoogleStrategy, JwtStrategy],
})
export class AuthModule {}
