import type { Metadata } from "next";
import Link from "next/link";
import GameGate from "./GameGate";

export const metadata: Metadata = {
  title: "Jogo: Adivinhe o Anime | AnimeInfoBR",
  description: "Teste seus conhecimentos! Adivinhe o anime pela sinopse, personagem ou cena. Jogo rápido de anime em português.",
};

export default function JogoPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-white transition-colors">Início</Link>
        <span>/</span>
        <span className="text-slate-300">Jogos</span>
      </nav>

      <div className="text-center mb-8">
        <div className="text-5xl mb-3">🎮</div>
        <h1 className="text-3xl font-black font-display text-white mb-2">Jogo do Anime</h1>
        <p className="text-slate-400">Adivinhe o anime pela sinopse. Quantos você acerta?</p>
      </div>

      <GameGate />

      <div className="mt-10 text-center">
        <p className="text-slate-600 text-xs">Mais jogos chegando em breve: adivinhe pelo personagem, pela abertura e muito mais.</p>
      </div>
    </div>
  );
}
