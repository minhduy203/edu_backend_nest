import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Token')
export class TokenType {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}
