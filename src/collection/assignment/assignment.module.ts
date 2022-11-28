import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exam } from '../exam/exam.entity';
import { ExamModule } from '../exam/exam.module';
import { Question } from '../question/question.entity';
import { UserModule } from '../user/user.module';
import { Assignment } from './assignment.entity';
import { AssignmentResolver } from './assignment.resolver';
import { AssignmentService } from './assignment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Assignment, Question, Exam]), ExamModule, UserModule],
  providers: [AssignmentService, AssignmentResolver],
})
export class AssignmentModule {}
