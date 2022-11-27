import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAttendanceInput {
  @Field()
  content: string;

  @Field()
  learn_date: Date;

  @Field()
  class_id: string;

  @Field()
  is_learn_date: boolean;
}

@InputType()
export class UpdateAttendanceInput {
  @Field()
  content: string;

  @Field()
  is_learn_date: boolean;

  @Field()
  id: string;
}

@InputType()
export class CreateAndUpdateAttendanceInput {
  @Field()
  content: string;

  @Field()
  is_learn_date: boolean;

  @Field({ nullable: true })
  id: string;

  @Field()
  learn_date: string;
}

@InputType()
export class UpdateAttendancesInput {
  // @Field((_type) => [AnswerInput], { nullable: true })
  @Field((_type) => [CreateAndUpdateAttendanceInput], { nullable: true })
  attendances: CreateAndUpdateAttendanceInput[];
}
