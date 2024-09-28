"use server";

import { USER_TOKEN } from "@/lib/constants";
import {
  InternalServerError,
  PasswordError,
  UnauthorizedError,
  UserNotFoundError,
} from "@/lib/errors";
import { db } from "@/server/db";
import { userSchema } from "@/server/db/schema";
import { decodeToken } from "@/server/jwt";
import { hash, verify } from "argon2";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

export async function ChangePassword(password: {
  oldPassword: string;
  newPassword: string;
}) {
  const token = cookies().get(USER_TOKEN);

  if (!token) {
    throw new UnauthorizedError();
  }

  const { sub } = decodeToken(token.value);

  if (!sub) {
    throw new UserNotFoundError();
  }

  const user = await db.query.userSchema.findFirst({
    where(fields, { eq }) {
      return eq(fields.id, sub);
    },
  });

  if (!user) {
    throw new UserNotFoundError();
  }

  const isPasswordCorrect = await verify(user.password, password.oldPassword);

  if (!isPasswordCorrect) {
    throw new PasswordError();
  }

  const passwordHash = await hash(password.newPassword);

  try {
    return await db
      .update(userSchema)
      .set({
        password: passwordHash,
      })
      .where(eq(userSchema.id, sub));
  } catch {
    throw new InternalServerError();
  }
}
