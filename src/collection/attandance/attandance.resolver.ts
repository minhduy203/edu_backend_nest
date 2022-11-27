import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from '../user/user.service';
import {
  CreateAttandanceInput,
  UpdateAttandanceInput,
} from './attandance.input';
import { AttandanceService } from './attandance.service';
import { AttandanceType } from './attandance.type.';

@Resolver((_of) => AttandanceType)
export class AttandanceResolver {
  constructor(
    private attandanceService: AttandanceService,
    private userService: UserService,
  ) {}

  @Query((_returns) => [AttandanceType])
  async getAttandanceByClass(@Args('id') id: string) {
    const attandances = await this.attandanceService.getAttandanceByIdClass(id);

    return attandances;
  }

  @Mutation((_returns) => AttandanceType)
  createAttandance(
    @Args('createAttandanceInput') createAttandanceInput: CreateAttandanceInput,
  ) {
    return this.attandanceService.createAttandance(createAttandanceInput);
  }

  @Mutation((_return) => AttandanceType)
  updateAttandance(
    @Args('updateAttandanceInput') updateAttandanceInput: UpdateAttandanceInput,
    @Args('id') id: string,
  ) {
    return this.attandanceService.updateAttandance(updateAttandanceInput, id);
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
