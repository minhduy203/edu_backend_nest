import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Role } from '../../type/Role';
import { ClassType } from '../class/class.type';

@ObjectType('User')
export class UserType {
  @Field((_type) => ID)
  _id: string;

  @Field()
  id: string;

  @Field()
  email: string;

  password: string;

  @Field((_type) => Role)
  role: Role;

  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field((_type) => ClassType, { nullable: true })
  classes: [ClassType];

  @Field({ nullable: true })
  address: string;

  @Field({ nullable: true })
  phoneNumber: string;

  @Field({ defaultValue: 0 })
  token_version: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
