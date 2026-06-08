import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session?.user?.id) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const { blockedId } = await request.json();
  if (!blockedId || blockedId === session.user.id) return NextResponse.json({ error: "ID inválido" }, { status: 400 });

  await prisma.$transaction([
    prisma.userBlock.upsert({
      where: { blockerId_blockedId: { blockerId: session.user.id, blockedId } },
      create: { blockerId: session.user.id, blockedId },
      update: {},
    }),
    prisma.userFriend.deleteMany({
      where: {
        OR: [
          { userId: session.user.id, friendId: blockedId },
          { userId: blockedId, friendId: session.user.id },
        ],
      },
    }),
  ]);

  return NextResponse.json({ success: true });
}

export async function DELETE(request: Request) {
  const session = await getSession();
  if (!session?.user?.id) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const { blockedId } = await request.json();
  await prisma.userBlock.deleteMany({ where: { blockerId: session.user.id, blockedId } });
  return NextResponse.json({ success: true });
}
