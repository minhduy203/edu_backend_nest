import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateGroupInput {
  @Field((_type) => ID)
  classRoom: string;

  @Field((_type) => [ID])
  students: string[];

  @Field()
  name: string;
}

@InputType()
export class UpdateGroupInput {
  @Field((_type) => ID, { nullable: true })
  classRoom: string;

  @Field((_type) => [ID], { nullable: true })
  students: string[];

  @Field({ nullable: true })
  name: string;
}
