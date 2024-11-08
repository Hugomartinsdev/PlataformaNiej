"use server";

import { USER_TOKEN } from "@/lib/constants";
import {
  InternalServerError,
  PasswordError,
  UserNotFoundError,
} from "@/lib/errors";
import { db } from "@/server/db";
import { createToken } from "@/server/jwt";

import { verify } from "argon2";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function SignIn(email: string, password: string) {//https://plataforma-niej-mu.vercel.app/api
  const response = await fetch("https://plataforma-niej-mu.vercel.app/api", {//https://plataforma-lotus-mu.vercel.app/api
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new InternalServerError();
  }

  const token = await response.json();

  cookies().set(USER_TOKEN, token.token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 3, // 3 days
  });

  // const user = await db.query.userSchema.findFirst({
  //   where(fields, { eq }) {
  //     return eq(fields.email, email);
  //   },
  // });

  // if (!user) {
  //   throw new UserNotFoundError();
  // }

  // const isPasswordCorrect = await verify(user.password, password);

  // if (!isPasswordCorrect) {
  //   throw new PasswordError();
  // }

  // const token = await createToken({
  //   sub: user.id,
  //   email: user.email,
  //   name: user.name,
  //   role: user.role,
  // });

  // cookies().set(USER_TOKEN, token, {
  //   httpOnly: true,
  //   secure: true,
  //   sameSite: "strict",
  //   maxAge: 60 * 60 * 24 * 3, // 3 days
  // });

  redirect("/plataforma");
}
