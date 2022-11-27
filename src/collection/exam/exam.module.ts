import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassModule } from '../class/class.module';
import { QuestionModule } from '../question/question.module';
import { Exam } from './exam.entity';
import { ExamResolver } from './exam.resolver';
import { ExamService } from './exam.service';

@Module({
  imports: [TypeOrmModule.forFeature([Exam]), QuestionModule, ClassModule],
  providers: [ExamService, ExamResolver],
})
export class ExamModule {}