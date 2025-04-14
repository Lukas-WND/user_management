import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { comparePasswordWithHash } from 'src/utils/crypto/transform';
import { Injectable, UnauthorizedException } from '@nestjs/common';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(register: string, pass: string) {
    const user = await this.userService.findOneByEmailOrEmployeeID(register);
    const confirm = user
      ? await comparePasswordWithHash(pass, user.password)
      : false;

    if (user && confirm) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user) {
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getProfile(id: string) {
    const user = await this.userService.findOneByID(id);

    if (!user) throw new UnauthorizedException('Usuário não encontrado');
    return user;
  }
}
