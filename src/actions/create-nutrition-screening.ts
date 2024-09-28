"use server";

import { NutritionScreeeningType } from "@/@types/nutririon-screeening";
import { PsychologyTriageType } from "@/@types/psychology-triage";
import { InternalServerError } from "@/lib/errors";
import { db } from "@/server/db";
import { nutritionScreeningSchema } from "@/server/db/schema";

export async function CreateNutritionScreening({
  nutritionScreening,
}: {
  nutritionScreening: NutritionScreeeningType;
}) {
  try {
    await db.insert(nutritionScreeningSchema).values(nutritionScreening);
  } catch {
    throw new InternalServerError();
  }
}
