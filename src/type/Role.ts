import { registerEnumType } from '@nestjs/graphql';

export enum Role {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
}

registerEnumType(Role, {
  name: 'Role',
});
