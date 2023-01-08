import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { CreateUserDto } from '../user/dto/create-user.dto';
import { LocalAuthGuard } from './auth-guard/local-auth.guard';
import { AuthService } from './auth.service';

import MongooseClassSerializerInterceptor from '../interceptors/mongoose-class-serializer.interceptor';
import { User } from '../user/schemas/user.schema';

@Controller('auth')
@UseInterceptors(MongooseClassSerializerInterceptor(User))
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('create-user')
  async create(@Body() createUserDto: CreateUserDto) {
    const user = this.authService.createUser(createUserDto);
    console.log(user);
    return user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
