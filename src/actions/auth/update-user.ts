"use server";

import { USER_TOKEN } from "@/lib/constants";
import { UnauthorizedError } from "@/lib/errors";
import { db } from "@/server/db";
import { userSchema } from "@/server/db/schema";
import { decodeToken } from "@/server/jwt";
import { hash } from "argon2";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

type SignUpType = {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: "user" | "admin";
};

export async function UpdateUser({
  id,
  name,
  email,
  password,
  role,
}: SignUpType) {
  const token = cookies().get(USER_TOKEN);

  if (!token) {
    throw new UnauthorizedError();
  }

  const { role: roleToken } = decodeToken(token.value);

  if (roleToken !== "admin") {
    throw new UnauthorizedError();
  }

  try {
    const passwordHash = await hash(password ?? "");

    await db
      .update(userSchema)
      .set({
        name,
        email,
        ...(password && { password: passwordHash }),
        role,
      })
      .where(eq(userSchema.id, id));
  } catch (error) {
    console.error(error);
  }
}
