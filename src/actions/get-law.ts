"use server";

import { NursingTriageType } from "@/@types/nursing-triage";
import {
  InternalServerError,
  UnauthorizedError,
  UserNotFoundError,
} from "@/lib/errors";
import { db } from "@/server/db";
import { lawSchema } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function GetLaw(id: string) {
  if (!id) {
    throw new UnauthorizedError();
  }

  const lawQuery = await db
    .select()
    .from(lawSchema)
    .where(eq(lawSchema.id, id));

  if (!lawQuery) {
    throw new UserNotFoundError();
  }

  if (lawQuery.length === 0) {
    throw new UserNotFoundError();
  }

  const law = lawQuery[0];

  return law;
}
