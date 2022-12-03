import { Field, ID, ObjectType } from '@nestjs/graphql';
import { QuestionType } from '../question/question.type';
import { TagType } from '../tag/tag.type.';

@ObjectType()
export class ExamType {
  @Field((_type) => ID)
  _id: string;

  @Field()
  id: string;

  @Field()
  name: string;

  @Field((_type) => [QuestionType])
  questions: string[];

  @Field()
  owner_id: string;

  @Field((_type) => [TagType], { nullable: true })
  tags: string[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
