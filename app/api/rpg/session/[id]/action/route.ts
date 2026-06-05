import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { rollD20, getAttributeBonus, getResultType } from "@/data/mock/rpg";
import { narrator } from "@/lib/rpg/narrator/templateNarrator";

export const dynamic = "force-dynamic";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session?.user?.id) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const { id } = await params;
  const rpgSession = await prisma.rpgSession.findUnique({
    where: { id },
    include: { mission: true, party: { include: { members: true } } },
  });

  if (!rpgSession || rpgSession.status !== "ACTIVE") return NextResponse.json({ error: "Sessão inválida" }, { status: 400 });
  if (rpgSession.turnUserId !== session.user.id) return NextResponse.json({ error: "Não é sua vez" }, { status: 403 });

  const { actionText, attributeUsed } = await request.json();
  if (!actionText?.trim() || !attributeUsed) return NextResponse.json({ error: "Ação e atributo obrigatórios" }, { status: 400 });

  const char = await prisma.rpgCharacter.findUnique({ where: { userId: session.user.id } });
  const attrValue = (char as Record<string, unknown>)?.[attributeUsed] as number ?? 5;

  const diceRoll = rollD20();
  const bonus = getAttributeBonus(attrValue);
  const total = diceRoll + bonus;
  const resultType = getResultType(total);

  const scenes = JSON.parse(rpgSession.mission.scenesJson) as Array<{ narrative: string }>;
  const currentScene = scenes[rpgSession.currentSceneIndex];

  const narration = await narrator.generateActionResult({
    characterName: char?.name ?? session.user.name ?? "Aventureiro",
    characterClass: char?.classType ?? "aventureiro",
    characterElement: char?.elementType ?? "neutro",
    actionText: actionText.trim(),
    attributeUsed,
    diceRoll,
    bonus,
    total,
    resultType,
    sceneNarrative: currentScene?.narrative ?? "",
    partyNames: [],
  });

  const action = await prisma.rpgAction.create({
    data: {
      sessionId: id,
      userId: session.user.id,
      characterName: char?.name ?? "Aventureiro",
      actionText: actionText.trim().slice(0, 500),
      attributeUsed,
      diceRoll,
      bonus,
      total,
      resultType,
      resultText: narration.resultText,
    },
  });

  // Critical 20: badge + XP bônus
  if (diceRoll === 20) {
    await Promise.all([
      prisma.rpgBadge.upsert({
        where: { userId_badgeKey: { userId: session.user.id, badgeKey: "critico_20" } },
        create: { userId: session.user.id, badgeKey: "critico_20", badgeName: "Crítico 20!", description: "Tirou 20 no dado" },
        update: {},
      }),
      prisma.rpgCharacter.updateMany({ where: { userId: session.user.id }, data: { xp: { increment: 30 } } }),
    ]);
  }

  // Advance turn to next member
  const members = rpgSession.party.members;
  const currentIdx = members.findIndex(m => m.userId === session.user.id);
  const nextMember = members[(currentIdx + 1) % members.length];
  await prisma.rpgSession.update({ where: { id }, data: { turnUserId: nextMember.userId } });

  return NextResponse.json({ action, nextTurnUserId: nextMember.userId, narration });
}
