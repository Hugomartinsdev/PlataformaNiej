"use server";

import { MedicalCareType } from "@/@types/medical-care";
import {
  InternalServerError,
  UnauthorizedError,
  UserNotFoundError,
} from "@/lib/errors";
import { db } from "@/server/db";
import { medicalCareSchema, nursingTriageSchema } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function GetMedicalCare(id: string) {
  if (!id) {
    throw new UnauthorizedError();
  }

  const GetMedicalCareQuery = await db
    .select()
    .from(medicalCareSchema)
    .where(eq(medicalCareSchema.id, id));

  if (!GetMedicalCareQuery) {
    throw new UserNotFoundError();
  }

  if (GetMedicalCareQuery.length === 0) {
    throw new UserNotFoundError();
  }

  const medicalCare = GetMedicalCareQuery[0];

  return medicalCare;
}
