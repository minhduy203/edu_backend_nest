import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { UserModule } from '../user/user.module';
import { Attandance } from './attandance.entity';
import { AttandanceResolver } from './attandance.resolver';
import { AttandanceService } from './attandance.service';
// import { UserResolver } from './user.resolver';
// import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Attandance, User]), UserModule],
  providers: [AttandanceResolver, AttandanceService],
  exports: [AttandanceService],
})
export class AttandanceModule {}
