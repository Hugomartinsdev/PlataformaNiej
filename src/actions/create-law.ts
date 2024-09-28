"use server";

import { MedicalCareType } from "@/@types/medical-care";
import { NursingTriageType } from "@/@types/nursing-triage";
import { InternalServerError } from "@/lib/errors";
import { db } from "@/server/db";
import {
  lawSchema,
  medicalCareSchema,
  medicalEvaluation,
} from "@/server/db/schema";

export async function CreateLaw({ law }: { law: any }) {
  try {
    await db.insert(lawSchema).values(law);
  } catch {
    throw new InternalServerError();
  }
}
