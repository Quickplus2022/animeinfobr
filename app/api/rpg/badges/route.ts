import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSession();
  if (!session?.user?.id) return NextResponse.json([]);
  const badges = await prisma.rpgBadge.findMany({ where: { userId: session.user.id }, orderBy: { unlockedAt: "desc" } });
  return NextResponse.json(badges);
}
