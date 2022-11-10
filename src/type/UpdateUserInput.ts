import { Field, InputType } from '@nestjs/graphql';
import { Role } from '../type/Role';

@InputType()
export class UpdateUserInput {
  @Field({nullable: true})
  email?: string;

  @Field({nullable: true})
  role?: Role;

  @Field({nullable: true})
  firstName?: string;

  @Field({nullable: true})
  lastName?: string;

  @Field({nullable: true})
  address?: string;

  @Field({nullable: true})
  phoneNumber?: string;
}
