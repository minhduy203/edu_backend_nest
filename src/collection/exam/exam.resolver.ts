import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GetCurrentUser } from 'src/common/decorators';
import { JwtPayload } from 'src/type';
import { QuestionService } from '../question/question.service';
import { TagService } from '../tag/tag.service';
import { Exam } from './exam.entity';
import { CreateExamInput, UpdateExamInput } from './exam.input';
import { ExamService } from './exam.service';
import { ExamType } from './exam.type';

@Resolver((_type) => ExamType)
export class ExamResolver {
  constructor(
    private examService: ExamService,
    private questionService: QuestionService,
    private tagService: TagService,
  ) {}

  @Query((_returns) => [ExamType])
  getAllExam() {
    return this.examService.getAllExam();
  }

  @Query((_returns) => ExamType)
  getExamById(@Args('id') id: string) {
    return this.examService.getExamById(id);
  }

  @Query((_returns) => ExamType)
  getMyExam(@GetCurrentUser() user: JwtPayload) {
    const { sub } = user;
    return this.examService.getMyExam(sub);
  }

  @Mutation((_returns) => ExamType)
  createExam(
    @GetCurrentUser() user: JwtPayload,
    @Args('createExamInput') createExamInput: CreateExamInput,
  ) {
    const { sub } = user;
    return this.examService.createExam(createExamInput, sub);
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
  async tags(@Parent() exam: Exam) {
    return this.tagService.getManyTags(exam.tags);
  }
}
