import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE = "aibr_sess";
const secret = () =>
  new TextEncoder().encode("AnimeInfoBR-JWT-2026-xZ9kQmPv3nRt7wYsUjLhFcBdAeGo");

export interface SessionUser {
  id: string;
  email: string;
  name: string | null;
}

export async function createSession(user: SessionUser) {
  const token = await new SignJWT({ sub: user.id, email: user.email, name: user.name ?? "" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("30d")
    .setIssuedAt()
    .sign(secret());

  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
}

export async function getSession(): Promise<{ user: SessionUser } | null> {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
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
  (await cookies()).delete(COOKIE);
}
