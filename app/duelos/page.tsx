import type { Metadata } from "next";
import DuelosClient from "./DuelosClient";

export const metadata: Metadata = {
  title: "Duelos de Anime: Vote no Seu Favorito | AnimeInfoBR",
  description: "Vote nos melhores duelos de anime! Naruto vs One Piece, Demon Slayer vs Jujutsu Kaisen e muito mais. Compartilhe e debate com seus amigos.",
};

export default function DuelosPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-10">
        <div className="text-5xl mb-4">⚔️</div>
        <h1 className="text-3xl md:text-4xl font-black font-display text-white mb-3">
          Duelos de Anime
        </h1>
        <p className="text-slate-400 text-lg">
          Vote no seu favorito. Compartilhe. Debata. Sem resposta certa.
        </p>
      </div>
      <DuelosClient />
    </div>
  );
}
