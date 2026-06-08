import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { MISSIONS_DATA } from "@/data/mock/rpg";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session?.user?.id) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const { partyId, missionSlug } = await request.json();

  const party = await prisma.rpgParty.findUnique({ where: { id: partyId }, include: { members: true } });
  if (!party) return NextResponse.json({ error: "Party não encontrada" }, { status: 404 });
  if (party.ownerId !== session.user.id) return NextResponse.json({ error: "Apenas o dono pode iniciar" }, { status: 403 });

  const missionData = MISSIONS_DATA.find(m => m.slug === missionSlug);
  if (!missionData) return NextResponse.json({ error: "Missão não encontrada" }, { status: 404 });

  let mission = await prisma.rpgMission.findUnique({ where: { slug: missionSlug } });
  if (!mission) {
    mission = await prisma.rpgMission.create({
      data: {
        title: missionData.title,
        slug: missionData.slug,
        theme: missionData.theme,
        difficulty: missionData.difficulty,
        estimatedMinutes: missionData.estimatedMinutes,
        description: missionData.description,
        objective: missionData.objective,
        scenesJson: JSON.stringify(missionData.scenes),
        rewardsJson: missionData.rewardsJson,
      },
    });
  }

  const firstMember = party.members[0];

  const rpgSession = await prisma.rpgSession.create({
    data: {
      partyId,
      missionId: mission.id,
      status: "ACTIVE",
      turnUserId: firstMember.userId,
      startedAt: new Date(),
    },
  });

  await prisma.rpgParty.update({ where: { id: partyId }, data: { status: "IN_MISSION" } });

  return NextResponse.json(rpgSession);
}

export async function GET(request: Request) {
  const session = await getSession();
  if (!session?.user?.id) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("id");
  if (!sessionId) return NextResponse.json(null);

  const rpgSession = await prisma.rpgSession.findUnique({
    where: { id: sessionId },
    include: {
      mission: true,
      actions: { orderBy: { createdAt: "asc" }, include: { user: { select: { id: true, name: true, username: true } } } },
      party: { include: { members: { include: { user: { select: { id: true, name: true, username: true, avatarEmoji: true } } } } } },
    },
  });

  if (!rpgSession) return NextResponse.json(null);

  const isMember = rpgSession.party.members.some((m) => m.userId === session.user.id);
  if (!isMember) return NextResponse.json({ error: "Acesso negado" }, { status: 403 });

  return NextResponse.json(rpgSession);
}
