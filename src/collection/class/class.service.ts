import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassSortType, ClassStatus } from '../../type';
import {
  FindManyOptions,
  FindOperator,
  LessThan,
  Like,
  MoreThan,
  Repository,
} from 'typeorm';
import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import { User } from '../user/user.entity';
import { Class } from './class.entity';
import {
  CreateClassInput,
  CreateMyClassInput,
  FilterClassType,
  UpdateClassInput,
  UpdateMyClassInput,
} from './class.input';

export type TypeFilter = 'STUDENT' | 'TEACHER';
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

  async getClassesByIdTeacher(
    filterClassType: FilterClassType,
    idTeacher: string,
  ): Promise<Class[]> {
    const classRoom = await this.filterClass(
      filterClassType,
      'TEACHER',
      idTeacher,
    );

    return classRoom;
  }

  async getClassOfStudent(
    filterClassType: FilterClassType,
    idStudent: string,
  ): Promise<Class[]> {
    const classRoom = await this.filterClass(
      filterClassType,
      'STUDENT',
      idStudent,
    );

    return classRoom;
  }

  async createClass(
    createClassInput: CreateClassInput,
    owner: string,
  ): Promise<Class> {
    const { name, studentAmount, scoreFactor, students, teachers } =
      createClassInput;
    const classRoom = this.classRepository.create({
      id: uuid(),
      name,
      owner,
      studentAmount,
      scoreFactor,
      code: uuid(),
      students: students || null,
      teachers: teachers || null,
    });

    await this.classRepository.save(classRoom);
    return classRoom;
  }

  async createMyClass(
    owner: string,
    createClassInput: CreateMyClassInput,
  ): Promise<Class> {
    const {
      name,
      scoreFactor,
      avatar,
      end_date,
      from_date,
      students,
      teachers,
    } = createClassInput;
    const classRoom = this.classRepository.create({
      id: uuid(),
      name,
      owner,
      avatar,
      end_date,
      from_date,
      scoreFactor,
      students: students || null,
      teachers: teachers || null,
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

  async updateMyClass(
    updateMyClassInput: UpdateMyClassInput,
    classId: string,
    userId: string,
  ): Promise<Class> {
    const { name, scoreFactor, end_date, from_date } = updateMyClassInput;
    const classRoom = await this.classRepository.findOneBy({ id: classId });

    if (classRoom.owner === userId) {
      name && (classRoom.name = name);
      scoreFactor && (classRoom.scoreFactor = scoreFactor);
      end_date && (classRoom.end_date = end_date);
      from_date && (classRoom.from_date = from_date);
    } else {
      throw new Error("You don't have permission");
    }

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

  async deleteMyClass(id: string): Promise<boolean> {
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
    if (classRoom.students == null) {
      classRoom.students = [];
    }

    for (const student of studentIds) {
      if (this.checkExistUser(student, classRoom.students)) {
        throw new Error(`Class had student ${student}`);
      }
      console.log('classRoom', classRoom.students);
      classRoom.students.push(student);
    }

   

    for (const userId of studentIds) {
      const user = await this.userRepository.findOneBy({ id: userId });

      if (user.classes == null) {
        user.classes = [];
      }

      user.classes.push(classId);
      this.userRepository.save(user);
    }

    return this.classRepository.save(classRoom);
  }

  async assignTeachersToClass(
    classId: string,
    teachersIds: string[],
  ): Promise<Class> {
    const classRoom = await this.classRepository.findOneBy({ id: classId });
    if (classRoom.teachers == null) {
      classRoom.teachers = [];
    }

    for (const teacher of teachersIds) {
      if (this.checkExistUser(teacher, classRoom.teachers)) {
        throw new Error(`Class had teacher ${teacher}`);
      }
      classRoom.teachers.push(teacher);
    }

    for (const userId of teachersIds) {
      const user = await this.userRepository.findOneBy({ id: userId });
      user.classes.push(classId);
      this.userRepository.save(user);
    }

    return this.classRepository.save(classRoom);
  }

  checkExistUser<T>(id: T, ids: T[]) {
    if (ids.includes(id)) return true;
    return false;
  }

  async filterClass(
    filterClass: FilterClassType,
    type: TypeFilter,
    idUser: string,
  ) {
    const { name, sortType, status } = filterClass;
    const renderName = () => {
      if (name) {
        return new RegExp(`${name}`);
      }
      return new RegExp(``);
    };
    const renderSort = () => {
      if (sortType) {
        if (sortType === ClassSortType.FROM_DATE) {
          return {
            from_date: 'ASC',
          };
        } else if (sortType === ClassSortType.END_DATE) {
          return {
            end_date: 'ASC',
          };
        }
      } else {
        return {
          from_date: 'ASC',
        };
      }
    };
    const renderStatus = () => {
      const now = new Date();
      if (status) {
        if (status === ClassStatus.AVAILABLE) {
          return {
            $gte: now,
          };
        } else if (status === ClassStatus.END) {
          return {
            $lte: now,
          };
        }
      } else {
        return {
          $gte: now,
        };
      }
    };

    if (type === 'TEACHER') {
      const classRoom = await this.classRepository.find({
        where: {
          owner: idUser,
          name: renderName() as any,
          end_date: renderStatus() as any,
        },
        order: renderSort() as any,
      });

      return classRoom;
    }

    if (type === 'STUDENT') {
      const user = await this.userRepository.findOneBy({
        id: idUser,
      });
      const classRoom = await this.classRepository.find({
        where: {
          id: {
            $in: user.classes,
          } as any,
          name: renderName() as any,
          end_date: renderStatus() as any,
        },
        order: renderSort() as any,
      });

      return classRoom;
    }
  }
}
