"use server";

import {
  UnauthorizedError,
  UserNotFoundError
} from "@/lib/errors";
import { db } from "@/server/db";
import { dentalEvaluation } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function GetOdonto(id: string) {
  if (!id) {
    throw new UnauthorizedError();
  }

  const nursingTriageQuery = await db
    .select()
    .from(dentalEvaluation)
    .where(eq(dentalEvaluation.id, id));

  if (!nursingTriageQuery) {
    throw new UserNotFoundError();
  }

  if (nursingTriageQuery.length === 0) {
    throw new UserNotFoundError();
  }

  const nursingTriage = nursingTriageQuery[0];

  return nursingTriage;
}
