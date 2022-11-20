import {
  Entity,
  Column,
  CreateDateColumn,
  ObjectID,
  ObjectIdColumn,
  PrimaryColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Role } from '../../type';
import { Class } from '../class/class.entity';

@Entity()
export class User {
  @ObjectIdColumn()
  _id: ObjectID;

  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  email: string;

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

  @Column()
  token_hash: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
