import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ScheduleType } from '../schedule/schedule.type';

@ObjectType('Attendance')
export class AttendanceType {
  @Field((_type) => ID)
  _id: string;

  @Field()
  id: string;

  @Field()
  user_id: string;

  @Field((_type) => ScheduleType, { nullable: true })
  schedule: ScheduleType;

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
