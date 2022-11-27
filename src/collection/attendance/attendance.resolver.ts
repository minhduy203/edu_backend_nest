import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from '../user/user.service';
import {
  CreateAttendanceInput,
  UpdateAttendanceInput,
  UpdateAttendancesInput,
} from './attendance.input';
import { AttendanceService } from './attendance.service';
import { AttendanceType } from './attendance.type.';

@Resolver((_of) => AttendanceType)
export class AttendanceResolver {
  constructor(
    private attendanceService: AttendanceService,
    private userService: UserService,
  ) {}

  @Query((_returns) => [AttendanceType])
  async getAttendanceByClass(@Args('id') id: string) {
    const attendances = await this.attendanceService.getAttendanceByIdClass(id);

    return attendances;
  }

  @Mutation((_returns) => [AttendanceType])
  async updateAttendances(
    @Args('updateAttendancesInput')
    updateAttendancesInput: UpdateAttendancesInput,
    @Args('class_id') class_id: string
  ) {
    const attandances = await this.attendanceService.updateAttendanceMany(
      updateAttendancesInput,
      class_id
    );
    return attandances;
  }

  @Mutation((_returns) => AttendanceType)
  createAttendance(
    @Args('createAttendanceInput') createAttendanceInput: CreateAttendanceInput
  ) {
    return this.attendanceService.createAttendance(createAttendanceInput);
  }

  @Mutation((_return) => AttendanceType)
  updateAttendance(
    @Args('updateAttendanceInput') updateAttendanceInput: UpdateAttendanceInput,
  ) {
    return this.attendanceService.updateAttendance(updateAttendanceInput);
  }

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
