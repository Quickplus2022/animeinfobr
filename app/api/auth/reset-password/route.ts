import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";

const SITE_URL = process.env.NEXTAUTH_URL ?? "https://www.animeinfobr.com.br";

// POST /api/auth/reset-password — solicitar reset
// POST /api/auth/reset-password?action=confirm — confirmar nova senha
export async function POST(request: Request) {
  const url = new URL(request.url);
  const action = url.searchParams.get("action");

  if (action === "confirm") {
    const { token, password } = await request.json();
    if (!token || !password || password.length < 6) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    }

    const record = await prisma.passwordResetToken.findUnique({ where: { token } });
    if (!record || record.used || record.expiresAt < new Date()) {
      return NextResponse.json({ error: "Link inválido ou expirado" }, { status: 400 });
    }

    const hash = await bcrypt.hash(password, 12);
    await prisma.user.update({ where: { email: record.email }, data: { password: hash } });
    await prisma.passwordResetToken.update({ where: { id: record.id }, data: { used: true } });

    return NextResponse.json({ success: true });
  }

  // Default: request reset
  const { email } = await request.json();
  if (!email) return NextResponse.json({ error: "Email obrigatório" }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { email: email.toLowerCase().trim() } });
  // Always return success (don't leak if email exists)
  if (!user) return NextResponse.json({ success: true });

  const token = randomBytes(48).toString("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

  await prisma.passwordResetToken.create({ data: { email: user.email, token, expiresAt } });

  const resetLink = `${SITE_URL}/redefinir-senha?token=${token}`;

  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: "AnimeInfoBR <no-reply@animeinfobr.com.br>",
    to: user.email,
    subject: "Redefinição de senha — AnimeInfoBR",
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto;background:#0d1424;color:#f1f5f9;padding:32px;border-radius:16px">
        <h2 style="color:#a855f7;margin-bottom:8px">🔑 Redefinir Senha</h2>
        <p>Olá, ${user.name || "otaku"}!</p>
        <p>Recebemos um pedido para redefinir a senha da sua conta no <strong>AnimeInfoBR</strong>.</p>
        <p>Clique no botão abaixo (válido por 1 hora):</p>
        <a href="${resetLink}" style="display:inline-block;margin:16px 0;padding:12px 24px;background:linear-gradient(135deg,#7c3aed,#2563eb);color:white;text-decoration:none;border-radius:12px;font-weight:bold">
          Redefinir Senha
        </a>
        <p style="color:#94a3b8;font-size:12px">Se você não solicitou isso, ignore este e-mail. Sua senha não será alterada.</p>
      </div>
    `,
  });

  return NextResponse.json({ success: true });
}
