import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { Configs } from '../config';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { ConfigsModule } from '../config/configs.module';

@Module({
  imports: [
    ConfigsModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        JWT_SECRET_KEY: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
      }),
    }),
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule, ConfigsModule],
      inject: [Configs],
      useFactory: async (configService: Configs) => ({
        secret: configService.getConfigs().jwtSecretKey,
        signOptions: {
          expiresIn: configService.getConfigs().jwtExpirationTime,
        },
      }),
    }),
  ],
  providers: [LocalStrategy, AuthService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
