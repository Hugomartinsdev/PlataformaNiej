"use server";

import { UnauthorizedError, UserNotFoundError } from "@/lib/errors";
import { db } from "@/server/db";
import { residentSchema } from "@/server/db/schema";

export async function getResidents() {
  const residents = await db.select().from(residentSchema);

  if (!residents) {
    throw new UserNotFoundError();
  }

  return residents;
}
