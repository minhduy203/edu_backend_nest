import {
  Entity,
  Column,
  CreateDateColumn,
  ObjectID,
  ObjectIdColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../../type';

@Entity()
export class User {
  @ObjectIdColumn()
  _id: ObjectID;

  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: '' })
  avatar: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.STUDENT,
  })
  role: Role;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  classes: string[];

  @Column()
  address: string;

  @Column()
  phoneNumber: string;

  @Column({ default: 0 })
  token_version: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
