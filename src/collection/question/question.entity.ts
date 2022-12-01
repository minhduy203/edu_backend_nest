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
export class Question {
  @ObjectIdColumn()
  _id: ObjectID;

  @PrimaryColumn()
  id: string;

  @Column()
  owner: string;

  @Column()
  question: string;

  @Column()
  answers: string[];

  @Column()
  isMultiple: boolean;

  @Column()
  tags: string[];

  @Column((_type) => Answer)
  correctAnswer: Answer[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export class Answer {
  @Column()
  text: string;

  @Column()
  result: boolean;
}
