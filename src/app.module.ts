import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigsModule } from './config/configs.module';
import { Configs } from './config';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { FoodModule } from './food/food.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        MONGO_DB_USERNAME: Joi.string().required(),
        MONGO_DB_PASSWORD: Joi.string().required(),
        MONGO_DATABASE: Joi.string().required(),
        MONGO_HOST: Joi.string().required(),
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigsModule],
      useFactory: async (configs: Configs) => {
        const username = configs.getConfigs().dbUsername;
        const password = configs.getConfigs().dbPassword;
        const database = configs.getConfigs().db;
        const host = configs.getConfigs().dbHost;
        return {
          uri: `mongodb+srv://${username}:${password}@${host}`,
          dbName: database,
        };
      },
      inject: [Configs],
    }),
    UserModule,
    AuthModule,
    RestaurantsModule,
    FoodModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
