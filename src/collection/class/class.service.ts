import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from '../user/user.entity';
import { Class } from './class.entity';
import { CreateClassInput, UpdateClassInput } from './class.input';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Class) private classRepository: Repository<Class>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async getAllClasses(): Promise<Class[]> {
    return this.classRepository.find();
  }

  async getClassById(id: string): Promise<Class> {
    return this.classRepository.findOneBy({ id });
  }

  async createClass(createClassInput: CreateClassInput, owner: string): Promise<Class> {
    const { name, studentAmount, scoreFactor, students, teachers } =
      createClassInput;
    const classRoom = this.classRepository.create({
      id: uuid(),
      name,
      owner,
      studentAmount,
      scoreFactor,
      code: uuid(),
      students,
      teachers,
    });

    await this.classRepository.save(classRoom);
    return classRoom;
  }

  async updateClass(
    updateClassInput: UpdateClassInput,
    id: string,
  ): Promise<Class> {
    const { name, scoreFactor, studentAmount } = updateClassInput;
    const classRoom = await this.classRepository.findOneBy({ id });

    classRoom.name = name;
    classRoom.scoreFactor = scoreFactor;
    classRoom.studentAmount = studentAmount;

    return this.classRepository.save(classRoom);
  }

  async deleteClass(id: string): Promise<boolean> {
    const existingClass = await this.classRepository.findOneBy({ id });
    if (!existingClass) {
      return false;
    }
    await this.classRepository.delete({ id });

    return true;
  }

  async assignStudentsToClass(
    classId: string,
    studentIds: string[],
  ): Promise<Class> {
    const classRoom = await this.classRepository.findOneBy({ id: classId });

    classRoom.students = [...classRoom.students, ...studentIds];

    for (const userId of studentIds) {
      const user = await this.userRepository.findOneBy({ id: userId });
      user.classes.push(classId);
      this.userRepository.save(user);
    }

    // const userList = await this.userRepository.find({
    //   where: {
    //     id: {
    //       $in: studentIds,
    //     } as any,
    //   },
    // });

    // for (const user of userList) {
    //   user.classes=[...user.classes, classId];
    //   this.userRepository.save(user);
    // }

    return this.classRepository.save(classRoom);
  }

  async assignTeachersToClass(
    classId: string,
    teachersIds: string[],
  ): Promise<Class> {
    const classRoom = await this.classRepository.findOneBy({ id: classId });

    classRoom.teachers = [...classRoom.teachers, ...teachersIds];
    return this.classRepository.save(classRoom);
  }
}
