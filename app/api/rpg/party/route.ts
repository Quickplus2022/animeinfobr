import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { randomBytes } from "crypto";

export const dynamic = "force-dynamic";

function generateCode(): string {
  return randomBytes(3).toString("hex").toUpperCase();
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session?.user?.id) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const { name, theme, maxPlayers } = await request.json();
  if (!name?.trim()) return NextResponse.json({ error: "Nome obrigatório" }, { status: 400 });

  const char = await prisma.rpgCharacter.findUnique({ where: { userId: session.user.id } });
  if (!char) return NextResponse.json({ error: "Crie seu personagem primeiro" }, { status: 400 });

  let inviteCode = generateCode();
  let attempts = 0;
  while (attempts < 5) {
    const exists = await prisma.rpgParty.findUnique({ where: { inviteCode } });
    if (!exists) break;
    inviteCode = generateCode();
    attempts++;
  }

  const party = await prisma.rpgParty.create({
    data: {
      name: name.trim().slice(0, 50),
      inviteCode,
      ownerId: session.user.id,
      theme: theme || "fantasia",
      maxPlayers: Math.min(Math.max(maxPlayers || 4, 2), 6),
    },
  });

  await prisma.rpgPartyMember.create({ data: { partyId: party.id, userId: session.user.id, characterId: char.id, role: "OWNER" } });

  await prisma.rpgBadge.upsert({
    where: { userId_badgeKey: { userId: session.user.id, badgeKey: "fundador_guilda" } },
    create: { userId: session.user.id, badgeKey: "fundador_guilda", badgeName: "Fundador de Guilda", description: "Criou uma party" },
    update: {},
  });

  return NextResponse.json(party);
}

export async function GET() {
  const session = await getSession();
  if (!session?.user?.id) return NextResponse.json([]);

  const memberships = await prisma.rpgPartyMember.findMany({
    where: { userId: session.user.id },
    include: {
      party: {
        include: {
          members: { include: { user: { select: { id: true, name: true, username: true, avatarEmoji: true, avatarColor: true } } } },
        },
      },
    },
  });
  return NextResponse.json(memberships.map(m => m.party));
}
