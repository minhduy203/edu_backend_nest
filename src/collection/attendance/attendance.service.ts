import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Schedule } from '../schedule/schedule.entity';
import { User } from '../user/user.entity';
import { Attendance } from './attendance.entity';
import { AttendanceClassInput } from './attendance.input';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private AttendanceRepository: Repository<Attendance>,
    @InjectRepository(Schedule)
    private ScheduleRepository: Repository<Schedule>,
    @InjectRepository(User) private userRepository: Repository<User>,

    @InjectRepository(Attendance)
    private attendanceMongoRepo: MongoRepository<Attendance>,
  ) {}

  async attendanceClass(
    attendancesInput: AttendanceClassInput,
    schedule_id: string,
  ) {
    // Handle mutate Schedules
    const listAttendanceOfLearnDay = await this.AttendanceRepository.find({
      where: {
        schedule_id,
      },
    });

    // Lần đầu điểm danh
    if (listAttendanceOfLearnDay.length === 0) {
      const listPromise = attendancesInput.Attendance.map((Attendance) => {
        const newAttendance = this.AttendanceRepository.create({
          id: uuid(),
          is_present: Attendance.is_present,
          user_id: Attendance.user_id,
          note: Attendance.note,
          schedule_id,
        });
        return this.AttendanceRepository.save(newAttendance);

        // return this.ScheduleRepository.update(
        //   { id: Schedule.id },
        //   {
        //     content: Schedule.content,
        //     learn_date: Schedule.learn_date,
        //     is_learn_date: Schedule.is_learn_date,
        //   },
        // );
      });
      const res = await Promise.all(listPromise);

      return true;
    } else {
      listAttendanceOfLearnDay.forEach((Attendance) => {
        const index = attendancesInput.Attendance.findIndex((attendance) => {
          return attendance.user_id === Attendance.user_id;
        });

        const attendanceInPayload = attendancesInput.Attendance[index];

        Attendance.note = attendanceInPayload.note;
        attendanceInPayload.is_present !== undefined &&
          (Attendance.is_present = attendanceInPayload.is_present);
      });
    }

    await this.AttendanceRepository.save(listAttendanceOfLearnDay);
    return true;
  }

  async getAttendanceToday(class_id: string) {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm: any = today.getMonth() + 1; // Months start at 0!
    let dd: any = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = dd + '-' + mm + '-' + yyyy;

    const scheduleToDay = await this.ScheduleRepository.findOneBy({
      class_id,
      learn_date: formattedToday,
    });

    if (scheduleToDay) {
      const AttendanceOfClasses = await this.AttendanceRepository.find({
        where: {
          schedule_id: scheduleToDay.id,
        },
      });
      return AttendanceOfClasses;
    } else {
      throw new Error('Attendance today not found');
    }
  }

  async getMyHistoryAttendance(user_id: string, class_id: string) {
    const schedulesInClass = await this.ScheduleRepository.find({
      where: {
        class_id,
      },
    });
    const schedulesIds = schedulesInClass.map((schedule) => schedule.id);

    const attendances = await this.AttendanceRepository.find({
      where: {
        user_id,
        schedule_id: {
          $in: schedulesIds,
        } as any,
      },
    });

    return attendances;
  }

  async getHistoryAttendanceByClass(class_id: string) {
    const schedulesInClass = await this.ScheduleRepository.find({
      where: {
        class_id,
      },
    });

    const schedulesIds = schedulesInClass.map((schedule) => schedule.id);

    const res = await this.AttendanceRepository.createQueryBuilder(
      'Attendance',
    );

    console.log('res', res);

    const attendances = await this.AttendanceRepository.find({
      where: {
        schedule_id: {
          $in: schedulesIds,
        } as any,
      },
    });

    return attendances;
  }

  // async createAttendance(createAttendanceInput: CreateAttendanceInput) {
  //   const { class_id, content, is_learn_date, learn_date } =
  //     createAttendanceInput;

  //   const newAttendance = await this.AttendanceRepository.create({
  //     id: uuid(),
  //     class_id,
  //     content,
  //     is_learn_date,
  //     learn_date,
  //   });

  //   await this.AttendanceRepository.save(newAttendance);

  //   return newAttendance;
  // }

  // async updateAttendance(updateAttendanceInput: UpdateAttendanceInput) {
  //   const { content, is_learn_date, id } = updateAttendanceInput;

  //   const Attendance = await this.AttendanceRepository.findOneBy({
  //     id,
  //   });

  //   content && (Attendance.content = content);
  //   is_learn_date && (Attendance.is_learn_date = is_learn_date);

  //   await this.AttendanceRepository.save(Attendance);

  //   return Attendance;
  // }

  // async updateAttendanceMany(
  //   updateAttendancesInput: UpdateAttendancesInput,
  //   class_id: string,
  // ) {
  //   // Handle mutate Attendances
  //   const listPromise = updateAttendancesInput.Attendances.map((Attendance) => {
  //     if (!Attendance.id) {
  //       const newAttendance = this.AttendanceRepository.create({
  //         class_id,
  //         content: Attendance.content,
  //         id: uuid(),
  //         is_learn_date: Attendance.is_learn_date,
  //         learn_date: Attendance.learn_date,
  //       });

  //       return this.AttendanceRepository.save(newAttendance);
  //     } else {
  //       return this.AttendanceRepository.update(
  //         { id: Attendance.id },
  //         {
  //           content: Attendance.content,
  //           learn_date: Attendance.learn_date,
  //           is_learn_date: Attendance.is_learn_date,
  //         },
  //       );
  //     }
  //   });

  //   const res = await Promise.all(listPromise);

  //   // console.log('aaa');
  //   // // const Attendances = await this.AttendanceRepository.find({
  //   //   where: {
  //   //     class_id,
  //   //   },
  //   // });

  //   return true;
  // }

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
