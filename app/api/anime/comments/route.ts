import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const BAD_WORDS = ["merda", "caralho", "puta", "fdp", "viado", "porra", "buceta", "cu ", "arrombado", "cuzao", "vtnc", "filho da puta"];

function hasBadWord(text: string): boolean {
  const lower = text.toLowerCase();
  return BAD_WORDS.some(w => lower.includes(w));
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const animeId = Number(searchParams.get("animeId"));
  if (!animeId) return NextResponse.json([]);

  const comments = await prisma.animeComment.findMany({
    where: { animeId },
    orderBy: { createdAt: "desc" },
    take: 50,
    include: {
      user: { select: { id: true, name: true, email: true } },
    },
  });

  return NextResponse.json(
    comments.map(c => ({
      id: c.id,
      content: c.content,
      createdAt: c.createdAt,
      userName: c.user.name || c.user.email.split("@")[0],
      userId: c.user.id,
    }))
  );
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Faça login para comentar" }, { status: 401 });
  }

  const { animeId, content } = await request.json();

  if (!content?.trim() || content.trim().length < 3) {
    return NextResponse.json({ error: "Comentário muito curto" }, { status: 400 });
  }
  if (content.trim().length > 500) {
    return NextResponse.json({ error: "Máximo 500 caracteres" }, { status: 400 });
  }
  if (hasBadWord(content)) {
    return NextResponse.json({ error: "Comentário com linguagem inadequada. Revise o texto." }, { status: 400 });
  }

  const comment = await prisma.animeComment.create({
    data: {
      animeId: Number(animeId),
      userId: session.user.id,
      content: content.trim(),
    },
    include: { user: { select: { name: true, email: true } } },
  });

  return NextResponse.json({
    id: comment.id,
    content: comment.content,
    createdAt: comment.createdAt,
    userName: comment.user.name || comment.user.email.split("@")[0],
    userId: comment.userId,
  });
}

export async function DELETE(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const commentId = searchParams.get("id");
  if (!commentId) return NextResponse.json({ error: "ID obrigatório" }, { status: 400 });

  const comment = await prisma.animeComment.findUnique({ where: { id: commentId } });
  if (!comment || comment.userId !== session.user.id) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 403 });
  }

  await prisma.animeComment.delete({ where: { id: commentId } });
  return NextResponse.json({ success: true });
}
