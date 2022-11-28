import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamClass } from '../exam-class/exam-class.entity';
import { ExamClassModule } from '../exam-class/exam-class.module';
import { Exam } from '../exam/exam.entity';
import { Question } from '../question/question.entity';
import { UserModule } from '../user/user.module';
import { Assignment } from './assignment.entity';
import { AssignmentResolver } from './assignment.resolver';
import { AssignmentService } from './assignment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Assignment, Question, Exam, ExamClass]), ExamClassModule, UserModule],
  providers: [AssignmentService, AssignmentResolver],
})
export class AssignmentModule {}
