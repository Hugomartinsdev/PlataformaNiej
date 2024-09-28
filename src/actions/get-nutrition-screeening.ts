"use server";

import { NursingTriageType } from "@/@types/nursing-triage";
import {
  InternalServerError,
  UnauthorizedError,
  UserNotFoundError,
} from "@/lib/errors";
import { db } from "@/server/db";
import { nutritionScreeningSchema } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function GetNutritionScreening(id: string) {
  if (!id) {
    throw new UnauthorizedError();
  }

  const nutritionScreeningQuery = await db
    .select()
    .from(nutritionScreeningSchema)
    .where(eq(nutritionScreeningSchema.id, id));

  if (!nutritionScreeningQuery) {
    throw new UserNotFoundError();
  }

  if (nutritionScreeningQuery.length === 0) {
    throw new UserNotFoundError();
  }

  const nutritionScreening = nutritionScreeningQuery[0];

  return nutritionScreening;
}
