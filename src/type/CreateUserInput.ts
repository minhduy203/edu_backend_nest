import { Field, InputType } from '@nestjs/graphql';
import { Role } from '../type/Role';

@InputType()
export class CreateUserInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field((_type) => Role)
  role: Role;

  @Field({nullable: true})
  firstName?: string;

  @Field({nullable: true})
  lastName?: string;

  @Field({nullable: true})
  address?: string;

  @Field({nullable: true})
  phoneNumber?: string;
}
