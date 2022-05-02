import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  chatId: Number,
  date: Number,
  chosenTimeGMT: String,
  lat: Number,
  lon: Number,
  timezone: Object,
});
