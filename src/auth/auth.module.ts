import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../collection/user/user.entity';
import { AtStrategy, RtStrategy } from '../strategies';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  imports: [JwtModule.register({}), TypeOrmModule.forFeature([User])],
  providers: [AuthService, AuthResolver, AtStrategy, RtStrategy],
})
export class AuthModule {}
