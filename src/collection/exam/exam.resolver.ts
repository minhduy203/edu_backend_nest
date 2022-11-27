import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ClassService } from '../class/class.service';
import { QuestionService } from '../question/question.service';
import { Exam } from './exam.entity';
import { CreateExamInput, UpdateExamInput } from './exam.input';
import { ExamService } from './exam.service';
import { ExamType } from './exam.type';

@Resolver((_type) => ExamType)
export class ExamResolver {
  constructor(
    private examService: ExamService,
    private questionService: QuestionService,
    private classService: ClassService,
  ) {}

  @Query((_returns) => [ExamType])
  getAllExam() {
    return this.examService.getAllExam();
  }

  @Query((_returns) => ExamType)
  getExamById(@Args('id') id: string) {
    return this.examService.getExamById(id);
  }

  @Mutation((_returns) => ExamType)
  createExam(@Args('createExamInput') createExamInput: CreateExamInput) {
    return this.examService.createExam(createExamInput);
  }

  @Mutation((_returns) => ExamType)
  updateExam(
    @Args('updateExamInput') updateExamInput: UpdateExamInput,
    @Args('id') id: string,
  ) {
    return this.examService.updateExam(updateExamInput, id);
  }

  @Mutation((_returns) => Boolean)
  deleteExam(@Args('id') id: string) {
    return this.examService.deleteExam(id);
  }

  @ResolveField()
  async questions(@Parent() exam: Exam) {
    return this.questionService.getManyQuestions(exam.questions);
  }

  @ResolveField()
  async classRoom(@Parent() exam: Exam) {
    return this.classService.getClassById(exam.id);
  }
}
