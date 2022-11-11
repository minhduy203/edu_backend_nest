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

  @Field((_type) => Role, { nullable: true })
  role: Role;

  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field((_type) => [ClassType], { nullable: true })
  classes: string[];

  @Field({ nullable: true })
  address: string;

  @Field({ nullable: true })
  phoneNumber: string;

  @Field({ nullable: true })
  token_hash: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
