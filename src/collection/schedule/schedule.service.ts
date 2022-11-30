import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from '../user/user.entity';
import { Schedule } from './schedule.entity';
import {
  CreateScheduleInput,
  UpdateScheduleInput,
  UpdateSchedulesInput,
} from './schedule.input';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private ScheduleRepository: Repository<Schedule>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getScheduleByIdClass(class_id: string) {
    const ScheduleOfClasses = await this.ScheduleRepository.find({
      where: {
        class_id,
      },
    });

    return ScheduleOfClasses;
  }

  async createSchedule(createScheduleInput: CreateScheduleInput) {
    const { class_id, content, is_learn_date, learn_date } =
      createScheduleInput;

    const newSchedule = await this.ScheduleRepository.create({
      id: uuid(),
      class_id,
      content,
      is_learn_date,
      learn_date,
    });

    await this.ScheduleRepository.save(newSchedule);

    return newSchedule;
  }

  async updateSchedule(updateScheduleInput: UpdateScheduleInput) {
    const { content, is_learn_date, id } = updateScheduleInput;

    const Schedule = await this.ScheduleRepository.findOneBy({
      id,
    });

    content && (Schedule.content = content);
    is_learn_date && (Schedule.is_learn_date = is_learn_date);

    await this.ScheduleRepository.save(Schedule);

    return Schedule;
  }

  async updateScheduleMany(
    updateSchedulesInput: UpdateSchedulesInput,
    class_id: string,
  ) {
    // Handle mutate Schedules
    const listPromise = updateSchedulesInput.Schedules.map((Schedule) => {
      if (!Schedule.id) {
        const newSchedule = this.ScheduleRepository.create({
          class_id,
          content: Schedule.content,
          id: uuid(),
          is_learn_date: Schedule.is_learn_date,
          learn_date: Schedule.learn_date,
        });

        return this.ScheduleRepository.save(newSchedule);
      } else {
        return this.ScheduleRepository.update(
          { id: Schedule.id },
          {
            content: Schedule.content,
            learn_date: Schedule.learn_date,
            is_learn_date: Schedule.is_learn_date,
          },
        );
      }
    });

    const res = await Promise.all(listPromise);

    // console.log('aaa');
    // // const Schedules = await this.ScheduleRepository.find({
    //   where: {
    //     class_id,
    //   },
    // });

    return true;
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
