import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Tokens } from '../type/Tokens';
import { JwtPayload } from '../type/JwtPayload';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../collection/user/user.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import * as argon2 from 'argon2';
import { LoginInput, RegisterInput } from './auth.input';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerInput: RegisterInput): Promise<Tokens> {
    const { email, password } = registerInput;
    const hashedPassword = await argon2.hash(password);
    const user = this.userRepository.create({
      id: uuid(),
      email,
      password: hashedPassword,
    });

    await this.userRepository.save(user);

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refreshToken);

    return tokens;
  }

  async login(loginInput: LoginInput): Promise<Tokens> {
    const { email, password } = loginInput;
    const user = await this.userRepository.findOneBy({ email });

    if (!user) throw new ForbiddenException('Access Denied');

    const passwordMatches = await argon2.verify(user.password, password);
    if (!passwordMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refreshToken);

    return tokens;
  }

  async logout(userId: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
        token_hash: Not(IsNull()),
      },
    });

    user.token_hash = null;

    return true;
  }

  async refreshTokens(userId: string, rt: string): Promise<Tokens> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user || !user.token_hash)
      throw new ForbiddenException('Access Denied');

    const rtMatches = await argon2.verify(user.token_hash, rt);
    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refreshToken);

    return tokens;
  }

  async updateRtHash(userId: string, rt: string): Promise<void> {
    const hash = await argon2.hash(rt);
    // const user = await this.userRepository.findOneBy({ id: userId });

    await this.userRepository.update({ id: userId }, { token_hash: hash });
  }

  async getTokens(userId: string, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email: email,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: 'AT_SECRET',
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: 'RT_SECRET',
        expiresIn: '7d',
      }),
    ]);

    return {
      accessToken: at,
      refreshToken: rt,
    };
  }
}
