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
import { UserService } from '../user/user.service';
import { Class } from './class.entity';
import {
  AssignUserToClassInput,
  CreateClassInput,
  CreateMyClassInput,
  FilterClassType,
  UpdateClassInput,
  UpdateMyClassInput,
} from './class.input';
import { ClassService } from './class.service';
import { ClassType } from './class.type';

@Resolver((_of) => ClassType)
export class ClassResolver {
  constructor(
    private classService: ClassService,
    private userService: UserService,
  ) {}

  @Query((_returns) => [ClassType])
  getAllClasses() {
    return this.classService.getAllClasses();
  }

  @Query((_returns) => [ClassType])
  async getMyClass(
    @Args('fitlerClassType') filterClassType: FilterClassType,
    @GetCurrentUser() user: JwtPayload,
  ) {
    const { sub } = user;

    const classes = await this.classService.getClassesByIdTeacher(
      filterClassType,
      sub,
    );

    return classes;
  }

  @Query((_returns) => [ClassType])
  async getMyClassStudent(
    @Args('fitlerClassType') filterClassType: FilterClassType,
    @GetCurrentUser() user: JwtPayload,
  ) {
    const { sub } = user;

    const classes = await this.classService.getClassOfStudent(
      filterClassType,
      sub,
    );

    return classes;
  }

  @Query((_returns) => ClassType)
  getClassById(@Args('id') id: string) {
    return this.classService.getClassById(id);
  }

  @Mutation((_returns) => ClassType)
  updateMyClass(
    @Args('updateMyClass') updateMyClassInput: UpdateMyClassInput,
    @Args('id') id: string,
    @GetCurrentUser() user: JwtPayload,
  ) {
    const { sub } = user;
    return this.classService.updateMyClass(updateMyClassInput, id, sub);
  }

  @Mutation((_returns) => ClassType)
  createMyClass(
    @Args('createMyClass') createMyClass: CreateMyClassInput,
    @GetCurrentUser() user: JwtPayload,
  ) {
    const { sub } = user;

    return this.classService.createMyClass(sub, createMyClass);
  }

  @Mutation((_returns) => Boolean)
  async deleteMyClass(
    @Args('id') id: string,
    @GetCurrentUser() user: JwtPayload,
  ) {
    const { sub } = user;

    const classInfo = await this.classService.getClassById(id);

    if (classInfo.owner === sub) {
      this.classService.deleteClass(id);
    } else {
      throw new Error('You not have permission');
    }
    return this.classService.deleteClass(id);
  }

  @Mutation((_returns) => ClassType)
  createClass(
    @GetCurrentUser() user: JwtPayload,
    @Args('createClassInput') createClassInput: CreateClassInput,
  ) {
    return this.classService.createClass(createClassInput, user.sub);
  }

  @Mutation((_returns) => ClassType)
  updateClass(
    @Args('updateClassInput') updateClassInput: UpdateClassInput,
    @Args('id') id: string,
  ) {
    return this.classService.updateClass(updateClassInput, id);
  }

  @Mutation((_returns) => Boolean)
  deleteClass(@Args('id') id: string) {
    return this.classService.deleteClass(id);
  }

  @Mutation((_returns) => ClassType)
  assignStudentToClass(
    @Args('assignStudentToClassInput')
    assignStudentToClassInput: AssignUserToClassInput,
  ) {
    const { classId, usersIds } = assignStudentToClassInput;
    return this.classService.assignStudentsToClass(classId, usersIds);
  }

  @Mutation((_returns) => ClassType)
  assignTeacherToClass(
    @Args('assignTeacherToClassInput')
    assignTeacherToClassInput: AssignUserToClassInput,
  ) {
    const { classId, usersIds } = assignTeacherToClassInput;
    return this.classService.assignTeachersToClass(classId, usersIds);
  }

  @ResolveField()
  async owner(@Parent() classRoom: Class) {
    return this.userService.getUserById(classRoom.owner);
  }

  @ResolveField()
  async students(@Parent() classRoom: Class) {
    return this.userService.getManyUsers(classRoom.students);
  }

  @ResolveField()
  async teachers(@Parent() classRoom: Class) {
    return this.userService.getManyUsers(classRoom.teachers);
  }
}
