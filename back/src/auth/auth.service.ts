import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(register: string, pass: string) {
    const user = await this.userService.findOneByEmailOrEmployeeID(register);
    const confirm = user ? await compare(pass, user.password) : false;

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
}
