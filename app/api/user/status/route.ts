import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const session = await auth();
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

  return NextResponse.json({
    favorited: !!fav,
    watchLater: !!wl,
    liked: !!like,
  });
}
