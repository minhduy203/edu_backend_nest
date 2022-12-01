import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ScoreType } from 'src/type/ScoreType';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Class } from '../class/class.entity';
import { User } from '../user/user.entity';
import { ColumnScore } from './columnScore.entity';
import {
  CreateColumnScoreInput,
  UpdateColumnScoreInput,
  UpdateTableScoreInput,
} from './columnScore.input';

@Injectable()
export class ColumnScoreService {
  constructor(
    @InjectRepository(ColumnScore)
    private columnScoreRepository: Repository<ColumnScore>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Class) private classRepository: Repository<Class>,
  ) {}

  async getColumnScoresByIdClass(class_id: string) {
    const attendanceOfClasses = await this.columnScoreRepository.find({
      where: {
        class_id,
      },
    });

    return attendanceOfClasses;
  }

  async createColumnScore(createColumnScoreInput: CreateColumnScoreInput) {
    const { class_id, multiplier, name, type, note, examOfClass_id } =
      createColumnScoreInput;

    const scores = {};

    // Trường hợp là điểm cộng hoặc điểm trừ sẽ cho giá trị mặc định là 0
    if (type === ScoreType.PLUS || type === ScoreType.MINUS) {
      const classInfo = await this.classRepository.findOneBy({
        id: class_id,
      });

      classInfo.students.forEach((student_id) => {
        scores[student_id] = 0;
      });
    }

    const newColumnScore = await this.columnScoreRepository.create({
      id: uuid(),
      class_id,
      multiplier,
      name,
      type,
      note,
      scores,
      examOfClass_id,
    });

    await this.columnScoreRepository.save(newColumnScore);

    return newColumnScore;
  }

  async updateColumnScore(
    updateAttendanceInput: UpdateColumnScoreInput,
    id: string,
  ) {
    const { multiplier, name, note, type, examOfClass_id, reference_col } =
      updateAttendanceInput;

    const attendance = await this.columnScoreRepository.findOneBy({
      id,
    });

    multiplier && (attendance.multiplier = multiplier);
    name && (attendance.name = name);
    note && (attendance.note = note);
    type && (attendance.type = type);
    examOfClass_id && (attendance.examOfClass_id = examOfClass_id);
    reference_col && (attendance.reference_col = reference_col);

    return await this.columnScoreRepository.save(attendance);
  }

  async updateTableScore(
    updateColumnScoresInput: UpdateTableScoreInput,
    class_id: string,
  ) {
    const { columnScores } = updateColumnScoresInput;

    const columnScoresOfClass = await this.columnScoreRepository.find({
      where: {
        class_id,
      },
    });

    columnScoresOfClass.forEach((colScoreOfClass) => {
      const data = columnScores.find((colScore) => {
        return colScore.id === colScoreOfClass.id;
      });

      colScoreOfClass.scores = data?.scores;
    });

    await this.columnScoreRepository.save(columnScoresOfClass);
    return true;
    // return await this.columnScoreRepository.save(attendance);
  }

  // async updateAttendanceMany(
  //   updateAttendancesInput: UpdateAttendancesInput,
  //   class_id: string,
  // ) {
  //   // Handle mutate attendances
  //   const listPromise = updateAttendancesInput.attendances.map((attendance) => {
  //     if (!attendance.id) {
  //       const newAttendance = this.attendanceRepository.create({
  //         class_id,
  //         content: attendance.content,
  //         id: uuid(),
  //         is_learn_date: attendance.is_learn_date,
  //         learn_date: attendance.learn_date,
  //       });

  //       return this.attendanceRepository.save(newAttendance);
  //     } else {
  //       return this.attendanceRepository.update(
  //         { id: attendance.id },
  //         {
  //           content: attendance.content,
  //           learn_date: attendance.learn_date,
  //           is_learn_date: attendance.is_learn_date,
  //         },
  //       );
  //     }
  //   });

  //   const res = await Promise.all(listPromise);

  //   // console.log('aaa');
  //   // // const attendances = await this.attendanceRepository.find({
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

  async deleteColumnScoreById(id): Promise<boolean> {
    await this.columnScoreRepository.delete({ id });

    return true;
  }
}
