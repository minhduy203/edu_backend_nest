import { Field, InputType } from '@nestjs/graphql';
import { Role } from 'src/type';

@InputType()
export class RegisterInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  username: string;

  @Field()
  role: Role;
}

@InputType()
export class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
