import { Field, InputType } from '@nestjs/graphql';
import { ScoreType } from 'src/type/ScoreType';

@InputType()
export class CreateColumnScoreInput {
  @Field()
  name: string;

  @Field()
  multiplier: number;

  @Field((_type) => ScoreType)
  type: ScoreType;

  @Field()
  class_id: string;

  @Field({ nullable: true })
  examOfClass_id: string;

  @Field({ nullable: true })
  note: string;
}

@InputType()
export class UpdateColumnScoreInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  note?: string;

  @Field()
  multiplier: number;

  @Field((_type) => ScoreType)
  type: ScoreType;
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

// @InputType()
// export class UpdateAttendancesInput {
//   // @Field((_type) => [AnswerInput], { nullable: true })
//   @Field((_type) => [CreateAndUpdateAttendanceInput], { nullable: true })
//   attendances: CreateAndUpdateAttendanceInput[];
// }
