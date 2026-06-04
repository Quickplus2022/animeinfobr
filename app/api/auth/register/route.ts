import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!email || !password || password.length < 6) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "E-mail já cadastrado" }, { status: 409 });
    }

    const hash = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { name: name?.trim() || null, email: email.toLowerCase().trim(), password: hash },
    });

    return NextResponse.json({ id: user.id, email: user.email });
  } catch {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
