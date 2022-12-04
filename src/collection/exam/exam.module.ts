import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from '../class/class.entity';
import { ClassModule } from '../class/class.module';
import { ExamClass } from '../exam-class/exam-class.entity';
import { QuestionModule } from '../question/question.module';
import { TagModule } from '../tag/tag.module';
import { Exam } from './exam.entity';
import { ExamResolver } from './exam.resolver';
import { ExamService } from './exam.service';

@Module({
  imports: [TypeOrmModule.forFeature([Exam, ExamClass]), QuestionModule, TagModule],
  providers: [ExamService, ExamResolver],
  exports: [ExamService],
})
export class ExamModule {}
