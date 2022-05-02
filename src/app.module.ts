import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotModule } from './core/bot/bot.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(config().database.url),
    BotModule,
    TelegrafModule.forRootAsync({
      useFactory: () => ({
        token: config().bot.token,
      }),
    }),
  ],
})
export class AppModule {}
