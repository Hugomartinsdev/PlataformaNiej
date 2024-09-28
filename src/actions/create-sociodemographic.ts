"use server";

import { PsychologyTriageType } from "@/@types/psychology-triage";
import { sociodemographicQuestionnaireType } from "@/@types/sociodemographic-questionnaire";
import { InternalServerError } from "@/lib/errors";
import { db } from "@/server/db";
import { sociodemographicQuestionnaireSchema } from "@/server/db/schema";

export async function CreateSociodemographi({
  sociodemographic,
}: {
  sociodemographic: sociodemographicQuestionnaireType;
}) {
  try {
    await db
      .insert(sociodemographicQuestionnaireSchema)
      .values(sociodemographic);
  } catch {
    throw new InternalServerError();
  }
}
