import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAttandanceInput {
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
export class UpdateAttandanceInput {
  @Field()
  content: string;

  @Field()
  is_learn_date: boolean;
}
