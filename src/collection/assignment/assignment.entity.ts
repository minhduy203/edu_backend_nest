import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Assignment {
  @ObjectIdColumn()
  _id: ObjectID;

  @PrimaryColumn()
  id: string;

  @Column()
  exam: string;

  @Column()
  user: string;

  @Column()
  startTime: Date;

  @Column((_type) => AnswerSubmit)
  answerSubmit: AnswerSubmit[];

  @Column()
  score: number;

  @Column()
  minuteDoing: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export class AnswerSubmit {
  @Column()
  questionId: string;

  @Column()
  answer: string[];
}
