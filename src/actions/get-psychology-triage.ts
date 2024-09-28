"use server";

import {
  InternalServerError,
  UnauthorizedError,
  UserNotFoundError,
} from "@/lib/errors";
import { db } from "@/server/db";
import { psychologyTriageSchema } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function GetPsychologyTriage(id: string) {
  if (!id) {
    throw new UnauthorizedError();
  }

  const psychologyTriageQuery = await db
    .select()
    .from(psychologyTriageSchema)
    .where(eq(psychologyTriageSchema.id, id));

  if (!psychologyTriageQuery) {
    throw new UserNotFoundError();
  }

  if (psychologyTriageQuery.length === 0) {
    throw new UserNotFoundError();
  }

  const psychologyTriage = psychologyTriageQuery[0];

  return psychologyTriage;
}
