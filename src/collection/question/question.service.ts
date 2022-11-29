import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';
import { CreateQuestionInput, UpdateQuestionInput } from './question.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  async getAllQuestion(): Promise<Question[]> {
    return this.questionRepository.find();
  }

  async getQuestionById(id: string): Promise<Question> {
    return this.questionRepository.findOneBy({ id });
  }

  async createQuestion(
    createQuestionInput: CreateQuestionInput,
    owner: string,
  ): Promise<Question> {
    const { question, isMultiple, correctAnswer } = createQuestionInput;
    const answers = [];
    correctAnswer.forEach((item) => answers.push(item.text));
    const data = {
      id: uuid(),
      owner,
      question,
      answers,
      isMultiple,
      correctAnswer,
      createdAt: new Date(),
    };
    const result = this.questionRepository.create(data);
    await this.questionRepository.insert(data);
    return result;
  }

  async updateQuestion(
    updateQuestionInput: UpdateQuestionInput,
    questionId: string,
  ): Promise<Question> {
    const { question, isMultiple, correctAnswer } = updateQuestionInput;
    const answers = [];
    correctAnswer.forEach((item) => answers.push(item.text));
    const data = await this.questionRepository.findOneBy({ id: questionId });

    question !== undefined && (data.question = question);
    data.answers = answers;
    isMultiple !== undefined && (data.isMultiple = isMultiple);
    correctAnswer !== undefined && (data.correctAnswer = correctAnswer);

    return this.questionRepository.save(data);
  }

  async deleteQuestion(id: string): Promise<boolean> {
    const existingQuestion = await this.questionRepository.findOneBy({ id });
    if (!existingQuestion) {
      return false;
    }
    await this.questionRepository.delete({ id });

    return true;
  }

  async getManyQuestions(questionIds: string[]): Promise<Question[]> {
    const questionList = await this.questionRepository.find({
      where: {
        id: {
          $in: questionIds,
        } as any,
      },
    });

    return questionList;
  }
}
