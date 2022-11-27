import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exam } from './exam.entity';
import { CreateExamInput, UpdateExamInput } from './exam.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ExamService {
  constructor(
    @InjectRepository(Exam)
    private examRepository: Repository<Exam>,
  ) {}

  async getAllExam(): Promise<Exam[]> {
    return this.examRepository.find();
  }

  async getExamById(id: string): Promise<Exam> {
    return this.examRepository.findOneBy({ id });
  }

  async createExam(createExamInput: CreateExamInput): Promise<Exam> {
    const {
      name,
      classRoom,
      tags = null,
      dateFrom,
      dateEnd,
      isAllowReview,
      minutes,
      questionAmount,
      questions,
      scoreFactor,
    } = createExamInput;
    const data = {
      id: uuid(),
      name,
      classRoom,
      tags,
      dateFrom,
      dateEnd,
      isAllowReview,
      minutes,
      questionAmount,
      questions,
      scoreFactor,
    };
    const result = this.examRepository.create(data);
    await this.examRepository.save(data);
    return result;
  }

  async updateExam(
    updateExamInput: UpdateExamInput,
    examId: string,
  ): Promise<Exam> {
    const {
      name,
      classRoom,
      dateFrom,
      dateEnd,
      isAllowReview,
      minutes,
      questionAmount,
      questions,
      scoreFactor,
    } = updateExamInput;
    const data = await this.examRepository.findOneBy({ id: examId });

    data.name = name || data.name;
    data.classRoom = classRoom || data.classRoom;
    data.dateFrom = dateFrom || data.dateFrom;
    data.dateEnd = dateEnd || data.dateEnd;
    data.isAllowReview = isAllowReview || data.isAllowReview;
    data.minutes = minutes || data.minutes;
    data.questionAmount = questionAmount || data.questionAmount;
    data.questions = questions || data.questions;
    data.scoreFactor = scoreFactor || data.scoreFactor;

    return this.examRepository.save(data);
  }

  async deleteExam(id: string): Promise<boolean> {
    const existingExam = await this.examRepository.findOneBy({ id });
    if (!existingExam) {
      return false;
    }
    await this.examRepository.delete({ id });

    return true;
  }
}
