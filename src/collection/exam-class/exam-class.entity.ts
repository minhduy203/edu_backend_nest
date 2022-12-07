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
export class ExamClass {
  @ObjectIdColumn()
  _id: ObjectID;

  @PrimaryColumn()
  id: string;

  @Column()
  owner: string;

  @Column()
  exam: string;

  @Column()
  classRoom: string;

  @Column()
  dateFrom: Date;

  @Column()
  dateEnd: Date;

  @Column()
  minutes: number;

  @Column()
  scoreFactor: number;

  @Column()
  isAllowReview: boolean;

  @Column()
  assignmentDone: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
