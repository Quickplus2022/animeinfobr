import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { RPG_CLASSES } from "@/data/mock/rpg";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSession();
  if (!session?.user?.id) return NextResponse.json(null);
  const char = await prisma.rpgCharacter.findUnique({ where: { userId: session.user.id } });
  return NextResponse.json(char);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session?.user?.id) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const existing = await prisma.rpgCharacter.findUnique({ where: { userId: session.user.id } });
  if (existing) return NextResponse.json({ error: "Personagem já criado. Use PUT para atualizar." }, { status: 409 });

  const body = await request.json();
  const { name, avatarEmoji, classType, elementType, backstory } = body;

  if (!name?.trim() || !classType || !elementType) return NextResponse.json({ error: "Nome, classe e elemento são obrigatórios" }, { status: 400 });
  if (name.trim().length > 50) return NextResponse.json({ error: "Nome máximo 50 caracteres" }, { status: 400 });

  const classDef = RPG_CLASSES.find(c => c.id === classType);
  if (!classDef) return NextResponse.json({ error: "Classe inválida" }, { status: 400 });

  const char = await prisma.rpgCharacter.create({
    data: {
      userId: session.user.id,
      name: name.trim(),
      avatarEmoji: avatarEmoji || classDef.emoji,
      classType,
      elementType,
      backstory: backstory?.trim() || null,
      ...classDef.attributes,
    },
  });

  // Award first hero badge
  await prisma.rpgBadge.upsert({
    where: { userId_badgeKey: { userId: session.user.id, badgeKey: "primeiro_heroi" } },
    create: { userId: session.user.id, badgeKey: "primeiro_heroi", badgeName: "Primeiro Herói", description: "Criou seu personagem RPG" },
    update: {},
  });

  // Add XP to character
  await prisma.rpgCharacter.update({ where: { id: char.id }, data: { xp: { increment: 50 } } });

  return NextResponse.json(char);
}

export async function PUT(request: Request) {
  const session = await getSession();
  if (!session?.user?.id) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const { backstory, avatarEmoji } = await request.json();

  const updated = await prisma.rpgCharacter.update({
    where: { userId: session.user.id },
    data: {
      ...(backstory !== undefined && { backstory: backstory?.trim() || null }),
      ...(avatarEmoji !== undefined && { avatarEmoji }),
    },
  });
  return NextResponse.json(updated);
}
