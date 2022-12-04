import { Field, InputType } from '@nestjs/graphql';
import { Role } from '../type';

@InputType()
export class RegisterInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  username: string;

  @Field((_type) => Role)
  role: Role;
}

@InputType()
export class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
