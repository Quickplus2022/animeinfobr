import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import MissionBoardClient from "./MissionBoardClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Missões RPG | AnimeInfoBR",
  description: "Escolha uma missão e inicie uma aventura com sua party. Fantasia, cyberpunk, shounen e mais.",
};

export default function MissoesRpgPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] hero-bg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/party"
            className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white mb-6 transition-colors"
          >
            ← Voltar para Party
          </Link>
          <div className="text-center">
            <div className="text-5xl mb-4">⚔️</div>
            <h1 className="text-3xl md:text-4xl font-black font-display text-white mb-3">
              Quadro de Missões
            </h1>
            <p className="text-slate-400 text-lg max-w-lg mx-auto">
              Escolha uma aventura para sua party. Cada missão é uma história original com cenas narrativas e recompensas exclusivas.
            </p>
          </div>
        </div>

        <Suspense
          fallback={
            <div className="flex justify-center py-24">
              <div className="w-10 h-10 border-4 border-white/10 border-t-violet-500 rounded-full animate-spin" />
            </div>
          }
        >
          <MissionBoardClient />
        </Suspense>
      </div>
    </div>
  );
}
