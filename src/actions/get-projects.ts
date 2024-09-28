"use server";

import { db } from "@/server/db";
import { projectMembers, projectsSchema, userSchema } from "@/server/db/schema";
import { eq, sql } from "drizzle-orm";

export async function getProjects() {
  const projectsWithUsers = await db
    .select({
      id: projectsSchema.id,
      name: projectsSchema.name,
      description: projectsSchema.description,
      logo: projectsSchema.logo,
      banner: projectsSchema.banner,
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
    .from(projectsSchema)
    .leftJoin(projectMembers, eq(projectsSchema.id, projectMembers.projectId))
    .leftJoin(userSchema, eq(projectMembers.userId, userSchema.id))
    .groupBy(projectsSchema.id);

  return projectsWithUsers;
}
