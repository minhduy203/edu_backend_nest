import { UserType } from '../collection/user/user.type';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserMutationResponse {
  @Field((_type) => UserType, { nullable: true })
  user?: UserType;

  @Field({ nullable: true })
  accessToken?: string;

  @Field({ nullable: true })
  messageError?: string;
}
