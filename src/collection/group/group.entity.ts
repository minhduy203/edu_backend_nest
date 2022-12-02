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
  export class Group {
    @ObjectIdColumn()
    _id: ObjectID;
  
    @PrimaryColumn()
    id: string;
  
    @Column()
    class: string;
  
    @Column()
    students: string[];
  
    @Column()
    name: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  