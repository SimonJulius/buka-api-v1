import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Configs } from '.';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [Configs],
  exports: [Configs],
})
export class ConfigsModule {}
