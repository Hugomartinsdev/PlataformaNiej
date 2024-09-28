"use server";

import { UnauthorizedError, UserNotFoundError } from "@/lib/errors";
import { db } from "@/server/db";
import { residentSchema } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function getResident(id: string) {
  if (!id) {
    throw new UnauthorizedError();
  }

  const residentQuery = await db
    .select()
    .from(residentSchema)
    .where(eq(residentSchema.id, id));

  if (!residentQuery) {
    throw new UserNotFoundError();
  }

  if (residentQuery.length === 0) {
    throw new UserNotFoundError();
  }

  const resident = residentQuery[0];

  return resident;
}
