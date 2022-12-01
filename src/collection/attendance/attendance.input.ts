import { Field, InputType } from '@nestjs/graphql';

// @InputType()
// export class CreateAttendanceInput {
//   @Field()
//   content: string;

//   @Field()
//   learn_date: Date;

//   @Field()
//   class_id: string;

//   @Field()
//   is_learn_date: boolean;
// }

@InputType()
export class CreateAttendanceInput {
  @Field({ nullable: true })
  note: string;

  @Field()
  is_present: boolean;

  @Field()
  user_id: string;
}

// @InputType()
// export class CreateAndUpdateAttendanceInput {
//   @Field()
//   content: string;

//   @Field()
//   is_learn_date: boolean;

//   @Field({ nullable: true })
//   id: string;

//   @Field()
//   learn_date: string;
// }

@InputType()
export class AttendanceClassInput {
  // @Field((_type) => [AnswerInput], { nullable: true })
  @Field((_type) => [CreateAttendanceInput], { nullable: true })
  Attendance: CreateAttendanceInput[];
}
