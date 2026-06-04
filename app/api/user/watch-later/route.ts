import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const { animeId, slug, title, cover } = await request.json();
  const userId = session.user.id;

  const existing = await prisma.userWatchLater.findUnique({
    where: { userId_animeId: { userId, animeId } },
  });

  if (existing) {
    await prisma.userWatchLater.delete({ where: { id: existing.id } });
    return NextResponse.json({ saved: false });
  }

  await prisma.userWatchLater.create({ data: { userId, animeId, slug, title, cover } });
  return NextResponse.json({ saved: true });
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json([]);
  const list = await prisma.userWatchLater.findMany({
    where: { userId: session.user.id },
    orderBy: { addedAt: "desc" },
  });
  return NextResponse.json(list);
}
