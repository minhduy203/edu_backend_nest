import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateScheduleInput {
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
export class UpdateScheduleInput {
  @Field()
  content: string;

  @Field()
  is_learn_date: boolean;

  @Field()
  id: string;
}

@InputType()
export class CreateAndUpdateScheduleInput {
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
export class UpdateSchedulesInput {
  // @Field((_type) => [AnswerInput], { nullable: true })
  @Field((_type) => [CreateAndUpdateScheduleInput], { nullable: true })
  Schedules: CreateAndUpdateScheduleInput[];
}
