import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GetCurrentUser } from 'src/common/decorators';
import { JwtPayload } from 'src/type';
import { ScheduleService } from '../schedule/schedule.service';
import { UserService } from '../user/user.service';
import { Attendance } from './attendance.entity';
import { AttendanceClassInput } from './attendance.input';
import { AttendanceService } from './attendance.service';
import { AttendanceType } from './attendance.type';

@Resolver((_of) => AttendanceType)
export class AttendanceResolver {
  constructor(
    private AttendanceService: AttendanceService,
    private scheduleService: ScheduleService,
    private userService: UserService,
  ) {}

  @Query((_returns) => [AttendanceType])
  async getAttendanceToday(@Args('class_id') class_id: string) {
    const Attendances = await this.AttendanceService.getAttendanceToday(
      class_id,
    );
    return Attendances;
  }

  @Query((_return) => [AttendanceType])
  async getMyHistoryAttendance(
    @GetCurrentUser() user: JwtPayload,
    @Args('class_id') class_id: string,
  ) {
    const { sub } = user;
    const Attendances = await this.AttendanceService.getMyHistoryAttendance(
      sub,
      class_id,
    );

    return Attendances;
  }

  @Query((_return) => [[AttendanceType]])
  async getHistoryAttendanceByClass(@Args('class_id') class_id: string) {
    const ListAttendanceOfStudents =
      await this.AttendanceService.getHistoryAttendanceByClass(class_id);

    return ListAttendanceOfStudents;
  }

  @Mutation((_returns) => Boolean)
  async updateAttendances(
    @Args('attendanceClassInput')
    attendancesInput: AttendanceClassInput,
    @Args('schedule_id') schedule_id: string,
  ) {
    const attandances = await this.AttendanceService.attendanceClass(
      attendancesInput,
      schedule_id,
    );
    return attandances;
  }

  @ResolveField()
  async schedule(@Parent() attendance: Attendance) {
    const schedule = await this.scheduleService.getScheduleById(
      attendance.schedule_id,
    );
    return schedule;
    // return this.tagService.getManyTags(question.tags);
  }

  // @Mutation((_returns) => AttendanceType)
  // createAttendance(
  //   @Args('createAttendanceInput') createAttendanceInput: CreateAttendanceInput,
  // ) {
  //   return this.AttendanceService.createAttendance(createAttendanceInput);
  // }

  // @Mutation((_return) => AttendanceType)
  // updateAttendance(
  //   @Args('updateAttendanceInput') updateAttendanceInput: UpdateAttendanceInput,
  // ) {
  //   return this.AttendanceService.updateAttendance(updateAttendanceInput);
  // }

  // @Mutation((_returns) => Boolean)
  // async deleteAttandance(@Args('deleteAttandance') id: string, @GetCurrentUser() user) {
  //   const { sub } = user;
  //   const userInfo = await this.attandanceService.getAttandanceById(id);

  //   if (userInfo.user_id === sub) {
  //     return this.tagService.deleteTag(id);
  //   } else {
  //     throw new Error("You don't have permission to delete people's tag");
  //   }
  // }
}
