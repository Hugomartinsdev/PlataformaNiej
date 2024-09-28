"use server";

import { NursingTriageType } from "@/@types/nursing-triage";
import { InternalServerError } from "@/lib/errors";
import { db } from "@/server/db";
import { nursingTriageSchema } from "@/server/db/schema";

export async function CreateNursingTriage({
  nursingTriage,
}: {
  nursingTriage: NursingTriageType;
}) {
  try {
    await db.insert(nursingTriageSchema).values(nursingTriage);
  } catch {
    throw new InternalServerError();
  }
}
