import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exam } from './exam.entity';
import { CreateExamInput, UpdateExamInput } from './exam.input';
import { v4 as uuid } from 'uuid';
import { ExamClass } from '../exam-class/exam-class.entity';

@Injectable()
export class ExamService {
  constructor(
    @InjectRepository(Exam)
    private examRepository: Repository<Exam>,
    @InjectRepository(ExamClass)
    private examClassRepository: Repository<ExamClass>,
  ) {}

  async getAllExam(): Promise<Exam[]> {
    return this.examRepository.find();
  }

  async getMyExam(id): Promise<Exam[]> {
    return this.examRepository.find({
      where: {
        owner_id: id,
      },
    });
  }

  async getExamById(id: string): Promise<Exam> {
    return this.examRepository.findOneBy({ id });
  }

  async createExam(
    createExamInput: CreateExamInput,
    owner_id: string,
  ): Promise<Exam> {
    const { name, tags = null, questions } = createExamInput;
    const data = {
      id: uuid(),
      name,
      tags,
      questions,
      owner_id,
    };
    const result = this.examRepository.create(data);
    await this.examRepository.save(data);
    return result;
  }

  async updateExam(
    updateExamInput: UpdateExamInput,
    examId: string,
  ): Promise<Exam> {
    const { name, questions, tags } = updateExamInput;
    const data = await this.examRepository.findOneBy({ id: examId });

    data.name = name || data.name;
    data.questions = questions || data.questions;
    data.tags = tags || data.tags;

    return this.examRepository.save(data);
  }

  async deleteExam(id: string): Promise<boolean> {
    const existingExam = await this.examRepository.findOneBy({ id });
    const examClass = await this.examClassRepository.findOneBy({ exam: id });
    if (!existingExam) {
      return false;
    }
    if (examClass) {
      throw new Error(`This exam related to examClass ${examClass.id}`);
    }
    await this.examRepository.delete({ id });

    return true;
  }
}
