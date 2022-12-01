import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { UserModule } from '../user/user.module';
import { Schedule } from './schedule.entity';
import { ScheduleResolver } from './schedule.resolver';
import { ScheduleService } from './schedule.service';
// import { UserResolver } from './user.resolver';
// import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule, User]), UserModule],
  providers: [ScheduleResolver, ScheduleService],
  exports: [ScheduleService],
})
export class ScheduleModule {}
