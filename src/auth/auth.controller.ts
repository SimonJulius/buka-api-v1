import {
  Body,
  Controller,
  Post,
  Req,
  Request,
  HttpCode,
  UseGuards,
  UseInterceptors,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { CreateUserDto } from '../user/dto/create-user.dto';
import { LocalAuthGuard } from './auth-guard/local-auth.guard';
import { JwtAuthGuard } from './auth-guard/jwt-auth.guard';
import { AuthService } from './auth.service';
import RequestWithUser from './req-with-user.interface';

import MongooseClassSerializerInterceptor from '../interceptors/mongoose-class-serializer.interceptor';
import { User } from '../user/schemas/user.schema';

@Controller('auth')
@UseInterceptors(MongooseClassSerializerInterceptor(User))
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('create-user')
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.createUser(createUserDto);
    if (user.email) {
      const loginPayload = {
        user: {
          email: user.email,
          password: user.password,
        },
      } as unknown as RequestWithUser;
      this.login(loginPayload);
    }
    return user;
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: RequestWithUser) {
    try {
      const { user } = req;
      const cookie = this.authService.getCookieWithJwtToken(
        user._id,
        user.email,
      );
      req.res?.setHeader('Set-Cookie', cookie);
      return this.authService.login(user);
    } catch (error) {
      throw new HttpException(
        'Email or password mismatch',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(200)
  async logOut(@Req() request: RequestWithUser) {
    request.res?.setHeader('Set-Cookie', this.authService.getLogoutCookies());
  }
}
