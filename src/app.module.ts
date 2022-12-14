import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Assignment } from './collection/assignment/assignment.entity';
import { AssignmentModule } from './collection/assignment/assignment.module';
import { Attendance } from './collection/attendance/attendance.entity';
import { AttendanceModule } from './collection/attendance/attendance.module';
import { Class } from './collection/class/class.entity';
import { ClassModule } from './collection/class/class.module';
import { ColumnScore } from './collection/columnScore/columnScore.entity';
import { ColumnScoreModule } from './collection/columnScore/columnScore.module';
import { ExamClass } from './collection/exam-class/exam-class.entity';
import { ExamClassModule } from './collection/exam-class/exam-class.module';
import { Exam } from './collection/exam/exam.entity';
import { ExamModule } from './collection/exam/exam.module';
import { Group } from './collection/group/group.entity';
import { GroupModule } from './collection/group/group.module';
import { Media } from './collection/media/media.entity';
import { MediaModule } from './collection/media/media.module';
import { Question } from './collection/question/question.entity';
import { QuestionModule } from './collection/question/question.module';
import { Schedule } from './collection/schedule/schedule.entity';
import { ScheduleModule } from './collection/schedule/schedule.module';
import { Tag } from './collection/tag/tag.entity';
import { TagModule } from './collection/tag/tag.module';
import { User } from './collection/user/user.entity';
import { UserModule } from './collection/user/user.module';
import { GqlGuard } from './common/guards';
import { AppGateway } from './gatewaies/app.gateway';

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
        Schedule,
        Exam,
        ExamClass,
        Assignment,
        ColumnScore,
        Attendance,
        Group,
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
    ScheduleModule,
    AssignmentModule,
    ExamClassModule,
    ColumnScoreModule,
    AttendanceModule,
    GroupModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GqlGuard,
    },
    // ChatGateway,
    AppGateway,
  ],
})
export class AppModule {}
