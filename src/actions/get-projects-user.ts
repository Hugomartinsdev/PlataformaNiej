"use server";

import { eq, sql } from "drizzle-orm";
import { db } from "@/server/db";
import { projectsSchema, projectMembers, userSchema } from "@/server/db/schema";
import { cookies } from "next/headers";
import { USER_TOKEN } from "@/lib/constants";
import { UnauthorizedError } from "@/lib/errors";
import { decodeToken } from "@/server/jwt";

export async function getProjectsUser() {
  const token = cookies().get(USER_TOKEN);

  if (!token) {
    throw new UnauthorizedError();
  }

  const { sub } = decodeToken(token.value);

  const userProjects = await db
    .select({
      id: projectsSchema.id,
      name: projectsSchema.name,
      description: projectsSchema.description,
      logo: projectsSchema.logo,
      banner: projectsSchema.banner,
      userRole: projectMembers.role,
      members: sql<string>`JSON_AGG(
        JSON_BUILD_OBJECT(
          'id', ${userSchema.id},
          'name', ${userSchema.name},
          'email', ${userSchema.email},
          'avatar', ${userSchema.avatar},
          'role', ${userSchema.role},
          'memberRole', ${projectMembers.role}
        )
      )`.as("members"),
    })
    .from(projectMembers)
    .innerJoin(projectsSchema, eq(projectMembers.projectId, projectsSchema.id))
    .leftJoin(userSchema, eq(projectMembers.userId, userSchema.id))
    .where(eq(projectMembers.userId, sub))
    .groupBy(projectsSchema.id, projectMembers.role);

  return userProjects;
}
