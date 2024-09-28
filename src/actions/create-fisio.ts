"use server";

import { MedicalCareType } from "@/@types/medical-care";
import { NursingTriageType } from "@/@types/nursing-triage";
import { InternalServerError } from "@/lib/errors";
import { db } from "@/server/db";
import { medicalCareSchema, medicalEvaluation } from "@/server/db/schema";

export async function CreateFisio({ fisio }: { fisio: any }) {
  try {
    await db.insert(medicalEvaluation).values(fisio);
  } catch {
    throw new InternalServerError();
  }
}
