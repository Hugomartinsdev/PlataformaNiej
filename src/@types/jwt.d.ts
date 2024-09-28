export type JwtPayloadBase = {
  iat: number;
  exp: number;
};

export type UserInfo = {
  name: string;
  email: string;
  role: "admin" | "user";
  sub: string;
};

export type JwtPayload = JwtPayloadBase & UserInfo;
