import type { Metadata } from "next";
import MissoesClient from "./MissoesClient";

export const metadata: Metadata = {
  title: "Missões Diárias: Ganhe XP | AnimeInfoBR",
  description: "Complete missões diárias, ganhe XP, suba de nível e desbloqueie badges. Sua jornada otaku começa aqui.",
};

export default function MissoesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-10">
        <div className="text-5xl mb-4">🎮</div>
        <h1 className="text-3xl md:text-4xl font-black font-display text-white mb-3">
          Missões Diárias
        </h1>
        <p className="text-slate-400 text-lg">
          Complete missões, ganhe XP e suba de nível. Renovam todo dia.
        </p>
      </div>
      <MissoesClient />
    </div>
  );
}
