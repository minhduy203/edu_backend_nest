import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from '../type/CreateUserInput';
import { UserService } from './user.service';
import { UserType } from './user.type';

@Resolver((_of) => UserType)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query((_returns) => UserType)
  getAllUsers() {
    return {
      username: 'Admin',
      password: '123',
    };
  }
  @Query((_returns) => UserType)
  getUserById(@Args('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Mutation((_returns) => UserType)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.createUser(createUserInput);
  }
}
