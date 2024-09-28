"use server";

import { MedicalCareType } from "@/@types/medical-care";
import { NursingTriageType } from "@/@types/nursing-triage";
import { InternalServerError } from "@/lib/errors";
import { db } from "@/server/db";
import { medicalCareSchema } from "@/server/db/schema";

export async function CreateMedicalCare({
  medicalCare,
}: {
  medicalCare: MedicalCareType;
}) {
  try {
    await db.insert(medicalCareSchema).values(medicalCare);
  } catch {
    throw new InternalServerError();
  }
}
