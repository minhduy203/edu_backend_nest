import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Exam } from '../exam/exam.entity';
import { Question } from '../question/question.entity';
import { Assignment } from './assignment.entity';
import {
  AnswerSubmitInput,
  CreateAssignmentInput,
  UpdateAssignmentInput,
} from './assignment.input';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectRepository(Assignment)
    private assignmentRepository: Repository<Assignment>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(Exam)
    private examRepository: Repository<Exam>,
  ) {}

  async getAllAssignment(): Promise<Assignment[]> {
    return this.assignmentRepository.find();
  }

  async getAssignmentById(id: string): Promise<Assignment> {
    return this.assignmentRepository.findOneBy({ id });
  }

  async createAssignment(
    createAssignmentInput: CreateAssignmentInput,
    user: string,
  ): Promise<Assignment> {
    const { answerSubmit, exam, minuteDoing, startTime } =
      createAssignmentInput;
    const score = await this.calcScore(answerSubmit, exam);
    const data = {
      id: uuid(),
      answerSubmit,
      exam,
      minuteDoing,
      startTime,
      user,
      score,
    };
    const result = this.assignmentRepository.create(data);
    await this.assignmentRepository.insert(data);

    return result;
  }

  async updateAssignment(
    updateAssignmentInput: UpdateAssignmentInput,
    assignmentId: string,
  ): Promise<Assignment> {
    const { answerSubmit, exam, minuteDoing, startTime } =
      updateAssignmentInput;
    const data = await this.assignmentRepository.findOneBy({
      id: assignmentId,
    });

    data.answerSubmit = answerSubmit || data.answerSubmit;
    data.exam = exam || data.exam;
    data.minuteDoing = minuteDoing || data.minuteDoing;
    data.startTime = startTime || data.startTime;

    return this.assignmentRepository.save(data);
  }

  async deleteAssignment(id: string): Promise<boolean> {
    const existingAssignment = await this.assignmentRepository.findOneBy({
      id,
    });
    if (!existingAssignment) {
      return false;
    }
    await this.assignmentRepository.delete({ id });

    return true;
  }

  //Calc score
  async calcScore(answerSubmit: AnswerSubmitInput[], examId: string) {
    let correctNumber = 0;
    const exam = await this.examRepository.findOneBy({ id: examId });

    for (const answer of answerSubmit) {
      let match = 0;
      const question = await this.questionRepository.findOneBy({
        id: answer.questionId,
      });
      const correctAnswerArr = [];
      question.correctAnswer.forEach((item) => {
        if (item.result) {
          correctAnswerArr.push(item.text);
        }
      });
      const answersOfQuestion = answer.answer;

      for (const item of answersOfQuestion) {
        if (correctAnswerArr.includes(item)) {
          match++;
        }
      }

      if (
        match === correctAnswerArr.length &&
        answersOfQuestion.length === correctAnswerArr.length
      ) {
        correctNumber++;
      }
    }

    const result = correctNumber * (exam.scoreFactor / exam.questions.length);

    return result;
  }
}
