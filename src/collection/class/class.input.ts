import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateClassInput {
  @Field()
  name: string;

  @Field()
  avatar: string;

  @Field()
  studentAmount: number;

  @Field()
  scoreFactor: number;

  @Field((_type) => [ID], { nullable: true })
  students: string[];

  @Field((_type) => [ID], { nullable: true })
  teachers: string[];

  @Field({ nullable: true })
  end_date: Date;

  @Field({ nullable: true })
  from_date: Date;
}

@InputType()
export class UpdateClassInput {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  studentAmount: number;

  @Field({ nullable: true })
  scoreFactor: number;

  @Field({ nullable: true })
  end_date: Date;

  @Field({ nullable: true })
  from_date: Date;
}

@InputType()
export class UpdateMyClassInput {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  scoreFactor: number;

  @Field({ nullable: true })
  from_date: Date;

  @Field({ nullable: true })
  end_date: Date;
}

@InputType()
export class AssignUserToClassInput {
  @Field((_type) => ID)
  classId: string;

  @Field((_type) => [ID])
  usersIds: string[];
}

@InputType()
export class CreateMyClassInput {
  @Field()
  name: string;

  @Field()
  scoreFactor: number;

  @Field()
  from_date: Date;

  @Field()
  end_date: Date;

  @Field()
  avatar: string;

  @Field((_type) => [ID], { nullable: true })
  students: string[];

  @Field((_type) => [ID], { nullable: true })
  teachers: string[];
}
