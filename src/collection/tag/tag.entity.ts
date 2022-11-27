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
export class Tag {
  @ObjectIdColumn()
  _id: ObjectID;

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  user_id: string;

  @Column()
  color: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
