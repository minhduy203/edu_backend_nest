import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Attendance')
export class AttendanceType {
  @Field((_type) => ID)
  _id: string;

  @Field()
  id: string;

  @Field()
  content: string;

  @Field()
  learn_date: string;

  @Field()
  class_id: string;

  @Field()
  is_learn_date: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
