import { Injectable, Inject } from '@nestjs/common';
import { isEmpty } from 'lodash';
import { UsersService } from '../user/user.service';
import { UserUtils } from 'src/utils/users.utils';

@Injectable()
export class AuthService {
  @Inject(UsersService)
  private readonly userService: UsersService;

  async validateUser(email: string, pass: string) {
    const user = await this.userService.findByEmail(email);
    if (isEmpty(user)) return;
    const isPasswordMatch = await UserUtils.validatePassword(
      pass,
      user.password,
    );

    if (isPasswordMatch) {
      const { password, ...userInfo } = user;
      console.log('pass ', password);
      console.log('user info: ', userInfo);
      console.log('user: ', user);
      return userInfo;
    }

    return null;
  }
}
