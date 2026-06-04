import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const audienceId = process.env.RESEND_AUDIENCE_ID;

    if (!audienceId) {
      return NextResponse.json({ error: "Configuração ausente" }, { status: 500 });
    }

    await resend.contacts.create({ email, audienceId, unsubscribed: false });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro ao cadastrar";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
