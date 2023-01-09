import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { isEmpty } from 'lodash';
import { UsersService } from '../user/user.service';
import { UserUtils } from '../utils/users.utils';
import { User } from '../user/schemas/user.schema';
import TokenPayload from './token-payload.interface';
import { Configs } from '../config';

@Injectable()
export class AuthService {
  @Inject(UsersService)
  private readonly userService: UsersService;

  @Inject(JwtService)
  private jwtService: JwtService;

  @Inject(Configs)
  private readonly configs: Configs;

  async validateUser(email: string, pass: string) {
    const user = await this.userService.findByEmail(email);
    if (isEmpty(user)) return;
    const isPasswordMatch = await UserUtils.validatePassword(
      pass,
      user.password,
    );

    if (isPasswordMatch) {
      return user;
    }

    throw new HttpException('wrong email or password', HttpStatus.BAD_REQUEST);
  }

  public getCookieWithJwtToken(userId: string, email: string) {
    const payload: TokenPayload = {
      sub: userId,
      email,
    };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${
      this.configs.getConfigs().jwtExpirationTime
    }`;
  }

  public getLogoutCookies() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }

  async login(user: User) {
    return user;
  }

  async createUser(payload: User) {
    return await this.userService.create(payload);
  }
}
