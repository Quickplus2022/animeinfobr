import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(null, {
      headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
    });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, email: true, name: true, avatarEmoji: true, avatarColor: true, username: true },
  });

  return NextResponse.json(user, {
    headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
  });
}
