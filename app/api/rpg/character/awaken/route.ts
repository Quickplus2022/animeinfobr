import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { getAwakeningById } from "@/data/mock/rpg";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session?.user?.id) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const { awakeningClassId } = await request.json();
  if (!awakeningClassId) return NextResponse.json({ error: "ID de despertar obrigatório" }, { status: 400 });

  const char = await prisma.rpgCharacter.findUnique({ where: { userId: session.user.id } });
  if (!char) return NextResponse.json({ error: "Personagem não encontrado" }, { status: 404 });
  if (char.level < 25) return NextResponse.json({ error: "Nível 25 necessário para despertar" }, { status: 403 });
  if (char.awakeningClass) return NextResponse.json({ error: "Despertar já escolhido" }, { status: 409 });

  const path = getAwakeningById(char.classType, awakeningClassId);
  if (!path) return NextResponse.json({ error: "Caminho de despertar inválido para esta classe" }, { status: 400 });

  // Apply attribute bonuses and set awakening class
  const updates: Record<string, number> = {};
  for (const [attr, bonus] of Object.entries(path.attrBonuses)) {
    if (typeof bonus === "number" && bonus !== 0) {
      updates[attr] = Math.max(1, (char as Record<string, unknown>)[attr] as number + bonus);
    }
  }

  const updated = await prisma.rpgCharacter.update({
    where: { userId: session.user.id },
    data: { awakeningClass: awakeningClassId, ...updates },
  });

  // Award awakening badge
  await prisma.rpgBadge.upsert({
    where: { userId_badgeKey: { userId: session.user.id, badgeKey: "primeiro_despertar" } },
    create: {
      userId: session.user.id,
      badgeKey: "primeiro_despertar",
      badgeName: "Primeiro Despertar",
      description: `Escolheu o caminho ${path.label}`,
    },
    update: {},
  });

  return NextResponse.json(updated);
}
