import { Injectable } from '@nestjs/common';
import * as moment from 'moment-timezone';

@Injectable()
export class TimeService {
  constructor() {}

  async convertTimeToGMT(time: string, timezone: string[]): Promise<string> {
    const utcTime = moment.tz(time, 'HH:mm', timezone[0]).utc().format('HH:mm');
    return utcTime;
  }

  async generateTimeGMT(): Promise<string> {
    const date = new Date();
    const timeGMT = moment(date, 'HH:mm').utc().format('HH:mm');
    return timeGMT;
  }
}
