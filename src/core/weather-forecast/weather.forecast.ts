import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import config from 'src/config/config';

@Injectable()
export class WeatherService {
  constructor(private readonly httpService: HttpService) {}

  async getWeatherForecast(lat: number, lon: number): Promise<string> {
    const weatherForecast = await lastValueFrom(
      this.httpService
        .get(config().weatherApi.apiUrl, {
          params: {
            lat,
            lon,
            appid: config().weatherApi.apiKey,
            units: 'metric',
          },
        })
        .pipe(map((resp) => resp.data)),
    );
    if (weatherForecast) return this.filterWeatherForecast(weatherForecast);
    return;
  }

  private filterWeatherForecast(weatherForecast: any): string {
    const temperature = weatherForecast.main.temp;
    const city = weatherForecast.name;
    return this.filterForecastMessage(temperature, city);
  }

  private filterForecastMessage(temperature: number, city: string): string {
    return `It's ${temperature}°C in ${city} today !`;
  }
}
