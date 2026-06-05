import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";

// force-dynamic: nunca cachear — cada request deve ler o cookie do usuário atual
export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(null, {
      headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
    });
  }
  return NextResponse.json(session.user, {
    headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
  });
}
