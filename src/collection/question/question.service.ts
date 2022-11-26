import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question, Answer } from './question.entity';
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
    const { question, answers, isMutiple } = createQuestionInput;
    const data = this.questionRepository.create({
      id: uuid(),
      owner,
      question,
      answers,
      isMutiple,
    //   correctAnswer,
    });

    await this.questionRepository.save(data);
    return data;
  }

  async updateQuestion(
    UpdateQuestionInput: UpdateQuestionInput,
    questionId: string,
  ): Promise<Question> {
    const { question, answers, isMutiple } = UpdateQuestionInput;
    const data = await this.questionRepository.findOneBy({ id: questionId });

    (data.question = question || data.question),
      (data.answers = answers || data.answers),
      (data.isMutiple = isMutiple || data.isMutiple)
    //   (data.correctAnswer =  data.correctAnswer);

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
}
