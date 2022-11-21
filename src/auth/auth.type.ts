import { UserType } from './../collection/user/user.type';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Token')
export class TokenType {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}

@ObjectType('TokenAndUser')
export class TokenAndUser {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;

  @Field()
  user: UserType;
}
