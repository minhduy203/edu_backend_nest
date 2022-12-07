import { registerEnumType } from '@nestjs/graphql';

export enum Status {
  DONT_DO = 'DONT_DO',
  DOING = 'DOING',
  DONE = 'DONE',
}

registerEnumType(Status, {
  name: 'Status',
});

export enum ClassStatus {
  AVAILABLE = 'AVAILABLE',
  END = 'END',
}

registerEnumType(ClassStatus, {
  name: 'ClassStatus',
});

export enum ClassSortType {
  FROM_DATE = 'FROM_DATE',
  END_DATE = 'END_DATE',
}

registerEnumType(ClassSortType, {
  name: 'ClassSortType',
});
