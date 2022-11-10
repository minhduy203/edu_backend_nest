import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Class } from './class.entity';
import { CreateClassInput, UpdateClassInput } from './class.input';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Class) private classRepository: Repository<Class>,
  ) {}
  async getAllClasses(): Promise<Class[]> {
    return this.classRepository.find();
  }

  async getClassById(id: string): Promise<Class> {
    return this.classRepository.findOneBy({ id });
  }

  async createClass(createClassInput: CreateClassInput): Promise<Class> {
    const { name, studentAmount, scoreFactor } = createClassInput;
    const classRoom = this.classRepository.create({
      id: uuid(),
      name,
      studentAmount,
      scoreFactor,
      code: uuid(),
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
}
