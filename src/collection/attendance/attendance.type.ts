import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Attendance')
export class AttendanceType {
  @Field((_type) => ID)
  _id: string;

  @Field()
  id: string;

  @Field()
  user_id: string;

  @Field()
  schedule_id: string;

  @Field()
  note: string;

  @Field()
  is_present: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
