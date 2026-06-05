// NextAuth removido — sistema de autenticação migrado para JWT próprio (lib/session.ts)
// Este arquivo mantido vazio para evitar erros de rota não encontrada em links antigos.
import { NextResponse } from "next/server";
export async function GET() { return NextResponse.json({ error: "Not found" }, { status: 404 }); }
export async function POST() { return NextResponse.json({ error: "Not found" }, { status: 404 }); }
