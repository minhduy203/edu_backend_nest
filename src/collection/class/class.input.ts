import { Field, ID, InputType } from '@nestjs/graphql';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { FileUpload } from '../../type';

@InputType()
export class CreateClassInput {
  @Field()
  name: string;

  @Field(() => GraphQLUpload)
  avatar: Promise<FileUpload>;

  @Field()
  studentAmount: number;

  @Field()
  scoreFactor: number;

  @Field((_type) => [ID], { defaultValue: [] })
  students: string[];

  @Field((_type) => [ID], { defaultValue: [] })
  teachers: string[];
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

@InputType()
export class AssignUserToClassInput {
  @Field((_type) => ID)
  classId: string;

  @Field((_type) => [ID])
  usersIds: string[];
}
