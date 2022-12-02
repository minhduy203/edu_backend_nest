import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from '../class/class.entity';
import { ClassModule } from '../class/class.module';
import { UserModule } from '../user/user.module';
import { Group } from './group.entity';
import { GroupResolver } from './group.resolver';
import { GroupService } from './group.service';

@Module({
  imports: [TypeOrmModule.forFeature([Group, Class]), ClassModule, UserModule],
  providers: [GroupService, GroupResolver],
})
export class GroupModule {}
