import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Tokens } from '../type';
import { JwtPayload } from '../type';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../collection/user/user.entity';
import { IsNull, Not, Repository } from 'typeorm';

import * as argon2 from 'argon2';
import { LoginInput, RegisterInput } from './auth.input';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async me(user): Promise<User> {
    const { sub } = user;
    const info = await this.userRepository.findOneBy({ id: sub });
    return info;
  }

  async register(user: RegisterInput): Promise<User> {
    const newUser = await this.userRepository.save(user);

    return newUser;
  }

  async login(loginInput: LoginInput): Promise<Tokens> {
    const { email, password } = loginInput;
    const user = await this.userRepository.findOneBy({ email });

    if (!user) throw new ForbiddenException('Access Denied');

    const passwordMatches = await argon2.verify(user.password, password);
    if (!passwordMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(
      user.id,
      user.email,
      user.token_version,
    );
    // await this.updateRtHash(user.id, tokens.refreshToken);

    return tokens;
  }

  async logout(userId: string): Promise<boolean> {
    const user = await this.userRepository.findOneBy({
      id: userId,
    });

    user.token_version = 0;

    await this.userRepository.save(user);
    return true;
  }

  async refreshTokens(userId: string, rt: string): Promise<Tokens> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user || !user.token_version)
      throw new ForbiddenException('Access Denied');

    // const rtMatches = await argon2.verify(user.token_hash, rt);
    // if (!rtMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(
      user.id,
      user.email,
      user.token_version,
    );
    // await this.updateRtHash(user.id, tokens.refreshToken);

    return tokens;
  }

  async updateTokenVersion(userId: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: userId });

    await this.userRepository.update(
      { id: userId },
      { token_version: ++user.token_version },
    );
  }

  async getTokens(
    userId: string,
    email: string,
    tokenVersion?: number,
  ): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email: email,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: 'AT_SECRET',
        expiresIn: '1d',
      }),
      this.jwtService.signAsync(
        { ...jwtPayload, token_version: tokenVersion },
        {
          secret: 'RT_SECRET',
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken: at,
      refreshToken: rt,
    };
  }
}
