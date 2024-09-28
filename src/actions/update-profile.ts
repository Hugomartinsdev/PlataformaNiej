"use server";

import { UserType } from "@/@types/user";
import { USER_TOKEN } from "@/lib/constants";
import {
  InternalServerError,
  UnauthorizedError,
  UserNotFoundError,
} from "@/lib/errors";
import { db } from "@/server/db";
import { userSchema } from "@/server/db/schema";
import { decodeToken } from "@/server/jwt";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

export async function updateProfile(user: { name: string; email: string }) {
  const token = cookies().get(USER_TOKEN);

  if (!token) {
    throw new UnauthorizedError();
  }

  const { sub } = decodeToken(token.value);

  if (!sub) {
    throw new UserNotFoundError();
  }

  try {
    return await db
      .update(userSchema)
      .set({
        name: user.name,
        email: user.email,
      })
      .where(eq(userSchema.id, sub));
  } catch {
    throw new InternalServerError();
  }
}
