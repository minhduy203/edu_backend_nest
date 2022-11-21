import { Headers, Req, Request } from '@nestjs/common';
import {
  Args,
  Context,
  GraphQLExecutionContext,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { UserType } from 'src/collection/user/user.type';
import { User } from '../collection/user/user.entity';
import { GetCurrentUser, GetRequest, Public } from '../common/decorators';
import { LoginInput, RegisterInput } from './auth.input';
import { AuthService } from './auth.service';
import { TokenType } from './auth.type';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query((_returns) => UserType)
  me(@GetCurrentUser() user: User) {
    return this.authService.me(user);
  }

  @Public()
  @Mutation((_returns) => TokenType)
  register(@Args('registerInput') registerInput: RegisterInput) {
    return this.authService.register(registerInput);
  }

  @Public()
  @Mutation((_returns) => TokenType)
  login(@Args('loginInput') loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }

  @Mutation((_returns) => Boolean)
  logout(@GetCurrentUser() user: User) {
    return this.authService.logout(user.id);
  }

  @Public()
  @Query((_retuns) => TokenType)
  refreshToken(@GetRequest() req) {
    // const { status } = res;
    console.log('context', req.headers.authorization);
    return {
      accessToken: 'Asdsad',
      refreshToken: 'csacas',
    };
  }

  // @Public()
  // @UseGuards(RtGuard)
  // @Mutation((_returns) => TokenType)
  // refreshTokens(
  //   @GetCurrentUserId() userId: string,
  //   @GetCurrentUser('refreshToken') refreshToken: string,
  // ) {
  //   return this.authService.refreshTokens(userId, refreshToken);
  // }
}
