import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetCurrentUser } from 'src/common/decorators';
import { UserService } from '../user/user.service';
import { CreateAttandanceInput } from './attandance.input';
import { AttandanceService } from './attandance.service';
import { AttandanceType } from './attandance.type.';

@Resolver((_of) => AttandanceType)
export class AttandanceResolver {
  constructor(
    private attandanceService: AttandanceService,
    private userService: UserService,
  ) {}

  // @Query((_returns) => [TagType])
  // async getTag(@GetCurrentUser() user) {
  //   const { sub } = user;

  //   const tags = await this.attandanceService.getTabByIdUser(sub);

  //   return tags;
  // }

  @Mutation((_returns) => AttandanceType)
  createAttandance(
    @Args('createAttandanceInput') createAttandanceInput: CreateAttandanceInput,
    @GetCurrentUser() user,
  ) {
    const { sub } = user;

    return this.attandanceService.createAttandance(createAttandanceInput, sub);
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
