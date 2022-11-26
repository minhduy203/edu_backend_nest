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
import { QuestionType } from './question.type';
import { QuestionService } from './question.service';
import { CreateQuestionInput, UpdateQuestionInput } from './question.input';
import { Question } from './question.entity';

@Resolver((_of) => QuestionType)
export class QuestionResolver {
  constructor(
    private questionService: QuestionService,
    private userService: UserService,
  ) {}

  @Query((_returns) => [QuestionType])
  getAllQuestion() {
    return this.questionService.getAllQuestion();
  }

  @Query((_returns) => QuestionType)
  getQuestionById(@Args('id') id: string) {
    return this.questionService.getQuestionById(id);
  }

  @Mutation((_returns) => QuestionType)
  createQuestion(
    @GetCurrentUser() user: JwtPayload,
    @Args('createQuestionInput') createQuestionInput: CreateQuestionInput,
  ) {
    return this.questionService.createQuestion(createQuestionInput, user.sub);
  }

  @Mutation((_returns) => QuestionType)
  updateQuestion(
    @Args('updateQuestionInput') updateQuestionInput: UpdateQuestionInput,
    @Args('id') id: string,
  ) {
    return this.questionService.updateQuestion(updateQuestionInput, id);
  }

  @Mutation((_returns) => Boolean)
  deleteQuestion(@Args('id') id: string) {
    return this.questionService.deleteQuestion(id);
  }

  @ResolveField()
  async owner(@Parent() question: Question) {
    return this.userService.getUserById(question.owner);
  }
}
