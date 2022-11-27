import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTagInput {
  @Field()
  color: string;

  @Field()
  name: string;
}
