import type { Metadata } from "next";
import PersonagemClient from "./PersonagemClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Meu Personagem RPG | AnimeInfoBR",
  description: "Crie seu alter-ego RPG — escolha classe, elemento e atributos para suas aventuras em Guilds.",
};

export default function PersonagemPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] hero-bg">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🧙</div>
          <h1 className="text-3xl font-black font-display text-white mb-2">Meu Personagem</h1>
          <p className="text-slate-400">Seu alter-ego nas aventuras de Guilds.</p>
        </div>
        <PersonagemClient />
      </div>
    </div>
  );
}
