import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session?.user?.id) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const { animeId } = await request.json();
  const userId = session.user.id;

  const existing = await prisma.userLike.findUnique({
    where: { userId_animeId: { userId, animeId } },
  });

  if (existing) {
    await prisma.userLike.delete({ where: { id: existing.id } });
    return NextResponse.json({ liked: false });
  }

  await prisma.userLike.create({ data: { userId, animeId } });
  return NextResponse.json({ liked: true });
}
