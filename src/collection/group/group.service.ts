import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Class } from '../class/class.entity';
import { Group } from './group.entity';
import { CreateGroupInput, UpdateGroupInput } from './group.input';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    @InjectRepository(Class)
    private classRepository: Repository<Class>,
  ) {}

  async getAllGroup(): Promise<Group[]> {
    return this.groupRepository.find();
  }

  async getGroupById(id: string): Promise<Group> {
    return this.groupRepository.findOneBy({ id });
  }

  async createGroup(createGroupInput: CreateGroupInput): Promise<Group> {
    const { name, classRoom, students } = createGroupInput;
    const data = {
      id: uuid(),
      name: name || null,
      class: classRoom,
      students,
    };
    const result = this.groupRepository.create(data);
    await this.groupRepository.save(data);
    return result;
  }

  async updateGroup(
    updateGroupInput: UpdateGroupInput,
    id: string,
  ): Promise<Group> {
    const { name, classRoom, students } = updateGroupInput;
    const data = await this.groupRepository.findOneBy({ id });

    data.name = name || data.name;
    data.class = classRoom || data.class;
    data.students = students || data.students;

    return this.groupRepository.save(data);
  }

  async deleteGroup(id: string): Promise<boolean> {
    const existingGroup = await this.groupRepository.findOneBy({ id });
    if (!existingGroup) {
      return false;
    }
    await this.groupRepository.delete({ id });

    return true;
  }

  async getGroupOfClass(classId: string): Promise<Group[]> {
    const groups = await this.groupRepository.find({
      where: { class: classId },
    });

    return groups;
  }

  async createAutoGroup(
    classId: string,
    groupAmount: number,
  ): Promise<Group[]> {
    const classRoom = await this.classRepository.findOneBy({ id: classId });
    const studentsId = classRoom.students;
    let resultArr = [];
    for (let i = 0; i < groupAmount; i++) {
      resultArr[i] = [];
    }

    for (let i = 0; i < studentsId.length; i += groupAmount) {
      for (let j = 0; j < groupAmount; j++) {
        if (!studentsId[j + i]) break;
        resultArr[j].push(studentsId[j + i]);
      }
    }

    for (const item of resultArr) {
      const data = {
        id: uuid(),
        class: classId,
        students: item,
        name: null,
      };
      const dataCreated = this.groupRepository.create(data);
      await this.groupRepository.save(dataCreated);
    }
    const result = await this.groupRepository.find({
      where: { class: classId },
    });

    return result;
  }
}
