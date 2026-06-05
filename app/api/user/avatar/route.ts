import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const MAX_SIZE = 120_000; // ~120KB base64 string

export async function POST(request: Request) {
  const session = await getSession();
  if (!session?.user?.id) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const { dataUrl } = await request.json();

  if (!dataUrl || typeof dataUrl !== "string") {
    return NextResponse.json({ error: "Imagem inválida" }, { status: 400 });
  }
  if (!dataUrl.startsWith("data:image/")) {
    return NextResponse.json({ error: "Formato inválido. Use JPG, PNG ou WebP." }, { status: 400 });
  }
  if (dataUrl.length > MAX_SIZE) {
    return NextResponse.json({ error: "Imagem muito grande. Tente uma foto menor." }, { status: 400 });
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { avatarUrl: dataUrl },
  });

  return NextResponse.json({ success: true, avatarUrl: dataUrl });
}

export async function DELETE() {
  const session = await getSession();
  if (!session?.user?.id) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  await prisma.user.update({ where: { id: session.user.id }, data: { avatarUrl: null } });
  return NextResponse.json({ success: true });
}
