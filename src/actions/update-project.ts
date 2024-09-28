"use server";

import { USER_TOKEN } from "@/lib/constants";
import { InternalServerError, UnauthorizedError } from "@/lib/errors";
import { db } from "@/server/db";
import { projectsSchema } from "@/server/db/schema";
import { decodeToken } from "@/server/jwt";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

export async function UpdateProject({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const token = cookies().get(USER_TOKEN);

  if (!token) {
    throw new UnauthorizedError();
  }

  const { role: roleToken } = decodeToken(token.value);

  if (roleToken !== "admin") {
    throw new UnauthorizedError();
  }

  try {
    await db
      .update(projectsSchema)
      .set({
        name,
      })
      .where(eq(projectsSchema.id, id));
  } catch (error) {
    throw new InternalServerError();
  }
}
