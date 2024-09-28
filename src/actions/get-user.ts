"use server";

import { USER_TOKEN } from "@/lib/constants";
import { UnauthorizedError, UserNotFoundError } from "@/lib/errors";
import { db } from "@/server/db";
import { decodeToken } from "@/server/jwt";

import { cookies } from "next/headers";

export async function getUser() {
  const token = cookies().get(USER_TOKEN);

  if (!token) {
    throw new UnauthorizedError();
  }

  const { sub } = decodeToken(token.value);

  const user = await db.query.userSchema.findFirst({
    where(fields, { eq }) {
      return eq(fields.id, sub);
    },
  });

  if (!user) {
    throw new UserNotFoundError();
  }

  return user;
}
