"use server";

import { ResidentType } from "@/@types/resident";
import { InternalServerError } from "@/lib/errors";
import { db } from "@/server/db";
import { residentSchema } from "@/server/db/schema";

export async function CreateResident({ resident }: { resident: ResidentType }) {
  try {
    await db.insert(residentSchema).values(resident);
  } catch {
    throw new InternalServerError();
  }
}
