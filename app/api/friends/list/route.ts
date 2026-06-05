import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSession();
  if (!session?.user?.id) return NextResponse.json({ friends: [], incoming: [], outgoing: [] }, { status: 401 });

  const [friendLinks, incoming, outgoing] = await Promise.all([
    prisma.userFriend.findMany({
      where: { userId: session.user.id },
      include: { friend: { select: { id: true, name: true, username: true, avatarEmoji: true, avatarColor: true } } },
    }),
    prisma.friendRequest.findMany({
      where: { receiverId: session.user.id, status: "PENDING" },
      include: { sender: { select: { id: true, name: true, username: true, avatarEmoji: true, avatarColor: true } } },
    }),
    prisma.friendRequest.findMany({
      where: { senderId: session.user.id, status: "PENDING" },
      include: { receiver: { select: { id: true, name: true, username: true, avatarEmoji: true, avatarColor: true } } },
    }),
  ]);

  return NextResponse.json({
    friends: friendLinks.map(f => f.friend),
    incoming: incoming.map(r => ({ id: r.id, user: r.sender, createdAt: r.createdAt })),
    outgoing: outgoing.map(r => ({ id: r.id, user: r.receiver, createdAt: r.createdAt })),
  });
}

export async function DELETE(request: Request) {
  const session = await getSession();
  if (!session?.user?.id) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const { friendId } = await request.json();
  await prisma.userFriend.deleteMany({ where: { OR: [{ userId: session.user.id, friendId }, { userId: friendId, friendId: session.user.id }] } });
  return NextResponse.json({ success: true });
}
