import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { UserModule } from '../user/user.module';
import { ColumnScore } from './columnScore.entity';
import { ColumnScoreResolver } from './columnScore.resolver';
import { ColumnScoreService } from './columnScore.service';
// import { UserResolver } from './user.resolver';
// import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([ColumnScore, User]), UserModule],
  providers: [ColumnScoreResolver, ColumnScoreService],
  exports: [ColumnScoreService],
})
export class ColumnScoreModule {}
