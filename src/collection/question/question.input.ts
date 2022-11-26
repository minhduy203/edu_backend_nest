import { Field, ID, InputType } from '@nestjs/graphql';
import { Answer } from './question.entity';
import { AnswerType } from './question.type';

@InputType()
export class CreateQuestionInput {
  @Field()
  question: string;

  @Field(_type=>[String])
  answers: string[];

  @Field()
  isMutiple: boolean;

//   @Field((_type) => [AnswerType])
//   correctAnswer: AnswerType[];
}

@InputType()
export class UpdateQuestionInput {
  @Field()
  question: string;

  @Field(_type=>[String])
  answers: string[];

  @Field()
  isMutiple: boolean;

//   @Field((_type) => [AnswerType])
//   correctAnswer: AnswerType[];
}
