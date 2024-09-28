import type { JwtPayload, UserInfo } from "@/@types/jwt";
import z from "zod";
import jwt from "jsonwebtoken";

export class AuthError extends Error {}

export const UserValidation = z.object({
  email: z.string().email(),
});

export const decodeToken = (token: string): JwtPayload => {
  return jwt.decode(token) as JwtPayload;
};
