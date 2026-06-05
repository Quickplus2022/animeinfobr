import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session?.user?.id) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const body = await request.json();
  const {
    primaryCharacterId, primaryCharacterName, primaryCharacterImage,
    secondaryCharacterId, secondaryCharacterName,
    shadowCharacterId, shadowCharacterName,
    rivalCharacterId, rivalCharacterName,
    scoreJson, answersJson, animeDnaJson,
  } = body;

  if (!primaryCharacterId || !primaryCharacterName) {
    return NextResponse.json({ error: "Dados do personagem obrigatórios" }, { status: 400 });
  }

  const result = await prisma.characterTestResult.create({
    data: {
      userId: session.user.id,
      primaryCharacterId, primaryCharacterName,
      primaryCharacterImage: primaryCharacterImage ?? null,
      secondaryCharacterId: secondaryCharacterId ?? null,
      secondaryCharacterName: secondaryCharacterName ?? null,
      shadowCharacterId: shadowCharacterId ?? null,
      shadowCharacterName: shadowCharacterName ?? null,
      rivalCharacterId: rivalCharacterId ?? null,
      rivalCharacterName: rivalCharacterName ?? null,
      scoreJson: JSON.stringify(scoreJson),
      answersJson: JSON.stringify(answersJson),
      animeDnaJson: animeDnaJson ? JSON.stringify(animeDnaJson) : null,
    },
  });

  if (animeDnaJson) {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { animeDnaJson: JSON.stringify(animeDnaJson) },
    });
  }

  return NextResponse.json({ success: true, id: result.id });
}

export async function GET() {
  const session = await getSession();
  if (!session?.user?.id) return NextResponse.json(null);

  const result = await prisma.characterTestResult.findFirst({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(result);
}
