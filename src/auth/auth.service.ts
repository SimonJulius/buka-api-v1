import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { isEmpty } from 'lodash';
import { UsersService } from '../user/user.service';
import { UserUtils } from 'src/utils/users.utils';
import { User } from 'src/user/schemas/user.schema';

@Injectable()
export class AuthService {
  @Inject(UsersService)
  private readonly userService: UsersService;

  @Inject(JwtService)
  private jwtService: JwtService;

  async validateUser(email: string, pass: string) {
    const user = await this.userService.findByEmail(email);
    if (isEmpty(user)) return;
    const isPasswordMatch = await UserUtils.validatePassword(
      pass,
      user.password,
    );

    if (isPasswordMatch) {
      const { password, ...userInfo } = user;
      return userInfo;
    }

    return null;
  }

  async login(user: User) {
    const payload = {
      name: `${user.firstName}  ${user.lastName}`,
      sub: user.email,
    };
    const { password, ...userInfo } = user;
    return {
      access_token: this.jwtService.sign(payload),
      ...userInfo,
    };
  }
}
