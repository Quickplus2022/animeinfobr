import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSession();
  if (!session?.user?.id) return NextResponse.json(null, { status: 401 });
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      bio: true, avatarEmoji: true, avatarColor: true, avatarUrl: true,
      username: true, favoriteAnimeId: true, favoriteAnimeTitle: true,
      profileVisibility: true, animeDnaJson: true,
    },
  });
  return NextResponse.json(user);
}

export async function PUT(request: Request) {
  const session = await getSession();
  if (!session?.user?.id) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const body = await request.json();
  const { bio, avatarEmoji, avatarColor, username, favoriteAnimeId, favoriteAnimeTitle, profileVisibility, name } = body;

  if (bio !== undefined && typeof bio === "string" && bio.length > 500) {
    return NextResponse.json({ error: "Máximo 500 caracteres" }, { status: 400 });
  }

  if (username !== undefined) {
    if (username && !/^[a-zA-Z0-9._-]{3,30}$/.test(username)) {
      return NextResponse.json({ error: "Username: 3-30 chars, apenas letras, números, ponto, _ e -" }, { status: 400 });
    }
    if (username) {
      const existing = await prisma.user.findUnique({ where: { username } });
      if (existing && existing.id !== session.user.id) {
        return NextResponse.json({ error: "Username já está em uso" }, { status: 409 });
      }
    }
  }

  const data: Record<string, unknown> = {};
  if (name !== undefined) data.name = name?.trim() || null;
  if (bio !== undefined) data.bio = bio?.trim() || null;
  if (avatarEmoji !== undefined) data.avatarEmoji = avatarEmoji || null;
  if (avatarColor !== undefined) data.avatarColor = avatarColor || null;
  if (username !== undefined) data.username = username?.trim() || null;
  if (favoriteAnimeId !== undefined) data.favoriteAnimeId = favoriteAnimeId || null;
  if (favoriteAnimeTitle !== undefined) data.favoriteAnimeTitle = favoriteAnimeTitle?.trim() || null;
  if (profileVisibility !== undefined) data.profileVisibility = profileVisibility;

  const updated = await prisma.user.update({
    where: { id: session.user.id },
    data,
    select: { bio: true, avatarEmoji: true, avatarColor: true, username: true, favoriteAnimeId: true, favoriteAnimeTitle: true, profileVisibility: true },
  });

  return NextResponse.json(updated);
}
