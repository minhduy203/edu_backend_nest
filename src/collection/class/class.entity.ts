import {
  Entity,
  Column,
  CreateDateColumn,
  ObjectID,
  ObjectIdColumn,
  PrimaryColumn,
  UpdateDateColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Class {
  @ObjectIdColumn()
  _id: ObjectID;

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => User)
  owner: User;

  @Column()
  studentAmount: number;

  @Column()
  scoreFactor: number;

  @Column()
  teachers: string[];

  @Column()
  students: string[];

  @Column()
  code: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
