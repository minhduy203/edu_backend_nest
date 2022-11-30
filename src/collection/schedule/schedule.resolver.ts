import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from '../user/user.service';
import {
  CreateScheduleInput,
  UpdateScheduleInput,
  UpdateSchedulesInput,
} from './schedule.input';
import { ScheduleService } from './schedule.service';
import { ScheduleType } from './schedule';

@Resolver((_of) => ScheduleType)
export class ScheduleResolver {
  constructor(
    private ScheduleService: ScheduleService,
    private userService: UserService,
  ) {}

  @Query((_returns) => [ScheduleType])
  async getScheduleByClass(@Args('id') id: string) {
    const Schedules = await this.ScheduleService.getScheduleByIdClass(id);

    return Schedules;
  }

  @Mutation((_returns) => Boolean)
  async updateSchedules(
    @Args('updateSchedulesInput')
    updateSchedulesInput: UpdateSchedulesInput,
    @Args('class_id') class_id: string,
  ) {
    const attandances = await this.ScheduleService.updateScheduleMany(
      updateSchedulesInput,
      class_id,
    );
    return attandances;
  }

  @Mutation((_returns) => ScheduleType)
  createSchedule(
    @Args('createScheduleInput') createScheduleInput: CreateScheduleInput,
  ) {
    return this.ScheduleService.createSchedule(createScheduleInput);
  }

  @Mutation((_return) => ScheduleType)
  updateSchedule(
    @Args('updateScheduleInput') updateScheduleInput: UpdateScheduleInput,
  ) {
    return this.ScheduleService.updateSchedule(updateScheduleInput);
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
