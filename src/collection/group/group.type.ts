import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ClassType } from '../class/class.type';
import { UserType } from '../user/user.type';

@ObjectType()
export class GroupType {
  @Field((_type) => ID)
  _id: string;

  @Field()
  id: string;

  @Field((_type) => ClassType)
  class: string;

  @Field((_type) => [UserType])
  students: string[];

  @Field({ nullable: true })
  name: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
