"use server";

import { MedicalCareType } from "@/@types/medical-care";
import { NursingTriageType } from "@/@types/nursing-triage";
import { InternalServerError } from "@/lib/errors";
import { db } from "@/server/db";
import {
  dentalEvaluation,
  medicalCareSchema,
  medicalEvaluation,
} from "@/server/db/schema";

export async function CreateOdonto({ odonto }: { odonto: any }) {
  try {
    await db.insert(dentalEvaluation).values(odonto);
  } catch {
    throw new InternalServerError();
  }
}
