import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ClassService } from '../class/class.service';
import { UserService } from '../user/user.service';
import { Group } from './group.entity';
import { CreateGroupInput, UpdateGroupInput } from './group.input';
import { GroupService } from './group.service';
import { GroupType } from './group.type';

@Resolver((_type) => GroupType)
export class GroupResolver {
  constructor(
    private groupService: GroupService,
    private classService: ClassService,
    private userService: UserService,
  ) {}

  @Query((_returns) => [GroupType])
  getAllGroup() {
    return this.groupService.getAllGroup();
  }

  @Query((_returns) => GroupType)
  getGroupById(@Args('id') id: string) {
    return this.groupService.getGroupById(id);
  }

  @Query((_returns) => [GroupType])
  getGroupOfClass(@Args('classId') classId: string) {
    return this.groupService.getGroupOfClass(classId);
  }

  @Mutation((_returns) => GroupType)
  createGroup(@Args('createGroupInput') createGroupInput: CreateGroupInput) {
    return this.groupService.createGroup(createGroupInput);
  }

  @Mutation((_returns) => [GroupType])
  createAutoGroup(
    @Args('classId') classId: string,
    @Args('groupAmount') groupAmount: number,
  ) {
    return this.groupService.createAutoGroup(classId, groupAmount);
  }

  @Mutation((_returns) => GroupType)
  updateGroup(
    @Args('updateGroupInput') updateGroupInput: UpdateGroupInput,
    @Args('id') id: string,
  ) {
    return this.groupService.updateGroup(updateGroupInput, id);
  }

  @Mutation((_returns) => Boolean)
  deleteGroup(@Args('id') id: string) {
    return this.groupService.deleteGroup(id);
  }

  @ResolveField()
  async class(@Parent() group: Group) {
    return this.classService.getClassById(group.class);
  }

  @ResolveField()
  async students(@Parent() group: Group) {
    return this.userService.getManyUsers(group.students);
  }
}
