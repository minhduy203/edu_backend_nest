import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateMyTagInput {
  @Field()
  color: string;

  @Field()
  name: string;
}
