import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session?.user?.id) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const { animeId, slug, title, cover } = await request.json();
  const userId = session.user.id;

  const existing = await prisma.userFavorite.findUnique({
    where: { userId_animeId: { userId, animeId } },
  });

  if (existing) {
    await prisma.userFavorite.delete({ where: { id: existing.id } });
    return NextResponse.json({ favorited: false });
  }

  await prisma.userFavorite.create({ data: { userId, animeId, slug, title, cover } });
  return NextResponse.json({ favorited: true });
}

export async function GET() {
  const session = await getSession();
  if (!session?.user?.id) return NextResponse.json([]);
  const favorites = await prisma.userFavorite.findMany({
    where: { userId: session.user.id },
    orderBy: { addedAt: "desc" },
  });
  return NextResponse.json(favorites);
}
