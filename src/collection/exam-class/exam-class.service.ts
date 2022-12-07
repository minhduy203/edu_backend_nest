import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from '../../type';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Class } from '../class/class.entity';
import { ExamClass } from './exam-class.entity';
import { CreateExamClassInput, UpdateExamClassInput } from './exam-class.input';
import { Assignment } from '../assignment/assignment.entity';

@Injectable()
export class ExamClassService {
  constructor(
    @InjectRepository(ExamClass)
    private examClassRepository: Repository<ExamClass>,
    @InjectRepository(Class)
    private classRepository: Repository<Class>,
    @InjectRepository(Assignment)
    private assignmentRepository: Repository<Assignment>,
  ) {}

  async getAllExamClass(): Promise<ExamClass[]> {
    return this.examClassRepository.find();
  }

  async getAllExamClassOfClass(classId: string): Promise<ExamClass[]> {
    return this.examClassRepository.find({
      where: {
        classRoom: classId,
      },
    });
  }

  async getMyExamClass(owner: string): Promise<ExamClass[]> {
    return this.examClassRepository.find({
      where: {
        owner,
      },
    });
  }

  async getExamClassById(id: string): Promise<ExamClass> {
    return this.examClassRepository.findOneBy({ id });
  }

  async createExamClass(
    createExamClassInput: CreateExamClassInput,
    owner: string,
  ): Promise<ExamClass> {
    const { exam, classRoom, dateFrom, dateEnd, isAllowReview, minutes } =
      createExamClassInput;
    const classById = await this.classRepository.findOneBy({ id: classRoom });
    const scoreFactor = classById.scoreFactor;
    const data = {
      id: uuid(),
      owner,
      exam,
      classRoom,
      dateFrom,
      dateEnd,
      isAllowReview,
      minutes,
      scoreFactor,
      assignmentDone: null,
    };
    const result = this.examClassRepository.create(data);
    await this.examClassRepository.save(data);

    // create assignment
    for (const student of classById.students) {
      const dataAssignment = {
        id: uuid(),
        student,
        examClass: data.id,
        startTime: null,
        answerSubmit: null,
        minuteDoing: null,
        score: null,
        status: Status.DONT_DO,
      };
      // const resultAssign = this.assignmentRepository.create(dataAssignment);
      await this.assignmentRepository.save(dataAssignment);
    }

    return result;
  }

  async updateExamClass(
    updateExamClassInput: UpdateExamClassInput,
    examId: string,
  ): Promise<ExamClass> {
    const {
      exam,
      classRoom,
      dateFrom,
      dateEnd,
      isAllowReview,
      minutes,
      scoreFactor,
    } = updateExamClassInput;
    const data = await this.examClassRepository.findOneBy({ id: examId });

    data.exam = exam || data.exam;
    data.classRoom = classRoom || data.classRoom;
    data.dateFrom = dateFrom || data.dateFrom;
    data.dateEnd = dateEnd || data.dateEnd;
    data.isAllowReview = isAllowReview || data.isAllowReview;
    data.minutes = minutes || data.minutes;
    data.scoreFactor = scoreFactor || data.scoreFactor;

    return this.examClassRepository.save(data);
  }

  async deleteExamClass(id: string): Promise<boolean> {
    const existingExamClass = await this.examClassRepository.findOneBy({ id });
    if (!existingExamClass) {
      return false;
    }
    await this.examClassRepository.delete({ id });

    return true;
  }

  async getManyAssignments(assignmentIds: string[]): Promise<Assignment[]> {
    if (assignmentIds) {
      const assignmentList = await this.assignmentRepository.find({
        where: {
          id: {
            $in: assignmentIds,
          } as any,
        },
      });

      return assignmentList;
    }
    return null;
  }
}
