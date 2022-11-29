import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserType } from '../user/user.type';

@ObjectType()
export class QuestionType {
  @Field((_type) => ID)
  _id: string;

  @Field()
  id: string;

  @Field((_type) => UserType)
  owner: string;

  @Field()
  question: string;

  @Field((_type) => [String])
  answers: string[];

  @Field()
  isMutiple: boolean;

  @Field((_type) => [AnswerType])
  correctAnswer: AnswerType[];

  @Field({ nullable: true })
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@ObjectType()
export class AnswerType {
  @Field()
  text: string;

  @Field()
  result: boolean;
}
