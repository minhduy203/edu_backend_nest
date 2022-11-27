import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Tag')
export class TagType {
  @Field((_type) => ID)
  _id: string;

  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  color: string;

  @Field()
  user_id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
