import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateExamClassInput {
  @Field((_type) => ID)
  exam: string;

  @Field((_type) => ID)
  classRoom: string;

  @Field()
  dateFrom: Date;

  @Field()
  dateEnd: Date;

  @Field()
  minutes: number;

  @Field()
  isAllowReview: boolean;
}

@InputType()
export class UpdateExamClassInput {
  @Field((_type) => ID, { nullable: true })
  exam: string;

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
