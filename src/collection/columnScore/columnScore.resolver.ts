import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetCurrentUser } from 'src/common/decorators';
import { UserService } from '../user/user.service';
import {
  CreateColumnScoreInput,
  UpdateColumnScoreInput,
} from './columnScore.input';
import { ColumnScoreService } from './columnScore.service';
import { ColumnScoreType } from './columnScore.type.';

@Resolver((_of) => ColumnScoreType)
export class ColumnScoreResolver {
  constructor(
    private columnScoreService: ColumnScoreService,
    private userService: UserService,
  ) {}

  @Query((_returns) => [ColumnScoreType])
  async getColumnScoresByClass(@Args('class_id') class_id: string) {
    const columnScores = await this.columnScoreService.getColumnScoresByIdClass(
      class_id,
    );

    return columnScores;
  }

  // @Mutation((_returns) => Boolean)
  // async updateAttendances(
  //   @Args('updateAttendancesInput')
  //   updateAttendancesInput: UpdateAttendancesInput,
  //   @Args('class_id') class_id: string,
  // ) {
  //   const attandances = await this.attendanceService.updateAttendanceMany(
  //     updateAttendancesInput,
  //     class_id,
  //   );
  //   return attandances;
  // }

  @Mutation((_returns) => ColumnScoreType)
  createColumnScore(
    @Args('createAttendanceInput')
    createAttendanceInput: CreateColumnScoreInput,
  ) {
    return this.columnScoreService.createColumnScore(createAttendanceInput);
  }

  @Mutation((_return) => ColumnScoreType)
  updateColumnScore(
    @Args('updateColumnScoreInput')
    updateColumnScoreInput: UpdateColumnScoreInput,
    @Args('id') id: string,
  ) {
    return this.columnScoreService.updateColumnScore(
      updateColumnScoreInput,
      id,
    );
  }

  @Mutation((_returns) => Boolean)
  async deleteColumnScore(
    @Args('deleteColumnScore') id: string,
    @GetCurrentUser() user,
  ) {
    // const { sub } = user;
    // const userInfo = await this.columnScoreService.getAttandanceById(id);

    // if (userInfo.user_id === sub) {
    return await this.columnScoreService.deleteColumnScoreById(id);
    // } else {
    // throw new Error("You don't have permission to delete people's tag");
    // }
  }
}
