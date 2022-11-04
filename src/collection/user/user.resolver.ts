import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UpdateUserInput } from '../../type/UpdateUserInput';
import { CreateUserInput } from '../../type/CreateUserInput';
import { UserService } from './user.service';
import { UserType } from './user.type';

@Resolver((_of) => UserType)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query((_returns) => [UserType])
  getAllUsers() {
    return this.userService.getAllUsers();
  }
  @Query((_returns) => UserType)
  getUserById(@Args('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Mutation((_returns) => UserType)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.createUser(createUserInput);
  }

  @Mutation((_returns) => UserType)
  updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @Args('id') id: string,
  ) {
    return this.userService.updateUser(updateUserInput, id);
  }

  @Mutation((_returns) => Boolean)
  deleteUser(@Args('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
