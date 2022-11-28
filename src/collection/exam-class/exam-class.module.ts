import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from '../class/class.entity';
import { ClassModule } from '../class/class.module';
import { ExamClass } from './exam-class.entity';
import { ExamClassResolver } from './exam-class.resolver';
import { ExamClassService } from './exam-class.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExamClass, Class]), ClassModule],
  providers: [ExamClassService, ExamClassResolver],
  exports: [ExamClassService],
})
export class ExamClassModule {}
