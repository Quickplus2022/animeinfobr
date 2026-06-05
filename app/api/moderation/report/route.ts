import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const VALID_REASONS = ["spam", "ofensivo", "assedio", "conteudo_inapropriado", "outro"];

export async function POST(request: Request) {
  const session = await getSession();
  if (!session?.user?.id) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const { reportedUserId, reason, details } = await request.json();
  if (!reportedUserId || reportedUserId === session.user.id) return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  if (!VALID_REASONS.includes(reason)) return NextResponse.json({ error: "Motivo inválido" }, { status: 400 });

  const report = await prisma.userReport.create({
    data: {
      reporterId: session.user.id,
      reportedUserId,
      reason,
      details: details?.trim().slice(0, 500) || null,
    },
  });

  return NextResponse.json({ success: true, id: report.id });
}
