import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassService } from './class.service';
import { Class } from './class.entity';
import { ClassResolver } from './class.resolver';
import { UserModule } from '../user/user.module';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Class, User]), UserModule],
  providers: [ClassResolver, ClassService],
  exports: [ClassService]
})
export class ClassModule {}
