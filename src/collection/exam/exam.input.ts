import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateExamInput {
  @Field()
  name: string;

  @Field((_type) => [ID])
  questions: string[];

  @Field((_type) => [ID], { nullable: true })
  tags: string[];
}

@InputType()
export class UpdateExamInput {
  @Field({ nullable: true })
  name: string;

  @Field((_type) => [ID], { nullable: true })
  questions: string[];

  @Field((_type) => [ID])
  tags: string[];
}
