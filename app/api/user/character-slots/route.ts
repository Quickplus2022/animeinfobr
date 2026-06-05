import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSession();
  if (!session?.user?.id) return NextResponse.json([]);
  const slots = await prisma.userCharacterSlot.findMany({
    where: { userId: session.user.id },
  });
  return NextResponse.json(slots);
}

export async function PUT(request: Request) {
  const session = await getSession();
  if (!session?.user?.id) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const { slotType, characterId, characterName, characterImage, mediaTitle } = await request.json();

  const VALID_SLOTS = ["ESPELHO", "FAVORITO", "MENTOR", "RIVAL", "VILAO", "CONFORTO", "EU_EM_OUTRO_MUNDO"];
  if (!VALID_SLOTS.includes(slotType)) {
    return NextResponse.json({ error: "Slot inválido" }, { status: 400 });
  }
  if (!characterId || !characterName) {
    return NextResponse.json({ error: "Personagem obrigatório" }, { status: 400 });
  }

  const slot = await prisma.userCharacterSlot.upsert({
    where: { userId_slotType: { userId: session.user.id, slotType } },
    update: { characterId, characterName, characterImage: characterImage ?? null, mediaTitle: mediaTitle ?? null },
    create: { userId: session.user.id, slotType, characterId, characterName, characterImage: characterImage ?? null, mediaTitle: mediaTitle ?? null },
  });

  return NextResponse.json(slot);
}

export async function DELETE(request: Request) {
  const session = await getSession();
  if (!session?.user?.id) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const slotType = searchParams.get("slotType");
  if (!slotType) return NextResponse.json({ error: "slotType obrigatório" }, { status: 400 });

  await prisma.userCharacterSlot.deleteMany({
    where: { userId: session.user.id, slotType },
  });
  return NextResponse.json({ success: true });
}
