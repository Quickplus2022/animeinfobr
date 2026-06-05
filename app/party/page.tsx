import type { Metadata } from "next";
import PartyClient from "./PartyClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Party | AnimeInfoBR",
  description: "Crie ou entre em uma guilda para jogar missões RPG com amigos.",
};

export default function PartyPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] hero-bg">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🏰</div>
          <h1 className="text-3xl font-black font-display text-white mb-2">Party / Guilda</h1>
          <p className="text-slate-400">Crie uma party ou entre pelo código de convite.</p>
        </div>
        <PartyClient />
      </div>
    </div>
  );
}
