import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UpdateClassInput } from './class.input';
import { CreateClassInput } from './class.input';
import { ClassService } from './class.service';
import { ClassType } from './class.type';

@Resolver((_of) => ClassType)
export class ClassResolver {
  constructor(private classService: ClassService) {}

  @Query((_returns) => [ClassType])
  getAllClasses() {
    return this.classService.getAllClasses();
  }
  @Query((_returns) => ClassType)
  getClassById(@Args('id') id: string) {
    return this.classService.getClassById(id);
  }

  @Mutation((_returns) => ClassType)
  createClass(@Args('createClassInput') createClassInput: CreateClassInput) {
    return this.classService.createClass(createClassInput);
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
}
