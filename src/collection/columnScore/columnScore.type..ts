import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ScoreType } from 'src/type/ScoreType';
import { GraphQLJSONObject } from 'graphql-type-json';

@ObjectType('ColumnScoreType')
export class ColumnScoreType {
  @Field((_type) => ID)
  _id: string;

  @Field()
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  note: string;

  @Field()
  class_id: string;

  @Field((_type) => ScoreType, { nullable: true })
  type: ScoreType;

  @Field(() => GraphQLJSONObject, { nullable: true })
  scores: object;

  @Field()
  examOfClass_id: string;

  @Field()
  multiplier: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
