import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAssignmentInput {
  @Field()
  examClass: string;

  @Field()
  startTime: Date;

  @Field((_type) => [AnswerSubmitInput], { nullable: true })
  answerSubmit: AnswerSubmitInput[];

  @Field({ nullable: true })
  minuteDoing: number;
}

@InputType()
export class UpdateAssignmentInput {
  @Field({ nullable: true })
  examClass: string;

  @Field({ nullable: true })
  startTime: Date;

  @Field((_type) => [AnswerSubmitInput], { nullable: true })
  answerSubmit: AnswerSubmitInput[];

  @Field({ nullable: true })
  minuteDoing: number;
}

@InputType()
export class AnswerSubmitInput {
  @Field()
  questionId: string;

  @Field((_type) => [String])
  answer: string[];
}
