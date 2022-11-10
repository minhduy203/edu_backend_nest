import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateClassInput {
  @Field()
  name: string;

  @Field()
  studentAmount: number;

  @Field()
  scoreFactor: number;
}

@InputType()
export class UpdateClassInput {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  studentAmount: number;

  @Field({ nullable: true })
  scoreFactor: number;
}
