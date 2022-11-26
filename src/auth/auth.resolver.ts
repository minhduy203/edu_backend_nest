import { ForbiddenException } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { UserService } from 'src/collection/user/user.service';
import { UserType } from 'src/collection/user/user.type';
import { getCookie } from 'src/common/utils/helper';
import { JwtPayload } from 'src/type';
import { User } from '../collection/user/user.entity';
import { GetCurrentUser, GetRequest, Public } from '../common/decorators';
import { LoginInput, RegisterInput } from './auth.input';
import { AuthService } from './auth.service';
import { TokenAndUser } from './auth.type';

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  @Query((_returns) => UserType)
  me(@GetCurrentUser() user: User) {
    return this.authService.me(user);
  }

  @Public()
  @Mutation((_returns) => UserType)
  async register(@Args('registerInput') registerInput: RegisterInput) {
    const { email, password, username, role } = registerInput;
    const firstName = username.split(' ').slice(0, -1).join(' ');
    const lastName = username.split(' ').slice(-1).join(' ');

    if (!email || !password || !username) {
      throw new Error('Require email and password');
    }

    const hashedPassword = await argon2.hash(password);

    const user = await this.userService.createUser({
      firstName,
      lastName,
      role,
      email,
      password: hashedPassword,
    });

    return user;
  }

  @Public()
  @Mutation((_returns) => TokenAndUser)
  async login(@Args('loginInput') loginInput: LoginInput, @Context() context) {
    const { email, password } = loginInput;
    const user = await this.userService.findByEmail(email);

    if (!user) throw new ForbiddenException('Access Denied');

    const passwordMatches = await argon2.verify(user.password, password);
    if (!passwordMatches) throw new ForbiddenException('Access Denied 2');

    const { accessToken, refreshToken } = await this.authService.getTokens(
      user.id,
      user.email,
      user.token_version,
    );
    // await this.updateRtHash(user.id, tokens.refreshToken);

    context.res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/graphql',
    });

    return {
      accessToken,
      refreshToken,
      user,
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
