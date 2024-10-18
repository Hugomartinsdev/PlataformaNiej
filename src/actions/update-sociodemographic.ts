"use server";

import { MedicalCareType } from "@/@types/medical-care";
import { sociodemographicQuestionnaireType } from "@/@types/sociodemographic-questionnaire";
import { InternalServerError } from "@/lib/errors";
import { db } from "@/server/db";
import { medicalCareSchema } from "@/server/db/schema";
import { sociodemographicQuestionnaireSchema } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function UpdateSociodemographicQuestionnaire({
    sociodemographicQuestionnaire,
}: {
    sociodemographicQuestionnaire: sociodemographicQuestionnaireType;
}) {
  if (!sociodemographicQuestionnaire.id) {
    throw new InternalServerError();
  }

  try {
    await db
      .update(sociodemographicQuestionnaireSchema)
      .set(sociodemographicQuestionnaire)
      .where(eq(sociodemographicQuestionnaireSchema.id, sociodemographicQuestionnaire.id));
  } catch (error) {
    throw new InternalServerError();
  }
}
