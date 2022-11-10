import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassService } from './class.service';
import { Class } from './class.entity';
import { ClassResolver } from './class.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Class])],
  providers: [ClassResolver, ClassService],
})
export class ClassModule {}
