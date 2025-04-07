import {
  Controller,
  Get,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Public } from './public-decorator';
import { Response } from 'express';
import { Request as ReqExpress } from 'express';
import { User } from 'src/user/entities/user.entity';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res() res) {
    const token = await this.authService.login(req.user);

    res.cookie('Authorization', token.access_token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24,
    });

    return res.json({ user: req.user });
  }

  @Post('logout')
  @Public()
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('Authorization');
    return res.json({ message: 'Logout realizado com sucesso' });
  }

  @Get('me')
  async getProfile(@Req() req: ReqExpress) {
    const user = req.user as User;
    const { id } = user;

    const result = await this.authService.getProfile(id);

    return result;
  }
}
