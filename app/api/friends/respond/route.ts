import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session?.user?.id) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const { requestId, action } = await request.json();
  if (!requestId || !["accept", "decline"].includes(action)) return NextResponse.json({ error: "Ação inválida" }, { status: 400 });

  const req = await prisma.friendRequest.findUnique({ where: { id: requestId } });
  if (!req || req.receiverId !== session.user.id) return NextResponse.json({ error: "Não encontrado" }, { status: 404 });
  if (req.status !== "PENDING") return NextResponse.json({ error: "Solicitação já respondida" }, { status: 409 });

  if (action === "accept") {
    await prisma.$transaction([
      prisma.friendRequest.update({ where: { id: requestId }, data: { status: "ACCEPTED" } }),
      prisma.userFriend.createMany({ data: [
        { userId: session.user.id, friendId: req.senderId },
        { userId: req.senderId, friendId: session.user.id },
      ], skipDuplicates: true }),
    ]);

    // Badge "Guardião dos Amigos" para ambos no primeiro amigo
    const friendCount = await prisma.userFriend.count({ where: { userId: session.user.id } });
    if (friendCount === 1) {
      await Promise.all([
        prisma.rpgBadge.upsert({
          where: { userId_badgeKey: { userId: session.user.id, badgeKey: "guardiao_amigos" } },
          create: { userId: session.user.id, badgeKey: "guardiao_amigos", badgeName: "Guardião dos Amigos", description: "Fez seu primeiro amigo" },
          update: {},
        }),
        prisma.rpgBadge.upsert({
          where: { userId_badgeKey: { userId: req.senderId, badgeKey: "guardiao_amigos" } },
          create: { userId: req.senderId, badgeKey: "guardiao_amigos", badgeName: "Guardião dos Amigos", description: "Fez seu primeiro amigo" },
          update: {},
        }),
      ]);
    }

    // XP +25 ao jogar com amigo (ambos ganham por terem feito conexão)
    await Promise.all([
      prisma.rpgCharacter.updateMany({ where: { userId: session.user.id }, data: { xp: { increment: 25 } } }),
      prisma.rpgCharacter.updateMany({ where: { userId: req.senderId }, data: { xp: { increment: 25 } } }),
    ]);

    return NextResponse.json({ success: true, action: "accepted" });
  }

  await prisma.friendRequest.update({ where: { id: requestId }, data: { status: "DECLINED" } });
  return NextResponse.json({ success: true, action: "declined" });
}
