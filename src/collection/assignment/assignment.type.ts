import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ExamType } from '../exam/exam.type';
import { UserType } from '../user/user.type';

@ObjectType()
export class AssignmentType {
  @Field((_type) => ID)
  _id: string;

  @Field()
  id: string;

  @Field((_type) => ExamType)
  exam: string;

  @Field((_type) => UserType)
  user: string;

  @Field()
  startTime: Date;

  @Field((_type) => [AnswerSubmitType])
  answerSubmit: AnswerSubmitType[];

  @Field()
  score: number;

  @Field()
  minuteDoing: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@ObjectType()
export class AnswerSubmitType {
  @Field()
  questionId: string;

  @Field((_type) => String)
  answer: string[];
}
