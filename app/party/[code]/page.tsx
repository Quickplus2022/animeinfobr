import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Entrar na Party | AnimeInfoBR" };

export default async function PartyCodePage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  return (
    <div className="min-h-[calc(100vh-4rem)] hero-bg flex items-center justify-center">
      <div className="max-w-sm w-full mx-auto px-4 text-center">
        <div className="text-5xl mb-6">🏰</div>
        <h1 className="text-2xl font-black text-white mb-2">Convite de Party</h1>
        <p className="text-slate-400 mb-6">
          Você foi convidado para entrar na party com código{" "}
          <span className="font-mono text-violet-400 font-bold">{code}</span>.
        </p>
        <Link
          href={`/party?join=${code}`}
          className="block w-full bg-violet-600 hover:bg-violet-500 text-white font-bold px-6 py-3 rounded-xl transition-colors mb-3"
        >
          Aceitar Convite
        </Link>
        <Link href="/guilds" className="text-sm text-slate-400 hover:text-white">
          Voltar para Guilds
        </Link>
      </div>
    </div>
  );
}
