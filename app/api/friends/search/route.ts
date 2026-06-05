import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const session = await getSession();
  if (!session?.user?.id) return NextResponse.json([], { status: 401 });

  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim();
  if (!q || q.length < 2) return NextResponse.json([]);

  const blocked = await prisma.userBlock.findMany({ where: { blockerId: session.user.id }, select: { blockedId: true } });
  const blockedIds = blocked.map(b => b.blockedId);

  const users = await prisma.user.findMany({
    where: {
      AND: [
        { id: { not: session.user.id } },
        { id: { notIn: blockedIds } },
        { OR: [
          { username: { contains: q } },
          { name: { contains: q } },
        ]},
      ],
    },
    select: { id: true, name: true, username: true, avatarEmoji: true, avatarColor: true },
    take: 10,
  });

  const friendIds = (await prisma.userFriend.findMany({ where: { userId: session.user.id }, select: { friendId: true } })).map(f => f.friendId);
  const pendingIds = (await prisma.friendRequest.findMany({ where: { senderId: session.user.id, status: "PENDING" }, select: { receiverId: true } })).map(r => r.receiverId);

  return NextResponse.json(users.map(u => ({
    ...u,
    isFriend: friendIds.includes(u.id),
    requestPending: pendingIds.includes(u.id),
  })));
}
