import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GetCurrentUser } from '../../common/decorators';
import { JwtPayload } from '../../type';
import { ExamClassService } from '../exam-class/exam-class.service';
import { UserService } from '../user/user.service';
import { Assignment } from './assignment.entity';
import {
  CreateAssignmentInput,
  UpdateAssignmentInput,
} from './assignment.input';
import { AssignmentService } from './assignment.service';
import { AssignmentType } from './assignment.type';

@Resolver((_type) => AssignmentType)
export class AssignmentResolver {
  constructor(
    private assignmentService: AssignmentService,
    private examClassService: ExamClassService,
    private userService: UserService,
  ) {}

  @Query((_returns) => [AssignmentType])
  getAllAssignment() {
    return this.assignmentService.getAllAssignment();
  }

  @Query((_returns) => AssignmentType)
  getAssignmentById(@Args('id') id: string) {
    return this.assignmentService.getAssignmentById(id);
  }

  @Mutation((_returns) => AssignmentType)
  createAssignment(
    @GetCurrentUser() user: JwtPayload,
    @Args('createAssignmentInput') createAssignmentInput: CreateAssignmentInput,
  ) {
    return this.assignmentService.createAssignment(
      createAssignmentInput,
      user.sub,
    );
  }

  @Mutation((_returns) => AssignmentType)
  updateAssignment(
    @Args('updateAssignmentInput') updateAssignmentInput: UpdateAssignmentInput,
    @Args('id') id: string,
  ) {
    return this.assignmentService.updateAssignment(updateAssignmentInput, id);
  }

  @Mutation((_returns) => Boolean)
  deleteAssignment(@Args('id') id: string) {
    return this.assignmentService.deleteAssignment(id);
  }

  @ResolveField()
  async examClass(@Parent() assignment: Assignment) {
    return this.examClassService.getExamClassById(assignment.id);
  }

  @ResolveField()
  async user(@Parent() assignment: Assignment) {
    return this.userService.getUserById(assignment.user);
  }
}
