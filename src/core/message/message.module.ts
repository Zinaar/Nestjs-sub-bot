import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { UserModule } from '../user/user.module';
import { WeatherModule } from '../weather-forecast/weather.module';
import { MessageService } from './message.service';

@Module({
  imports: [
    UserModule,
    HttpModule.register({}),
    WeatherModule,
    ScheduleModule.forRoot(),
  ],
  providers: [MessageService],
  exports: [MessageService],
})
export class MessageModule {}
