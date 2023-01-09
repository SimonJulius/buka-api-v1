import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class Configs {
  constructor(private configService: ConfigService) {}

  public getConfigs() {
    return {
      // Database Configs
      dbUsername: this.configService.get('MONGO_DB_USERNAME'),
      dbPassword: this.configService.get('MONGO_DB_PASSWORD'),
      db: this.configService.get('MONGO_DATABASE'),
      dbHost: this.configService.get('MONGO_HOST'),

      // JWT configs
      jwtSecretKey: this.configService.get('JWT_SECRET_KEY'),
      jwtExpirationTime: this.configService.get('JWT_EXPIRATION_TIME') + 's',
    };
  }
}
