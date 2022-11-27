import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { UserModule } from '../user/user.module';
import { Attendance } from './attendance.entity';
import { AttendanceResolver } from './attendance.resolver';
import { AttendanceService } from './attendance.service';
// import { UserResolver } from './user.resolver';
// import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Attendance, User]), UserModule],
  providers: [AttendanceResolver, AttendanceService],
  exports: [AttendanceService],
})
export class AttendanceModule {}
