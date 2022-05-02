import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageGenerator {
  generateStartMessage(firstName: string): string {
    return `Hi ${
      firstName || 'User'
    }, How can i Help you ?\nPlease use /help to get info about currently avialable commands.\n or use /process command to continue`;
  }

  generateHelpMessage(commandList): string {
    return `This is the list of avialable commands\n${commandList.join(
      '\n',
    )}\n to receive information about the weather in your city, Please send me a location and time in a format 'HH:mm' to receive the information on daily basis`;
  }
  generateAboutMessage(): string {
    return "Hi, i'm nestjs-sub-bot\nsend me your live location and i will reply with current weather forecast daily\n please use /help for more detailed guide!";
  }

  generateWrongCommandMessage(): string {
    return 'Please use a valid command,\n use /help for command list';
  }

  generateProcessMessage(): string {
    return 'Please send me your location!';
  }

  generateContinueMessage(): string {
    return 'Please send me desired time in HH:mm format';
  }

  generateFinishMessage(): string {
    return 'Time saved succesfully!';
  }
}
