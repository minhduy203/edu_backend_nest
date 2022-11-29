import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateQuestionInput {
  @Field()
  question: string;

  @Field()
  isMultiple: boolean;

  @Field((_type) => [AnswerInput])
  correctAnswer: AnswerInput[];
}

@InputType()
export class UpdateQuestionInput {
  @Field({ nullable: true })
  question: string;

  @Field({ nullable: true })
  isMultiple: boolean;

  @Field((_type) => [AnswerInput], { nullable: true })
  correctAnswer: AnswerInput[];
}

@InputType()
export class AnswerInput {
  @Field()
  text: string;

  @Field()
  result: boolean;
}
