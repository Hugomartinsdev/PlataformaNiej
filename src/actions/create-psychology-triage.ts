"use server";

import { PsychologyTriageType } from "@/@types/psychology-triage";
import { InternalServerError } from "@/lib/errors";
import { db } from "@/server/db";
import { psychologyTriageSchema } from "@/server/db/schema";

export async function CreatePsychologyTriage({
  psychologyTriage,
}: {
  psychologyTriage: PsychologyTriageType;
}) {
  try {
    await db.insert(psychologyTriageSchema).values(psychologyTriage);
  } catch {
    throw new InternalServerError();
  }
}
