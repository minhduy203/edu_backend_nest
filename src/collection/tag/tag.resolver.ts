import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetCurrentUser } from 'src/common/decorators';
import { UserService } from '../user/user.service';
import { CreateTagInput } from './tag.input';
import { TagService } from './tag.service';
import { TagType } from './tag.type.';

@Resolver((_of) => TagType)
export class TagResolver {
  constructor(
    private tagService: TagService,
    private userService: UserService,
  ) {}

  @Query((_returns) => [TagType])
  async getTag(@GetCurrentUser() user) {
    const { sub } = user;

    const tags = await this.tagService.getTabByIdUser(sub);

    return tags;
  }

  @Mutation((_returns) => TagType)
  createTag(
    @Args('createTagInput') createTagInput: CreateTagInput,
    @GetCurrentUser() user,
  ) {
    const { sub } = user;

    return this.tagService.createTag(createTagInput, sub);
  }

  @Mutation((_returns) => Boolean)
  async deleteTag(@Args('deleteMyInput') id: string, @GetCurrentUser() user) {
    const { sub } = user;
    const tag = await this.tagService.getTagById(id);

    if (tag.user_id === sub) {
      return this.tagService.deleteTag(id);
    } else {
      throw new Error("You don't have permission to delete people's tag");
    }
  }
}
