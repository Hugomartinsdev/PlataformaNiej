"use server";

import { MedicalCareType } from "@/@types/medical-care";
import {
  InternalServerError,
  UnauthorizedError,
  UserNotFoundError,
} from "@/lib/errors";
import { db } from "@/server/db";
import { medicalCareSchema} from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function GetMedicalCare(id: string) {
  if (!id) {
    throw new UnauthorizedError();
  }

  const MedicalCareQuery = await db
    .select()
    .from(medicalCareSchema)
    .where(eq(medicalCareSchema.id, id));

  if (!MedicalCareQuery) {
    throw new UserNotFoundError();
  }

  if (MedicalCareQuery.length === 0) {
    throw new UserNotFoundError();
  }

  const medicalCare = MedicalCareQuery[0];

  return medicalCare;
}
