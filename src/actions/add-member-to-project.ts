"use server";

import { USER_TOKEN } from "@/lib/constants";
import { InternalServerError, UnauthorizedError } from "@/lib/errors";
import { db } from "@/server/db";
import { projectMembers, projectsSchema } from "@/server/db/schema";
import { decodeToken } from "@/server/jwt";
import { cookies } from "next/headers";

export async function AddMemberToProject(projectId: string, userId: string) {
  const token = cookies().get(USER_TOKEN);
  console.log("Adding member to project");

  if (!token) {
    throw new UnauthorizedError();
  }

  const { role: roleToken } = decodeToken(token.value);

  if (roleToken !== "admin") {
    throw new UnauthorizedError();
  }

  console.log("Adding member to project");

  try {
    await db.insert(projectMembers).values({
      projectId,
      userId,
    });
  } catch {
    // throw new InternalServerError();
  }
}
