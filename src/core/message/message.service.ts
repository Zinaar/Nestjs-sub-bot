import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { AxiosResponse } from 'axios';
import { Cron } from '@nestjs/schedule';
import { WeatherService } from '../weather-forecast/weather.forecast';
import config from 'src/config/config';
import { UserService } from '../user/user.service';

@Injectable()
export class MessageService {
  constructor(
    private readonly httpService: HttpService,
    private readonly weatherService: WeatherService,
    private readonly userService: UserService,
  ) {}

  async sendWeatherForecastMessage(
    message: string,
    chatId: number,
  ): Promise<AxiosResponse> {
    return lastValueFrom(
      this.httpService
        .post(config().bot.url, {
          text: message,
          chat_id: chatId,
          parse_mode: 'HTML',
        })
        .pipe(map((resp) => resp.data)),
    );
  }

  @Cron('*/5 * * * * *')
  async handleMessage() {
    await this.processUserData();
  }

  private async processUserData() {
    const response = await this.userService.checkSelectedTime();
    if (!response) return;
    for (let user of response) {
      const { lat, lon, chatId } = user;
      const weatherMessage = await this.weatherService.getWeatherForecast(
        lat,
        lon,
      );
      return this.sendWeatherForecastMessage(weatherMessage, chatId);
    }
  }
}
