"use server";

import {
  InternalServerError,
  UnauthorizedError,
  UserNotFoundError,
} from "@/lib/errors";
import { db } from "@/server/db";
import { psychologyTriageSchema } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { PsychologyTriageType } from "@/@types/psychology-triage";
import { sociodemographicQuestionnaireType } from "@/@types/sociodemographic-questionnaire";
import { sociodemographicQuestionnaireSchema } from "@/server/db/schema";

export async function GetSociodemographicQuestionnaire(id: string) {
  if (!id) {
    throw new UnauthorizedError();
  }

  const sociodemographicQuestionnaireQuery = await db
    .select()
    .from(sociodemographicQuestionnaireSchema)
    .where(eq(sociodemographicQuestionnaireSchema.id, id));

  if (!sociodemographicQuestionnaireQuery) {
    throw new UserNotFoundError();
  }

  if (sociodemographicQuestionnaireQuery.length === 0) {
    throw new UserNotFoundError();
  }

  const sociodemographicQuestionnaire = sociodemographicQuestionnaireQuery[0];

  return sociodemographicQuestionnaire;
}
