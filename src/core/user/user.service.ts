import { Injectable } from '@nestjs/common';
import { Context } from 'telegraf';
import { find as findTimezone } from 'geo-tz';
import { IUsers } from 'src/common';
import { UserRepository } from 'src/database/repositories/user.repository';
import { TimeService } from '../time/time.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly timeService: TimeService,
  ) {}

  async saveUserModel(ctx: Context): Promise<void> {
    const user = await this.userRepository.checkUser(ctx.chat.id);
    if (user) return;
    const { latitude: lat, longitude: lon } = ctx.message['location'];
    const userData = {
      chatId: ctx.chat.id,
      date: ctx.message.date,
      chosenTimeGMT: '0',
      lat,
      lon,
      timezone: findTimezone(lat, lon),
    };
    await this.userRepository.createUser(userData);
  }

  async updateUserTIme(ctx: Context): Promise<void> {
    const time = ctx.message['text'];
    const chatId = ctx.chat.id;
    const user = await this.userRepository.checkUser(chatId);
    const timezone = user.timezone;
    const chosenTimeGMT = await this.timeService.convertTimeToGMT(
      time,
      timezone,
    );
    await this.userRepository.updateUserTime(chatId, chosenTimeGMT);
  }

  async checkSelectedTime(): Promise<IUsers[]> {
    const time = await this.timeService.generateTimeGMT();
    return this.userRepository.checkUserTime(time);
  }
}
