import { UserInfo } from "@/@types/jwt";
import { env } from "@/env";
import jwt from "jsonwebtoken";

export const createToken = async (payload: UserInfo) => {
  const token = jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: "3d",
  });

  return token;
};
