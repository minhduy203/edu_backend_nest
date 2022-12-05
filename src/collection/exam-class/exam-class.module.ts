import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from '../class/class.entity';
import { ClassModule } from '../class/class.module';
import { ExamModule } from '../exam/exam.module';
import { UserModule } from '../user/user.module';
import { ExamClass } from './exam-class.entity';
import { ExamClassResolver } from './exam-class.resolver';
import { ExamClassService } from './exam-class.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExamClass, Class]), ClassModule, ExamModule, UserModule],
  providers: [ExamClassService, ExamClassResolver],
  exports: [ExamClassService],
})
export class ExamClassModule {}
