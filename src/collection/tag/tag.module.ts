import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { UserModule } from '../user/user.module';
import { Tag } from './tag.entity';
import { TagResolver } from './tag.resolver';
import { TagService } from './tag.service';
// import { UserResolver } from './user.resolver';
// import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tag, User]), UserModule],
  providers: [TagResolver, TagService],
  exports: [TagService],
})
export class TagModule {}
