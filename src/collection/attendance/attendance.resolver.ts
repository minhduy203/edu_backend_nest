import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from '../user/user.service';
import { AttendanceClassInput } from './attendance.input';
import { AttendanceService } from './attendance.service';
import { AttendanceType } from './attendance.type';

@Resolver((_of) => AttendanceType)
export class AttendanceResolver {
  constructor(
    private AttendanceService: AttendanceService,
    private userService: UserService,
  ) {}

  // @Query((_returns) => [AttendanceType])
  // async getAttendanceByClass(@Args('id') id: string) {
  //   const Attendances = await this.AttendanceService.getAttendanceByIdClass(id);

  //   return Attendances;
  // }

  @Mutation((_returns) => Boolean)
  async updateAttendances(
    @Args('attendanceClassInput')
    attendancesInput: AttendanceClassInput,
    @Args('class_id') schedule_id: string,
  ) {
    const attandances = await this.AttendanceService.attendanceClass(
      attendancesInput,
      schedule_id,
    );
    return attandances;
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
