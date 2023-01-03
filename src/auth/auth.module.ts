import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategy/local.strategy';
import { jwtConstants } from './constants';
import { configs } from 'src/config';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: configs.jwtExpirationTime },
    }),
  ],
  providers: [LocalStrategy, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
