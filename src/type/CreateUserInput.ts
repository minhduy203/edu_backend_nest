import { Field, InputType } from '@nestjs/graphql';
import { Role } from '../type/Role';

@InputType()
export class CreateUserInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  role: Role;

  @Field()
  firstName: string;

  @Field()
  lastName: string;
}
