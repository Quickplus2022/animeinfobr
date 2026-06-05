import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createToken, setSessionCookie } from "@/lib/session";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!email || !password || password.length < 6) {
      return NextResponse.json({ error: "Dados inválidos. Senha mínima: 6 caracteres." }, { status: 400 });
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
  } catch (err) {
    console.error("Register error:", err);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
