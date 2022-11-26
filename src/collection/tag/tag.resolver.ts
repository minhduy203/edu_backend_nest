import { Query } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GetCurrentUser } from 'src/common/decorators';
import { UserService } from '../user/user.service';
import { CreateMyTagInput } from './tag.input';
import { TagService } from './tag.service';
import { TagType } from './tag.type.';

@Resolver((_of) => TagType)
export class TagResolver {
  constructor(
    private tagService: TagService,
    private userService: UserService,
  ) {}

  @Mutation((_returns) => TagType)
  createMyTag(
    @Args('createMyTagInput') createMyTagInput: CreateMyTagInput,
    @GetCurrentUser() user,
  ) {
    const { sub } = user;

    return this.tagService.createMyTag(createMyTagInput, sub);
  }

  @Mutation((_returns) => Boolean)
  async deleteTag(
    @Args('deleteMyTagInput') id: string,
    @GetCurrentUser() user,
  ) {
    const { sub } = user;
    const userInfo = await this.tagService.getTagById(id);

    if (userInfo.user_id === sub) {
      return this.tagService.deleteTag(id);
    } else {
      throw new Error("You don't have permission to delete people's tag");
    }
  }
}
