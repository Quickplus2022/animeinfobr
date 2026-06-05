import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const party = await prisma.rpgParty.findUnique({
    where: { inviteCode: code.toUpperCase() },
    include: {
      members: {
        include: {
          user: { select: { id: true, name: true, username: true, avatarEmoji: true, avatarColor: true } },
        },
      },
      sessions: { orderBy: { createdAt: "desc" }, take: 1 },
    },
  });
  if (!party) return NextResponse.json({ error: "Party não encontrada" }, { status: 404 });
  return NextResponse.json(party);
}

export async function POST(_req: Request, { params }: { params: Promise<{ code: string }> }) {
  const session = await getSession();
  if (!session?.user?.id) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const { code } = await params;
  const party = await prisma.rpgParty.findUnique({ where: { inviteCode: code.toUpperCase() } });
  if (!party) return NextResponse.json({ error: "Código inválido" }, { status: 404 });
  if (party.status === "CLOSED") return NextResponse.json({ error: "Party fechada" }, { status: 400 });

  const memberCount = await prisma.rpgPartyMember.count({ where: { partyId: party.id } });
  if (memberCount >= party.maxPlayers) return NextResponse.json({ error: "Party cheia" }, { status: 400 });

  const existing = await prisma.rpgPartyMember.findUnique({ where: { partyId_userId: { partyId: party.id, userId: session.user.id } } });
  if (existing) return NextResponse.json({ error: "Você já está nesta party" }, { status: 409 });

  const char = await prisma.rpgCharacter.findUnique({ where: { userId: session.user.id } });

  const member = await prisma.rpgPartyMember.create({ data: { partyId: party.id, userId: session.user.id, characterId: char?.id ?? null } });

  await prisma.rpgCharacter.updateMany({ where: { userId: session.user.id }, data: { xp: { increment: 20 } } });

  return NextResponse.json(member);
}

export async function DELETE(request: Request, { params }: { params: Promise<{ code: string }> }) {
  const session = await getSession();
  if (!session?.user?.id) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const { code } = await params;
  const party = await prisma.rpgParty.findUnique({ where: { inviteCode: code.toUpperCase() } });
  if (!party) return NextResponse.json({ error: "Party não encontrada" }, { status: 404 });

  const { targetUserId } = await request.json().catch(() => ({}));
  const removeId = targetUserId ?? session.user.id;

  if (targetUserId && party.ownerId !== session.user.id) return NextResponse.json({ error: "Apenas o dono pode remover membros" }, { status: 403 });

  await prisma.rpgPartyMember.deleteMany({ where: { partyId: party.id, userId: removeId } });
  return NextResponse.json({ success: true });
}
