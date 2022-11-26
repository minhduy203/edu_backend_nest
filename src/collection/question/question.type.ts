import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class QuestionType {
  @Field((_type) => ID)
  _id: string;

  @Field()
  id: string;

  @Field()
  question: string;

  @Field()
  answers: string[];

  @Field()
  isMutiple: boolean;

  @Field((_type) => AnswerType)
  correctAnswer: AnswerType[];
}

@ObjectType()
export class AnswerType {
  @Field()
  text: string;

  @Field()
  result: boolean;
}
