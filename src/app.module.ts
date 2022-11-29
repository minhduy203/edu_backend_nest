import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './collection/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './collection/user/user.entity';
import { ClassModule } from './collection/class/class.module';
import { Class } from './collection/class/class.entity';
import { AuthModule } from './auth/auth.module';
import { GqlGuard } from './common/guards';
import { ConfigModule } from '@nestjs/config';
import { TagModule } from './collection/tag/tag.module';
import { Tag } from './collection/tag/tag.entity';
import { MediaModule } from './collection/media/media.module';
import { Media } from './collection/media/media.entity';
import { QuestionModule } from './collection/question/question.module';
import { Question } from './collection/question/question.entity';
import { ExamModule } from './collection/exam/exam.module';
import { Exam } from './collection/exam/exam.entity';
import { Attendance } from './collection/attendance/attendance.entity';
import { AttendanceModule } from './collection/attendance/attendance.module';
import { AssignmentModule } from './collection/assignment/assignment.module';
import { Assignment } from './collection/assignment/assignment.entity';
import { ExamClassModule } from './collection/exam-class/exam-class.module';
import { ExamClass } from './collection/exam-class/exam-class.entity';
import { ColumnScore } from './collection/columnScore/columnScore.entity';
import { ColumnScoreModule } from './collection/columnScore/columnScore.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: `mongodb+srv://edu_admin:TsxsDUtDhgZPkEJA@edu.di1crza.mongodb.net/?retryWrites=true&w=majority`,
      database: 'edu',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [
        User,
        Class,
        Tag,
        Media,
        Question,
        Attendance,
        Exam,
        ExamClass,
        Assignment,
        ColumnScore,
      ],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
      introspection: true,
      cache: 'bounded',
      cors: {
        origin: true,
        credentials: true,
      },
      context: ({ req, res }) => ({ req, res }),
    }),
    UserModule,
    ClassModule,
    AuthModule,
    TagModule,
    MediaModule,
    QuestionModule,
    ExamModule,
    AttendanceModule,
    AssignmentModule,
    ExamClassModule,
    ColumnScoreModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GqlGuard,
    },
  ],
})
export class AppModule {}
