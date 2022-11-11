import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from '../class/class.entity';
import { ClassModule } from '../class/class.module';
import { ClassService } from '../class/class.service';
import { User } from './user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Class])],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
