import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import type { NextResponse } from "next/server";

export const COOKIE_NAME = "aibr_sess";

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 60 * 60 * 24 * 30,
  path: "/",
};

const rawSecret = process.env.JWT_SECRET;
if (!rawSecret && process.env.NODE_ENV === "production") {
  throw new Error("JWT_SECRET env var não definida em produção.");
}
const SECRET = new TextEncoder().encode(
  rawSecret ?? "AnimeInfoBR-dev-only-change-in-production"
);

export interface SessionUser {
  id: string;
  email: string;
  name: string | null;
}

export async function createToken(user: SessionUser): Promise<string> {
  return new SignJWT({ sub: user.id, email: user.email, name: user.name ?? "" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("30d")
    .setIssuedAt()
    .sign(SECRET);
}

// Used by server components / API routes that don't return a NextResponse
export async function createSession(user: SessionUser) {
  const token = await createToken(user);
  (await cookies()).set(COOKIE_NAME, token, COOKIE_OPTIONS);
}

export async function getSession(): Promise<{ user: SessionUser } | null> {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return {
      user: {
        id: payload.sub as string,
        email: payload.email as string,
        name: (payload.name as string) || null,
      },
    };
  } catch {
    return null;
  }
}

export async function clearSession() {
  (await cookies()).delete(COOKIE_NAME);
}

// Set cookie directly on a NextResponse (most reliable for Route Handlers)
export function setSessionCookie(response: NextResponse, token: string) {
  response.cookies.set(COOKIE_NAME, token, COOKIE_OPTIONS);
}

// Clear cookie directly on a NextResponse
export function clearSessionCookie(response: NextResponse) {
  response.cookies.set(COOKIE_NAME, "", { ...COOKIE_OPTIONS, maxAge: 0 });
}
