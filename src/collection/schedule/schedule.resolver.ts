import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from '../user/user.service';
import {
  CreateScheduleInput,
  UpdateScheduleInput,
  UpdateSchedulesInput,
} from './schedule.input';
import { ScheduleService } from './schedule.service';
import { ScheduleType } from './schedule.type';

@Resolver((_of) => ScheduleType)
export class ScheduleResolver {
  constructor(
    private scheduleService: ScheduleService,
    private userService: UserService,
  ) {}

  @Query((_returns) => [ScheduleType])
  async getScheduleByClass(@Args('id') id: string) {
    const schedules = await this.scheduleService.getScheduleByIdClass(id);

    return schedules;
  }

  @Mutation((_returns) => Boolean)
  async updateSchedules(
    @Args('updateSchedulesInput')
    updateSchedulesInput: UpdateSchedulesInput,
    @Args('class_id') class_id: string,
  ) {
    const attandances = await this.scheduleService.updateScheduleMany(
      updateSchedulesInput,
      class_id,
    );
    return attandances;
  }

  @Mutation((_returns) => ScheduleType)
  createSchedule(
    @Args('createScheduleInput') createScheduleInput: CreateScheduleInput,
  ) {
    return this.scheduleService.createSchedule(createScheduleInput);
  }

  @Mutation((_return) => ScheduleType)
  updateSchedule(
    @Args('updateScheduleInput') updateScheduleInput: UpdateScheduleInput,
  ) {
    return this.scheduleService.updateSchedule(updateScheduleInput);
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
