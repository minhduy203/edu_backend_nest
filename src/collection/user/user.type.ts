import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Role } from '../../type/Role';

@ObjectType('User')
export class UserType {
  @Field((_type) => ID)
  _id: string;

  @Field()
  id: string;

  @Field()
  email: string;

  password: string;

  @Field((_type) => Role)
  role: Role;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
