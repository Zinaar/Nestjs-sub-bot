import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { TimeModule } from '../time/time.module';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule, TimeModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
