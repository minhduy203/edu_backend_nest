import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { JwtPayload } from '../../type';
import { GetCurrentUser } from '../../common/decorators';
import { ClassService } from '../class/class.service';
import { ExamService } from '../exam/exam.service';
import { ExamClass } from './exam-class.entity';
import { CreateExamClassInput, UpdateExamClassInput } from './exam-class.input';
import { ExamClassService } from './exam-class.service';
import { ExamClassType } from './exam-class.type';
import { UserService } from '../user/user.service';

@Resolver((_type) => ExamClassType)
export class ExamClassResolver {
  constructor(
    private examClassService: ExamClassService,
    private examService: ExamService,
    private classService: ClassService,
    private userService: UserService,
  ) {}

  @Query((_returns) => [ExamClassType])
  getAllExamClass() {
    return this.examClassService.getAllExamClass();
  }

  @Query((_returns) => [ExamClassType])
  getMyExamClass(@GetCurrentUser() user: JwtPayload) {
    return this.examClassService.getMyExamClass(user.sub);
  }

  @Query((_returns) => [ExamClassType])
  getAllExamOfClass(@Args('classId') classId: string) {
    return this.examClassService.getAllExamOfClass(classId);
  }

  @Query((_returns) => ExamClassType)
  getExamClassById(@Args('id') id: string) {
    return this.examClassService.getExamClassById(id);
  }

  @Mutation((_returns) => ExamClassType)
  createExamClass(
    @Args('createExamClassInput') createExamClassInput: CreateExamClassInput,
    @GetCurrentUser() user: JwtPayload,
  ) {
    return this.examClassService.createExamClass(
      createExamClassInput,
      user.sub,
    );
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

  @ResolveField()
  async exam(@Parent() examClass: ExamClass) {
    return this.examService.getExamById(examClass.exam);
  }

  @ResolveField()
  async owner(@Parent() examClass: ExamClass) {
    return this.userService.getUserById(examClass.owner);
  }
}
