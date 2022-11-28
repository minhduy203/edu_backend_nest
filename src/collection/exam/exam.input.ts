import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateExamInput {
  @Field()
  name: string;

  @Field((_type) => [ID])
  questions: string[];

  @Field((_type) => [ID], { nullable: true })
  tags: string[];

  @Field((_type) => ID)
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
}

@InputType()
export class UpdateExamInput {
  @Field({ nullable: true })
  name: string;

  @Field((_type) => [ID], { nullable: true })
  questions: string[];

  @Field((_type) => [ID])
  tags: string[];

  @Field((_type) => ID, { nullable: true })
  classRoom: string;

  @Field({ nullable: true })
  dateFrom: Date;

  @Field({ nullable: true })
  dateEnd: Date;

  @Field({ nullable: true })
  minutes: number;

  @Field({ nullable: true })
  scoreFactor: number;

  @Field({ nullable: true })
  isAllowReview: boolean;
}
