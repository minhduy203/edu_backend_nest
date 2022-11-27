import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from '../user/user.entity';
import { Attendance } from './attendance.entity';
import {
  CreateAttendanceInput,
  UpdateAttendanceInput,
  UpdateAttendancesInput,
} from './attendance.input';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private attendanceRepository: Repository<Attendance>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getAttendanceByIdClass(class_id: string) {
    const attendanceOfClasses = await this.attendanceRepository.find({
      where: {
        class_id,
      },
    });

    return attendanceOfClasses;
  }

  async createAttendance(createAttendanceInput: CreateAttendanceInput) {
    const { class_id, content, is_learn_date, learn_date } =
      createAttendanceInput;

    const newAttendance = await this.attendanceRepository.create({
      id: uuid(),
      class_id,
      content,
      is_learn_date,
      learn_date,
    });

    await this.attendanceRepository.save(newAttendance);

    return newAttendance;
  }

  async updateAttendance(updateAttendanceInput: UpdateAttendanceInput) {
    const { content, is_learn_date, id } = updateAttendanceInput;

    const attendance = await this.attendanceRepository.findOneBy({
      id,
    });

    content && (attendance.content = content);
    is_learn_date && (attendance.is_learn_date = is_learn_date);

    await this.attendanceRepository.save(attendance);

    return attendance;
  }

  async updateAttendanceMany(
    updateAttendancesInput: UpdateAttendancesInput,
    class_id: string,
  ) {
    const attendances = await this.attendanceRepository.find({
      where: {
        class_id,
      },
    });

    // Handle mutate attendances
    updateAttendancesInput.attendances.forEach((attendance) => {
      const indexOfAttendance = attendances.findIndex((atdc) => {
        console.log("atdc", atdc, attendance)
        return atdc.id === attendance.id;
      });

      // Chưa có trong database
      if (!indexOfAttendance) {
        // attendances.push({

        // })
      } else {
        // attendances[indexOfAttendance];
        console.log("indexOfAttendance", indexOfAttendance)
      }
    });

    // console.log({
    //   attendances: updateAttendancesInput.attendances,
    //   class_id,
    // });

    attendances[0].content = 'Hello';
    this.attendanceRepository.save(attendances);

    console.log('attendances', attendances);

    return attendances;
  }

  // async getTagById(id): Promise<Attandance> {
  //   const tag = await this.attandanceRepository.findOneBy({ id });

  //   return tag;
  // }

  // async getTabByIdUser(userId): Promise<Attandance[]> {
  //   const tags = await this.attandanceRepository.find({
  //     where: { user_id: userId },
  //   });

  //   return tags;
  // }

  // async createTag(
  //   createUserInput: CreateTagInput,
  //   user_id: string,
  // ): Promise<Tag> {
  //   const { color, name } = createUserInput;

  //   const newTag = this.attandanceRepository.create({
  //     color,
  //     name,
  //     user_id,
  //     id: uuid(),
  //   });

  //   await this.attandanceRepository.save(newTag);
  //   return newTag;
  // }

  // async deleteTag(id): Promise<boolean> {
  //   const tag = this.attandanceRepository.delete({ id });

  //   return true;
  // }
}
