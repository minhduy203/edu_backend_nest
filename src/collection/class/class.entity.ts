import {
  Entity,
  Column,
  CreateDateColumn,
  ObjectID,
  ObjectIdColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Class {
  @ObjectIdColumn()
  _id: ObjectID;

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  banner: string;

  @Column()
  owner: string;

  @Column()
  studentAmount: number;

  @Column()
  scoreFactor: number;

  @Column({ default: [] })
  teachers: string[];

  @Column({ default: [] })
  students: string[];

  @Column()
  code: string;

  @Column()
  end_date: Date;

  @Column()
  from_date: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
