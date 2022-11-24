export type JwtPayload = {
  sub: string;
  email: string;
  token_version?: number;
};
