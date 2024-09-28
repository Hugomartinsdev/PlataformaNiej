import { USER_TOKEN } from "@/lib/constants";
import { PasswordError, UserNotFoundError } from "@/lib/errors";
import { db } from "@/server/db";
import { createToken } from "@/server/jwt/create-jwt";

import { verify } from "argon2";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export async function POST(request: NextRequest) {
  const requestBody = await request.json();

  const user = await db.query.userSchema.findFirst({
    where(fields, { eq }) {
      return eq(fields.email, requestBody.email);
    },
  });

  if (!user) {
    throw new UserNotFoundError();
  }

  const isPasswordCorrect = await verify(user.password, requestBody.password);

  if (!isPasswordCorrect) {
    throw new PasswordError();
  }

  const token = await createToken({
    sub: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  });

  return NextResponse.json({
    token: token,
  });
}
