import { Field, ID, ObjectType } from '@nestjs/graphql';
import { QuestionType } from '../question/question.type';
import { ClassType } from '../class/class.type';
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

  @Field((_type) => [TagType], { nullable: true })
  tags: string[];

  @Field((_type) => ClassType)
  classRoom: string;

  @Field()
  dateFrom: Date;

  @Field()
  dateEnd: Date;

  @Field()
  minutes: number;

  @Field()
  questionAmount: number;

  @Field()
  scoreFactor: number;

  @Field()
  isAllowReview: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
