import { JwtPayload } from "jsonwebtoken";
import { ObjectID } from "typeorm";

export type UserAuthPayload = JwtPayload & {
  _id: ObjectID;
  token_version: number;
};
