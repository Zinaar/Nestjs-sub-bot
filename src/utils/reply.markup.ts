import { Injectable } from '@nestjs/common';

@Injectable()
export class ReplyMarkup {
  location: {
    reply_markup: {
      keyboard: { text: string; request_location: boolean }[][];
      resize_keyboard: boolean;
      one_time_keyboard: boolean;
      force_reply: boolean;
    };
  };
  finish: {
    reply_markup: {
      keyboard: { text: string }[][];
      resize_keyboard: boolean;
      one_time_keyboard: boolean;
      force_reply: boolean;
    };
  };
  constructor() {
    this.location = {
      reply_markup: {
        keyboard: [[{ text: 'my location', request_location: true }]],
        resize_keyboard: true,
        one_time_keyboard: true,
        force_reply: true,
      },
    };
    this.finish = {
      reply_markup: {
        keyboard: [[{ text: 'finish' }]],
        resize_keyboard: true,
        one_time_keyboard: true,
        force_reply: true,
      },
    };
  }
}
