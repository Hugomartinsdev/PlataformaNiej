"use server";

import { NutritionScreeeningType } from "@/@types/nutririon-screeening";
import { PsychologyTriageType } from "@/@types/psychology-triage";
import { InternalServerError } from "@/lib/errors";
import { db } from "@/server/db";
import { nutritionScreeningSchema } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function UpdateNutritionScreeening({
  nutritionScreening,
}: {
  nutritionScreening: NutritionScreeeningType;
}) {
  if (!nutritionScreening.id) {
    throw new InternalServerError();
  }

  try {
    await db
      .update(nutritionScreeningSchema)
      .set(nutritionScreening)
      .where(eq(nutritionScreeningSchema.id, nutritionScreening.id));
  } catch (error) {
    throw new InternalServerError();
  }
}
