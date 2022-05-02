import { Module } from '@nestjs/common';
import { ReplyMarkup } from 'src/utils/reply.markup';
import { MessageModule } from '../message/message.module';
import { UserModule } from '../user/user.module';
import { WeatherModule } from '../weather-forecast/weather.module';
import { BotService } from './bot.service';
import { MessageGenerator } from './messages/message.generator';

@Module({
  imports: [UserModule, WeatherModule, MessageModule],
  providers: [BotService, MessageGenerator, ReplyMarkup],
  exports: [BotService],
})
export class BotModule {}
