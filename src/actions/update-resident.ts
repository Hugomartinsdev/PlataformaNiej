"use server";

import { ResidentType } from "@/@types/resident";
import { InternalServerError } from "@/lib/errors";
import { db } from "@/server/db";
import { residentSchema } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function UpdateResident({ resident }: { resident: ResidentType }) {
  if (!resident.id) {
    throw new InternalServerError();
  }

  try {
    await db
      .update(residentSchema)
      .set(resident)
      .where(eq(residentSchema.id, resident.id));
  } catch (error) {
    throw new InternalServerError();
  }
}
