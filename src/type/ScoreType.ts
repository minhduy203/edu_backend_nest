import { registerEnumType } from '@nestjs/graphql';

export enum ScoreType {
  PLUS = 'PLUS',
  MINUS = 'MINUS',
  NORMAL = 'NORMAL',
}

registerEnumType(ScoreType, {
  name: 'ScoreType',
});
