import { Response } from 'express';
import { Secret, sign } from 'jsonwebtoken';
import { User } from '../collection/user/user.entity';

export const createToken = (type: 'accessToken' | 'refreshToken', user: User) =>
  sign(
    {
      _id: user._id,
      ...(type === 'refreshToken' ? { token_version: user.token_version } : {}),
    },
    type === 'accessToken'
      ? (process.env.ACCESS_TOKEN_SECRET as Secret)
      : (process.env.REFRESH_TOKEN_SECRET as Secret),
    {
      expiresIn: type === 'accessToken' ? '15m' : '30d',
    },
  );

export const sendRefreshToken = (res: Response, user: User) => {
  res.cookie('refreshToken', createToken('refreshToken', user), {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/refresh_token',
  });
};
