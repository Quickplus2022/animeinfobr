import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Animes Parecidos: Encontre Títulos Similares",
  description:
    "Já terminou um anime e não sabe o que assistir agora? Encontre animes parecidos com seus favoritos.",
};

const POPULAR_COMPARISONS = [
  { slug: "20-naruto", label: "Naruto", genres: "Ação, Aventura", emoji: "🍥" },
  { slug: "21-one-piece", label: "One Piece", genres: "Aventura, Fantasia", emoji: "🏴‍☠️" },
  { slug: "101922-demon-slayer-kimetsu-no-yaiba", label: "Demon Slayer", genres: "Ação, Sobrenatural", emoji: "⚔️" },
  { slug: "2904-death-note", label: "Death Note", genres: "Thriller, Psicológico", emoji: "📓" },
  { slug: "11061-hunter-x-hunter", label: "Hunter x Hunter", genres: "Ação, Aventura", emoji: "🎯" },
  { slug: "5114-fullmetal-alchemist-brotherhood", label: "FMA: Brotherhood", genres: "Ação, Drama", emoji: "⚗️" },
  { slug: "1535-death-note", label: "Attack on Titan", genres: "Ação, Drama", emoji: "👾" },
  { slug: "11757-sword-art-online", label: "Sword Art Online", genres: "Ação, Isekai", emoji: "🎮" },
  { slug: "9253-steinsgate", label: "Steins;Gate", genres: "Ficção científica, Thriller", emoji: "🕰️" },
  { slug: "30276-one-punch-man", label: "One Punch Man", genres: "Ação, Comédia", emoji: "👊" },
  { slug: "36474-kimetsu-no-yaiba", label: "My Hero Academia", genres: "Ação, Super-heróis", emoji: "🦸" },
  { slug: "108725-solo-leveling", label: "Solo Leveling", genres: "Ação, Fantasia", emoji: "🗡️" },
];

export default function ParecidosPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-display text-white mb-2">
          Animes Parecidos
        </h1>
        <p className="text-slate-400">
          Terminou um anime e não sabe o que assistir? Encontre títulos com gêneros, tom e estilo semelhantes.
        </p>
      </div>

      {/* Popular searches */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold text-white mb-4">
          Buscas Populares
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {POPULAR_COMPARISONS.map((item) => (
            <Link
              key={item.slug}
              href={`/parecidos/${item.slug}`}
              className="flex items-center gap-3 p-4 rounded-xl bg-[#0d1424] border border-white/8 hover:border-violet-500/40 transition-all group"
            >
              <span className="text-2xl shrink-0">{item.emoji}</span>
              <div>
                <p className="text-white font-semibold text-sm group-hover:text-violet-300 transition-colors">
                  Parecido com {item.label}
                </p>
                <p className="text-slate-500 text-xs">{item.genres}</p>
              </div>
              <span className="ml-auto text-slate-600 group-hover:text-violet-400 transition-colors">→</span>
            </Link>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div className="bg-[#0d1424] rounded-2xl border border-white/8 p-6 md:p-8">
        <h2 className="text-lg font-bold text-white mb-4">Como funciona?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { step: "1", icon: "🔍", title: "Escolha um anime", desc: "Selecione o anime que você terminou ou ama" },
            { step: "2", icon: "🧠", title: "Analisamos os dados", desc: "Verificamos gêneros, tags e recomendações da comunidade" },
            { step: "3", icon: "🎯", title: "Receba sugestões", desc: "Veja animes com estilo e tema semelhantes" },
          ].map((s) => (
            <div key={s.step} className="text-center">
              <div className="text-3xl mb-2">{s.icon}</div>
              <h3 className="text-white font-semibold mb-1">{s.title}</h3>
              <p className="text-slate-400 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Search any anime */}
      <div className="mt-8 text-center">
        <p className="text-slate-400 mb-3">Não encontrou seu anime aqui?</p>
        <Link
          href="/anime"
          className="inline-flex items-center gap-2 px-6 py-2.5 btn-primary text-white font-semibold rounded-xl"
        >
          🔍 Buscar qualquer anime
        </Link>
      </div>
    </div>
  );
}
