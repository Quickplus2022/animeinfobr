import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const session = await getSession();
  if (!session?.user?.id) {
    return NextResponse.json({ favorited: false, watchLater: false, liked: false });
  }

  const { searchParams } = new URL(request.url);
  const animeId = Number(searchParams.get("animeId"));
  if (!animeId) return NextResponse.json({ favorited: false, watchLater: false, liked: false });

  const userId = session.user.id;
  const [fav, wl, like] = await Promise.all([
    prisma.userFavorite.findUnique({ where: { userId_animeId: { userId, animeId } } }),
    prisma.userWatchLater.findUnique({ where: { userId_animeId: { userId, animeId } } }),
    prisma.userLike.findUnique({ where: { userId_animeId: { userId, animeId } } }),
  ]);

  return NextResponse.json({ favorited: !!fav, watchLater: !!wl, liked: !!like });
}
