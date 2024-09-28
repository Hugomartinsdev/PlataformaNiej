"use server";

import { PsychologyTriageType } from "@/@types/psychology-triage";
import { InternalServerError } from "@/lib/errors";
import { db } from "@/server/db";
import { psychologyTriageSchema } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function UpdatePsychologyTriage({
  psychologyTriage,
}: {
  psychologyTriage: PsychologyTriageType;
}) {
  if (!psychologyTriage.id) {
    throw new InternalServerError();
  }

  try {
    await db
      .update(psychologyTriageSchema)
      .set(psychologyTriage)
      .where(eq(psychologyTriageSchema.id, psychologyTriage.id));
  } catch (error) {
    throw new InternalServerError();
  }
}
