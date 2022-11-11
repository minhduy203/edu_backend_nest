import { Field, ID, InputType } from '@nestjs/graphql';
import { Role } from '../../type/Role';

@InputType()
export class CreateUserInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field((_type) => Role)
  role: Role;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  phoneNumber?: string;

  @Field((_type) => [ID], { defaultValue: [] })
  classes: string[];
}

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  role?: Role;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  phoneNumber?: string;
}
