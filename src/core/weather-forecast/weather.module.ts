import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { WeatherService } from './weather.forecast';

@Module({
  imports: [HttpModule.register({})],
  providers: [WeatherService],
  exports: [WeatherService],
})
export class WeatherModule {}
