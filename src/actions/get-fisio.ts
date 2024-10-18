"use server";

import {
  InternalServerError,
  UnauthorizedError,
  UserNotFoundError,
} from "@/lib/errors";
import { db } from "@/server/db";
import { medicalEvaluation } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { PsychologyTriageType } from "@/@types/psychology-triage";

export async function GetMedicalEvaluation(id: string) {
  if (!id) {
    throw new UnauthorizedError();
  }
  
  const medicalEvaluationQuery = await db
    .select()
    .from(medicalEvaluation)
    .where(eq(medicalEvaluation.id, id));

  if (!medicalEvaluationQuery) {
    throw new UserNotFoundError();
  }

  if (medicalEvaluationQuery.length === 0) {
    throw new UserNotFoundError();
  }

  const physiotherapy = medicalEvaluationQuery[0];

  return physiotherapy;
}
