import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Body,
} from '@nestjs/common';

import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/auth-guard/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { CreateUserDto } from './user/dto/create-user.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @Post('users/create-user')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('users/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
