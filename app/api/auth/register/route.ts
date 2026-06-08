import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createToken, setSessionCookie } from "@/lib/session";
import { checkRateLimit, rateLimitKey } from "@/lib/rate-limit";
import bcrypt from "bcryptjs";

export const dynamic = "force-dynamic";

// 5 cadastros por hora por IP
const LIMIT = 5;
const WINDOW_MS = 60 * 60 * 1000;

export async function POST(request: Request) {
  const rl = checkRateLimit(rateLimitKey("register", request), LIMIT, WINDOW_MS);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: `Muitas tentativas. Tente novamente em ${rl.retryAfterSec}s.` },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } }
    );
  }

  try {
    const { name, email, password } = await request.json();

    if (!email || !password || password.length < 8) {
      return NextResponse.json(
        { error: "Dados inválidos. Senha mínima: 8 caracteres." },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();
    const existing = await prisma.user.findUnique({ where: { email: cleanEmail } });
    if (existing) {
      return NextResponse.json({ error: "E-mail já cadastrado" }, { status: 409 });
    }

    const hash = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { name: name?.trim() || null, email: cleanEmail, password: hash },
    });

    const token = await createToken({ id: user.id, email: user.email, name: user.name ?? null });
    const response = NextResponse.json({ id: user.id, email: user.email });
    setSessionCookie(response, token);

    return response;
  } catch {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
