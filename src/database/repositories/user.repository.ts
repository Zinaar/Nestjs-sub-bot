import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUsers } from 'src/common';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel('Users') private readonly userModel: Model<IUsers>,
  ) {}

  async createUser(userData: IUsers): Promise<IUsers> {
    return this.userModel.create(userData);
  }

  async checkUserTime(time: string): Promise<any> {
    return this.userModel.find({ chosenTimeGMT: time });
  }

  async checkUser(chatId: number): Promise<IUsers> {
    return this.userModel.findOne({ chatId });
  }

  async updateUserTime(
    chatId?: number,
    chosenTimeGMT?: string,
  ): Promise<IUsers> {
    return this.userModel.findOneAndUpdate({ chatId }, { chosenTimeGMT });
  }
}
