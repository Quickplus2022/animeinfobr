import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { MISSIONS_DATA } from "@/data/mock/rpg";

export const dynamic = "force-dynamic";

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session?.user?.id) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const { id } = await params;
  const rpgSession = await prisma.rpgSession.findUnique({
    where: { id },
    include: { mission: true, party: { include: { members: true } } },
  });

  if (!rpgSession) return NextResponse.json({ error: "Sessão não encontrada" }, { status: 404 });
  if (rpgSession.party.ownerId !== session.user.id) return NextResponse.json({ error: "Apenas o dono pode avançar" }, { status: 403 });

  const scenes = JSON.parse(rpgSession.mission.scenesJson) as unknown[];
  const nextScene = rpgSession.currentSceneIndex + 1;

  if (nextScene >= scenes.length) {
    // Mission complete
    const missionData = MISSIONS_DATA.find(m => m.slug === rpgSession.mission.slug);
    const xpReward = missionData?.xpReward ?? 100;

    await Promise.all([
      prisma.rpgSession.update({ where: { id }, data: { status: "COMPLETED", finishedAt: new Date() } }),
      prisma.rpgParty.update({ where: { id: rpgSession.partyId }, data: { status: "OPEN" } }),
      ...rpgSession.party.members.map(m =>
        prisma.rpgCharacter.updateMany({ where: { userId: m.userId }, data: { xp: { increment: xpReward } } })
      ),
    ]);

    const badgeOps = [];

    if (missionData?.badgeKey) {
      badgeOps.push(...rpgSession.party.members.map(m =>
        prisma.rpgBadge.upsert({
          where: { userId_badgeKey: { userId: m.userId, badgeKey: missionData.badgeKey! } },
          create: { userId: m.userId, badgeKey: missionData.badgeKey!, badgeName: missionData.badgeName ?? missionData.badgeKey!, description: `Concluiu ${missionData.title}` },
          update: {},
        })
      ));
    }

    // Badge "Jogador de Equipe" se sessão tinha 3+ membros
    if (rpgSession.party.members.length >= 3) {
      badgeOps.push(...rpgSession.party.members.map(m =>
        prisma.rpgBadge.upsert({
          where: { userId_badgeKey: { userId: m.userId, badgeKey: "jogador_equipe" } },
          create: { userId: m.userId, badgeKey: "jogador_equipe", badgeName: "Jogador de Equipe", description: "Jogou com 3 ou mais amigos em uma sessão" },
          update: {},
        })
      ));
    }

    // Contar missões concluídas para badges de progressão
    for (const member of rpgSession.party.members) {
      const sessionsCompleted = await prisma.rpgSession.count({ where: { party: { members: { some: { userId: member.userId } } }, status: "COMPLETED" } });
      if (sessionsCompleted >= 3) {
        badgeOps.push(prisma.rpgBadge.upsert({
          where: { userId_badgeKey: { userId: member.userId, badgeKey: "estrategista_guilda" } },
          create: { userId: member.userId, badgeKey: "estrategista_guilda", badgeName: "Estrategista da Guilda", description: "Concluiu 3 missões" },
          update: {},
        }));
      }
      if (sessionsCompleted >= 5) {
        badgeOps.push(prisma.rpgBadge.upsert({
          where: { userId_badgeKey: { userId: member.userId, badgeKey: "heroi_temporada" } },
          create: { userId: member.userId, badgeKey: "heroi_temporada", badgeName: "Herói da Temporada", description: "Concluiu 5 missões" },
          update: {},
        }));
      }
    }

    if (badgeOps.length > 0) await Promise.all(badgeOps);

    return NextResponse.json({ status: "COMPLETED", xpReward, missionTitle: missionData?.title, missionEmoji: missionData?.themeEmoji, partyName: rpgSession.party.name ?? undefined });
  }

  await prisma.rpgSession.update({ where: { id }, data: { currentSceneIndex: nextScene } });
  return NextResponse.json({ status: "ACTIVE", currentSceneIndex: nextScene });
}
