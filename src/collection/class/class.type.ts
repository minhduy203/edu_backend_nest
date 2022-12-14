import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserType } from '../user/user.type';

@ObjectType('Class')
export class ClassType {
  @Field((_type) => ID)
  _id: string;

  @Field()
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  avatar: string;

  @Field((_type) => UserType)
  owner: string;

  @Field()
  studentAmount: number;

  @Field()
  scoreFactor: number;

  @Field((_type) => [UserType], { nullable: true })
  teachers: string[];

  @Field((_type) => [UserType], { nullable: true })
  students: string[];

  @Field()
  code: string;

  @Field()
  from_date: Date;

  @Field()
  end_date: Date;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
