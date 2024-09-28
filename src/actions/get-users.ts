"use server";

import { db } from "@/server/db";
import { projectMembers, projectsSchema, userSchema } from "@/server/db/schema";
import { eq, sql } from "drizzle-orm";

export async function getUsers() {
  const usersWithProjects = await db
    .select({
      id: userSchema.id,
      name: userSchema.name,
      email: userSchema.email,
      avatar: userSchema.avatar,
      role: userSchema.role,
      projects: sql<string>`JSON_AGG(
         JSON_BUILD_OBJECT(
           'id', ${projectsSchema.id},
           'name', ${projectsSchema.name},
           'logo', ${projectsSchema.logo},
           'banner', ${projectsSchema.banner},
           'description', ${projectsSchema.description},
           'role', ${projectMembers.role}
         )
       )`.as("projects"),
    })
    .from(userSchema)
    .leftJoin(projectMembers, eq(userSchema.id, projectMembers.userId))
    .leftJoin(projectsSchema, eq(projectMembers.projectId, projectsSchema.id))
    .groupBy(userSchema.id);

  return usersWithProjects;
}
