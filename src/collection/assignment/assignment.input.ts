import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAssignmentInput {
  @Field((_type) => ID)
  student: string;

  @Field()
  examClass: string;
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
