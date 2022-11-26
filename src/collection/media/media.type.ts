import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Media')
export class MediaType {
  @Field((_type) => ID)
  _id: string;

  @Field()
  id: string;

  @Field()
  fileName: string;

  @Field()
  mimeType: string;

  @Field()
  enCoding: string;

  @Field()
  key: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
