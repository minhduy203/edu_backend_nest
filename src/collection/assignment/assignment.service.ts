import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from '../../type';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { ExamClass } from '../exam-class/exam-class.entity';
import { Exam } from '../exam/exam.entity';
import { Question } from '../question/question.entity';
import { Assignment } from './assignment.entity';
import {
  AnswerSubmitInput,
  CreateAssignmentInput,
  UpdateAssignmentInput,
} from './assignment.input';
import { GraphQLJSONObject } from 'graphql-type-json';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectRepository(Assignment)
    private assignmentRepository: Repository<Assignment>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(Exam)
    private examRepository: Repository<Exam>,
    @InjectRepository(ExamClass)
    private examClassRepository: Repository<ExamClass>,
  ) {}

  async getAllAssignment(): Promise<Assignment[]> {
    return this.assignmentRepository.find();
  }

  async getAllMyAssignment(id: string): Promise<Assignment[]> {
    return this.assignmentRepository.find({
      where: {
        student: id,
      },
    });
  }

  async getAssignmentById(id: string): Promise<Assignment> {
    return this.assignmentRepository.findOneBy({ id });
  }

  async getScoresAssignmentByExamClass(exam_id: string): Promise<any> {
    const res = await this.assignmentRepository.find({
      where: {
        examClass: exam_id,
      },
    });
    const result = {};

    res.forEach((assignment) => {
      result[assignment.student] = assignment.score || 0;
    });

    return result;
  }

  async createAssignment(
    createAssignmentInput: CreateAssignmentInput,
  ): Promise<Assignment> {
    const { examClass, student } = createAssignmentInput;
    const data = {
      id: uuid(),
      student,
      examClass,
      startTime: null,
      answerSubmit: null,
      minuteDoing: null,
      score: null,
      status: Status.DONT_DO,
    };
    const result = this.assignmentRepository.create(data);
    await this.assignmentRepository.insert(data);

    return result;
  }

  async updateAssignment(
    updateAssignmentInput: UpdateAssignmentInput,
    assignmentId: string,
  ): Promise<Assignment> {
    const { answerSubmit, examClass, minuteDoing, startTime } =
      updateAssignmentInput;
    const data = await this.assignmentRepository.findOneBy({
      id: assignmentId,
    });
    const examClassFound = await this.examClassRepository.findOneBy({
      id: data.examClass,
    });
    const score = await this.calcScore(answerSubmit, data.examClass);
    let status: Status = Status.DONT_DO;
    if (startTime) status = Status.DOING;
    if (answerSubmit) {
      status = Status.DONE;
      // add to assignment done
      if (examClassFound.assignmentDone === null) {
        examClassFound.assignmentDone = [];
      }
      examClassFound.assignmentDone.push(assignmentId);
      await this.examClassRepository.save(examClassFound);
    }

    data.answerSubmit = answerSubmit || data.answerSubmit;
    data.minuteDoing = minuteDoing || data.minuteDoing;
    data.startTime = startTime || data.startTime;
    data.examClass = examClass || data.examClass;
    data.score = score;
    data.status = status;

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
  async calcScore(answerSubmit: AnswerSubmitInput[], examClassId: string) {
    let correctNumber = 0;
    const examClass = await this.examClassRepository.findOneBy({
      id: examClassId,
    });
    const exam = await this.examRepository.findOneBy({ id: examClass.exam });

    if (answerSubmit) {
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
      const result =
        correctNumber * (examClass.scoreFactor / exam.questions.length);

      return result;
    }

    return null;
  }
}
