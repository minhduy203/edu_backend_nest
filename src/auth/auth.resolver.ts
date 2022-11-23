import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { UserType } from 'src/collection/user/user.type';
import { getCookie } from 'src/common/utils/helper';
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
  @Mutation((_returns) => TokenType)
  register(@Args('registerInput') registerInput: RegisterInput) {
    return this.authService.register(registerInput);
  }

  @Public()
  @Mutation((_returns) => TokenAndUser)
  async login(@Args('loginInput') loginInput: LoginInput, @Context() context) {
    console.log('context', context.req);
    const { accessToken, refreshToken } = await this.authService.login(
      loginInput,
    );

    const info = await this.authService.getMeByEmail(loginInput?.email);

    context.res.cookie('refreshToken', refreshToken, {
      // httpOnly: true,
      // secure: true,
      // sameSite: 'lax',
      // path: '/refresh_token',
    });

    return {
      accessToken,
      refreshToken,
      user: info,
    };
  }

  @Mutation((_returns) => Boolean)
  logout(@GetCurrentUser() user: User) {
    return this.authService.logout(user.id);
  }

  @Public()
  @Query((_retuns) => TokenType)
  refreshToken(@GetRequest() req) {
    const refreshToken = getCookie(req.headers.cookie, 'refreshToken');
    // const { status } = res;
    // if (!refreshToken) throw new Error('RefreshToken not found');

    console.log('refreshTokens', refreshToken);
    // const decodedUser = this.jwtService.verify(refreshToken, {
    //   secret: 'RT_SECRET',
    // });

    // console.log('decodedUser', decodedUser);
    // const existingUser = AuthService.me();

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
