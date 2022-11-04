import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('User')
export class UserType {
  @Field((_type) => ID)
  _id: string;

  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  username: string;

  password: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
