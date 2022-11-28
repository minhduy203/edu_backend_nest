import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ClassService } from '../class/class.service';
import { ExamClass } from './exam-class.entity';
import { CreateExamClassInput, UpdateExamClassInput } from './exam-class.input';
import { ExamClassService } from './exam-class.service';
import { ExamClassType } from './exam-class.type';

@Resolver((_type) => ExamClassType)
export class ExamClassResolver {
  constructor(
    private examClassService: ExamClassService,
    private classService: ClassService,
  ) {}

  @Query((_returns) => [ExamClassType])
  getAllExamClass() {
    return this.examClassService.getAllExamClass();
  }

  @Query((_returns) => ExamClassType)
  getExamClassById(@Args('id') id: string) {
    return this.examClassService.getExamClassById(id);
  }

  @Mutation((_returns) => ExamClassType)
  createExamClass(
    @Args('createExamClassInput') createExamClassInput: CreateExamClassInput,
  ) {
    return this.examClassService.createExamClass(createExamClassInput);
  }

  @Mutation((_returns) => ExamClassType)
  updateExamClass(
    @Args('updateExamClassInput') updateExamClassInput: UpdateExamClassInput,
    @Args('id') id: string,
  ) {
    return this.examClassService.updateExamClass(updateExamClassInput, id);
  }

  @Mutation((_returns) => Boolean)
  deleteExamClass(@Args('id') id: string) {
    return this.examClassService.deleteExamClass(id);
  }

  @ResolveField()
  async classRoom(@Parent() examClass: ExamClass) {
    return this.classService.getClassById(examClass.classRoom);
  }
}
