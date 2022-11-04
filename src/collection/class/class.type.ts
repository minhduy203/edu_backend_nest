import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Class')
export class ClassType {
  @Field((_type) => ID)
  _id: string;

  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
