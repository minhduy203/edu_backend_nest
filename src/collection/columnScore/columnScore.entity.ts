import { ScoreType } from 'src/type/ScoreType';
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
export class ColumnScore {
  @ObjectIdColumn()
  _id: ObjectID;

  @PrimaryColumn()
  id: string;

  @Column()
  class_id: string;

  @Column()
  examOfClass_id: string;

  @Column()
  scores: object;

  @Column()
  name: string;

  @Column()
  note: string;

  @Column({
    type: 'enum',
    enum: ScoreType,
    default: ScoreType.NORMAL,
  })
  type: ScoreType;

  @Column()
  learn_date?: Date;

  @Column()
  multiplier: number;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
