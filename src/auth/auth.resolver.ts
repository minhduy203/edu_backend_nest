import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { UserType } from 'src/collection/user/user.type';
import { getCookie } from 'src/common/utils/helper';
import { JwtPayload } from 'src/type';
import { User } from '../collection/user/user.entity';
import { GetCurrentUser, GetRequest, Public } from '../common/decorators';
import { LoginInput, RegisterInput } from './auth.input';
import { AuthService } from './auth.service';
import { TokenAndUser, TokenType } from './auth.type';

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Query((_returns) => UserType)
  me(@GetCurrentUser() user: User) {
    return this.authService.me(user);
  }

  @Public()
  @Mutation((_returns) => UserType)
  register(@Args('registerInput') registerInput: RegisterInput) {
    return this.authService.register(registerInput);
  }

  @Public()
  @Mutation((_returns) => TokenAndUser)
  async login(@Args('loginInput') loginInput: LoginInput, @Context() context) {
    const { accessToken, refreshToken } = await this.authService.login(
      loginInput,
    );

    const info = await this.authService.getMeByEmail(loginInput?.email);

    context.res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/graphql',
    });

    return {
      accessToken,
      refreshToken,
      user: info,
    };
  }

  @Mutation((_returns) => Boolean)
  logout(@GetCurrentUser() user: JwtPayload) {
    return this.authService.logout(user.sub);
  }

  @Public()
  @Query((_retuns) => TokenAndUser)
  async refreshToken(@GetRequest() req, @Context() context) {
    const refreshToken = getCookie(req.headers.cookie, 'refreshToken');

    if (!refreshToken) throw new Error('RefreshToken not found');

    const decodedUser = this.jwtService.verify(refreshToken, {
      secret: 'RT_SECRET',
    });

    const existingUser = await this.authService.me(decodedUser);

    if (
      !existingUser ||
      decodedUser.token_version !== existingUser.token_version
    ) {
      throw new Error('Token invalid');
    }

    const tokens = await this.authService.getTokens(
      existingUser.id,
      existingUser.email,
      ++existingUser.token_version,
    );

    context.res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/graphql',
    });

    await this.authService.updateTokenVersion(existingUser.id);

    return {
      ...tokens,
      user: existingUser,
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
