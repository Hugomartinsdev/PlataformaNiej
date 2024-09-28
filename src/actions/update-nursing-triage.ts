"use server";

import { NursingTriageType } from "@/@types/nursing-triage";
import { InternalServerError } from "@/lib/errors";
import { db } from "@/server/db";
import { nursingTriageSchema } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function UpdateNursingTriage({
  nursingTriage,
}: {
  nursingTriage: NursingTriageType;
}) {
  if (!nursingTriage.id) {
    throw new InternalServerError();
  }

  try {
    await db
      .update(nursingTriageSchema)
      .set(nursingTriage)
      .where(eq(nursingTriageSchema.id, nursingTriage.id));
  } catch (error) {
    throw new InternalServerError();
  }
}
