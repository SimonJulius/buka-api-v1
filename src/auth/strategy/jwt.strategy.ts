import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Configs } from '../../config';

interface JWTPayloadInterface {
  sub: string;
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(public configs: Configs) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configs.getConfigs().jwtSecretKey,
    });
  }

  async validate(payload: JWTPayloadInterface) {
    return payload.sub;
  }
}
