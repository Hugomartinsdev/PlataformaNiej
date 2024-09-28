"use server";

import { InternalServerError } from "@/lib/errors";
import { db } from "@/server/db";
import { dentalEvaluation } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function UpdateOdonto({
  odonto,
}: {
  odonto: any;
}) {
  if (!odonto.id) {
    throw new InternalServerError();
  }

  try {
    await db
      .update(dentalEvaluation)
      .set(odonto)
      .where(eq(dentalEvaluation.id, odonto.id));
  } catch (error) {
    throw new InternalServerError();
  }
}
