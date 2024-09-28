"use server";

import { db } from "@/server/db";
import { userSchema } from "@/server/db/schema";
import { hash } from "argon2";

type SignUpType = {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
};

export async function SignUp({ name, email, password, role }: SignUpType) {
  try {
    const passwordHash = await hash(password);

    await db.insert(userSchema).values({
      name,
      email,
      password: passwordHash,
      role,
    });
  } catch (error) {
    console.error(error);
  }
}
