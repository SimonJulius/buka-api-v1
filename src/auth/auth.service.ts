import { Injectable, Inject } from '@nestjs/common';
import { isEmpty } from 'lodash/isEmpty';
import { UsersService } from '../user/user.service';

@Injectable()
export class AuthService {
  @Inject(UsersService)
  private readonly userService: UsersService;

  async validateUser(email: string, pass: string) {
    const user = await this.userService.findByEmail(email);
    if (isEmpty(user)) return;
    if (pass === user.password) {
      const { password, ...userInfo } = user;
      return userInfo;
    }

    return null;
  }
}
