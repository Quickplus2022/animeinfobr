import type { Metadata } from "next";
import Link from "next/link";
import { MISSIONS_DATA } from "@/data/mock/rpg";

export const metadata: Metadata = {
  title: "Guilds | AnimeInfoBR",
  description: "Sistema de Guilds RPG do AnimeInfoBR — crie seu personagem, forme uma party e embarque em missões narrativas.",
};

export default function GuildsPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] hero-bg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Hero */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">⚔️</div>
          <h1 className="text-4xl md:text-5xl font-black font-display text-white mb-4">
            Guilds & RPG Social
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Crie seu personagem, reúna amigos em uma party e embarque em missões narrativas originais — tudo no universo otaku.
          </p>
        </div>

        {/* Grid principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Link href="/personagem" className="group bg-slate-800/60 border border-slate-700 hover:border-violet-500 rounded-2xl p-6 transition-all hover:-translate-y-1">
            <div className="text-4xl mb-3">🧙</div>
            <h2 className="text-xl font-bold text-white mb-2 group-hover:text-violet-400 transition-colors">Meu Personagem</h2>
            <p className="text-slate-400 text-sm">Escolha sua classe, elemento e defina os atributos do seu alter-ego RPG.</p>
          </Link>

          <Link href="/amigos" className="group bg-slate-800/60 border border-slate-700 hover:border-emerald-500 rounded-2xl p-6 transition-all hover:-translate-y-1">
            <div className="text-4xl mb-3">🤝</div>
            <h2 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">Amigos</h2>
            <p className="text-slate-400 text-sm">Encontre otakus pelo username, envie pedidos de amizade e monte seu círculo.</p>
          </Link>

          <Link href="/party" className="group bg-slate-800/60 border border-slate-700 hover:border-amber-500 rounded-2xl p-6 transition-all hover:-translate-y-1">
            <div className="text-4xl mb-3">🏰</div>
            <h2 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">Party / Guilda</h2>
            <p className="text-slate-400 text-sm">Crie uma guilda ou entre pelo código de convite. Até 4 membros por party.</p>
          </Link>
        </div>

        {/* Missões disponíveis */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Missões Disponíveis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MISSIONS_DATA.map(m => (
              <Link
                key={m.id}
                href={`/missao/${m.slug}`}
                className="group bg-slate-800/60 border border-slate-700 hover:border-violet-500 rounded-xl p-5 transition-all hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-2xl mr-2">{m.themeEmoji}</span>
                    <span className="text-xs text-slate-500 bg-slate-700 px-2 py-0.5 rounded-full">{m.theme}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: m.difficulty }).map((_, i) => (
                      <span key={i} className="text-amber-400 text-xs">⭐</span>
                    ))}
                  </div>
                </div>
                <h3 className="font-bold text-white group-hover:text-violet-400 transition-colors mb-1">{m.title}</h3>
                <p className="text-slate-400 text-sm line-clamp-2 mb-3">{m.description}</p>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span>⏱️ {m.estimatedMinutes} min</span>
                  <span>✨ {m.xpReward} XP</span>
                  <span>{m.scenes.length} cenas</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link href="/missoes" className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-bold px-8 py-3 rounded-xl transition-colors">
            Ver Todas as Missões
          </Link>
        </div>
      </div>
    </div>
  );
}
