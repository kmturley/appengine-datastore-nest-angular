import { Controller, Get, UseGuards, Res, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

    @Get('google')
    @UseGuards(AuthGuard('google'))
    googleLogin() {
      // initiates the Google OAuth2 login flow
    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    googleLoginCallback(@Req() req) {
      const jwt: string = req.user.jwt;
      if (jwt) {
        return `<html><body><script>window.opener.postMessage('${jwt}', 'http://localhost:4200')</script></body></html>`;
      } else {
        return 'There was a problem signing in...';
      }
    }

    @Get('protected')
    @UseGuards(AuthGuard('jwt'))
    protectedResource() {
      return 'JWT is working!';
    }
}
