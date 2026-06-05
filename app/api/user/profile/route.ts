import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSession();
  if (!session?.user?.id) return NextResponse.json(null, { status: 401 });
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { bio: true, avatarEmoji: true, avatarColor: true, name: true },
  });
  return NextResponse.json(user);
}

export async function PUT(request: Request) {
  const session = await getSession();
  if (!session?.user?.id) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const body = await request.json();
  const { bio, avatarEmoji, avatarColor } = body;

  if (bio !== undefined && typeof bio === "string" && bio.length > 500) {
    return NextResponse.json({ error: "Biografia máxima de 500 caracteres" }, { status: 400 });
  }

  const updated = await prisma.user.update({
    where: { id: session.user.id },
    data: {
      ...(bio !== undefined && { bio: bio.trim() || null }),
      ...(avatarEmoji !== undefined && { avatarEmoji: avatarEmoji || null }),
      ...(avatarColor !== undefined && { avatarColor: avatarColor || null }),
    },
    select: { bio: true, avatarEmoji: true, avatarColor: true },
  });

  return NextResponse.json(updated);
}
