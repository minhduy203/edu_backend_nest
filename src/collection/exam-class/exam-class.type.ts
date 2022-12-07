import { Field, ID, ObjectType } from '@nestjs/graphql';
import { QuestionType } from '../question/question.type';
import { ClassType } from '../class/class.type';
import { TagType } from '../tag/tag.type.';
import { ExamType } from '../exam/exam.type';
import { UserType } from '../user/user.type';
import { AssignmentType } from '../assignment/assignment.type';

@ObjectType()
export class ExamClassType {
  @Field((_type) => ID)
  _id: string;

  @Field()
  id: string;

  @Field((_type) => UserType)
  owner: string;

  @Field((_type) => ExamType)
  exam: string;

  @Field((_type) => ClassType)
  classRoom: string;

  @Field()
  dateFrom: Date;

  @Field()
  dateEnd: Date;

  @Field()
  minutes: number;

  @Field()
  scoreFactor: number;

  @Field()
  isAllowReview: boolean;

  @Field((_type) => [AssignmentType], { nullable: true })
  assignmentDone: string[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
