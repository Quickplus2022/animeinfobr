import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session?.user?.id) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const { receiverId } = await request.json();
  if (!receiverId || receiverId === session.user.id) return NextResponse.json({ error: "ID inválido" }, { status: 400 });

  const existing = await prisma.friendRequest.findUnique({ where: { senderId_receiverId: { senderId: session.user.id, receiverId } } });
  if (existing) return NextResponse.json({ error: "Solicitação já enviada" }, { status: 409 });

  const alreadyFriend = await prisma.userFriend.findUnique({ where: { userId_friendId: { userId: session.user.id, friendId: receiverId } } });
  if (alreadyFriend) return NextResponse.json({ error: "Já são amigos" }, { status: 409 });

  const req = await prisma.friendRequest.create({ data: { senderId: session.user.id, receiverId } });
  return NextResponse.json(req);
}
