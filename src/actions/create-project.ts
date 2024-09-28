"use server";

import { USER_TOKEN } from "@/lib/constants";
import { InternalServerError, UnauthorizedError } from "@/lib/errors";
import { db } from "@/server/db";
import { projectsSchema } from "@/server/db/schema";
import { decodeToken } from "@/server/jwt";
import { cookies } from "next/headers";

export async function CreateProject({ name }: { name: string }) {
  const token = cookies().get(USER_TOKEN);

  if (!token) {
    throw new UnauthorizedError();
  }

  const { role: roleToken } = decodeToken(token.value);

  if (roleToken !== "admin") {
    throw new UnauthorizedError();
  }

  try {
    await db.insert(projectsSchema).values({
      name,
    });
  } catch (error) {
    throw new InternalServerError();
  }
}
