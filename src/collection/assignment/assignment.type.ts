import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Status } from '../../type';
import { ExamClassType } from '../exam-class/exam-class.type';
import { UserType } from '../user/user.type';

@ObjectType()
export class AssignmentType {
  @Field((_type) => ID)
  _id: string;

  @Field()
  id: string;

  @Field((_type) => ExamClassType)
  examClass: string;

  @Field((_type) => UserType)
  student: string;

  @Field()
  startTime: Date;

  @Field((_type) => [AnswerSubmitType], { nullable: true })
  answerSubmit: AnswerSubmitType[];

  @Field({ nullable: true })
  score: number;

  @Field({ nullable: true })
  minuteDoing: number;

  @Field((_type) => Status, { nullable: true })
  status: Status;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@ObjectType()
export class AnswerSubmitType {
  @Field()
  questionId: string;

  @Field((_type) => [String])
  answer: string[];
}
