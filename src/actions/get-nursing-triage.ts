"use server";

import { NursingTriageType } from "@/@types/nursing-triage";
import {
  InternalServerError,
  UnauthorizedError,
  UserNotFoundError,
} from "@/lib/errors";
import { db } from "@/server/db";
import { nursingTriageSchema } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function GetNursingTriage(id: string) {
  if (!id) {
    throw new UnauthorizedError();
  }

  const nursingTriageQuery = await db
    .select()
    .from(nursingTriageSchema)
    .where(eq(nursingTriageSchema.id, id));

  if (!nursingTriageQuery) {
    throw new UserNotFoundError();
  }

  if (nursingTriageQuery.length === 0) {
    throw new UserNotFoundError();
  }

  const nursingTriage = nursingTriageQuery[0];

  return nursingTriage;
}
