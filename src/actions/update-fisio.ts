"use server";

import { MedicalCareType } from "@/@types/medical-care";
import { InternalServerError } from "@/lib/errors";
import { db } from "@/server/db";
import { medicalEvaluation } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function UpdatemedicalEvaluation({
    physiotherapy,
}: {
    physiotherapy: MedicalCareType;
}) {
  if (!physiotherapy.id) {
    throw new InternalServerError();
  }

  try {
    await db
      .update(medicalEvaluation)
      .set(physiotherapy)
      .where(eq(medicalEvaluation.id, physiotherapy.id));
  } catch (error) {
    throw new InternalServerError();
  }
}
