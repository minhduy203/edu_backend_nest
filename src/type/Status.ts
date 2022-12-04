import { registerEnumType } from '@nestjs/graphql';

export enum Status {
  DONT_DO = 'DONT_DO',
  DOING = 'DOING',
  DONE = 'DONE',
}

registerEnumType(Status, {
  name: 'Status',
});
