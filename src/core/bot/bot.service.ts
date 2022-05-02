import { Context } from 'telegraf';
import { Start, Update, Hears, Help, On } from 'nestjs-telegraf';
import { MessageGenerator } from './messages/message.generator';
import { UserService } from '../user/user.service';
import { ReplyMarkup } from 'src/utils/reply.markup';
import { ICommands } from 'src/common';

@Update()
export class BotService {
  commands: ICommands;
  constructor(
    private readonly userService: UserService,
    private readonly messageGenerator: MessageGenerator,
    private readonly replyMarkup: ReplyMarkup,
  ) {
    this.commands = {
      start: '/start',
      help: '/help',
      about: '/about',
      process: '/process',
    };
  }

  @Start()
  async start(ctx: Context) {
    if ('first_name' in ctx.chat) {
      const firstName = ctx.chat.first_name;
      await ctx.reply(this.messageGenerator.generateStartMessage(firstName));
    }
  }

  @Help()
  async help(ctx: Context) {
    const commandList = Object.values(this.commands);
    await ctx.reply(this.messageGenerator.generateHelpMessage(commandList));
    return;
  }

  @Hears('/about')
  async about(ctx: Context) {
    await ctx.reply(this.messageGenerator.generateAboutMessage());
    return;
  }

  @Hears('/process')
  async process(ctx: Context) {
    await ctx.reply(
      this.messageGenerator.generateProcessMessage(),
      this.replyMarkup.location,
    );
    return;
  }

  @On('location')
  async location(ctx: Context) {
    await this.userService.saveUserModel(ctx);
    await ctx.reply(this.messageGenerator.generateContinueMessage());
    return;
  }

  @Hears(/^(2[0-3]|[0-1]?[\d]):[0-5][\d]$/)
  async processTime(ctx: Context) {
    await this.userService.updateUserTIme(ctx);
    await ctx.reply(this.messageGenerator.generateFinishMessage());
    return;
  }
}
