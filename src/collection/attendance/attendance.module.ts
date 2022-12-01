import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from '../schedule/schedule.entity';
import { ScheduleModule } from '../schedule/schedule.module';
import { User } from '../user/user.entity';
import { UserModule } from '../user/user.module';
import { Attendance } from './attendance.entity';
import { AttendanceResolver } from './attendance.resolver';
import { AttendanceService } from './attendance.service';
// import { UserResolver } from './user.resolver';
// import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Attendance, User, Schedule]),
    UserModule,
    ScheduleModule,
  ],
  providers: [AttendanceResolver, AttendanceService],
  exports: [AttendanceService],
})
export class AttendanceModule {}
