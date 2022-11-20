import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginInput, RegisterInput } from './auth.input';
import { AuthService } from './auth.service';
import { TokenType } from './auth.type';
import { GetCurrentUser, Public } from '../common/decorators';
import { User } from '../collection/user/user.entity';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

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
