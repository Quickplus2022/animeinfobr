import type { Metadata } from "next";
import Link from "next/link";
import { GUIDES } from "@/data/mock/guides";

export const metadata: Metadata = {
  title: "Guias de Anime — Para Iniciantes e Fãs",
  description:
    "Guias completos em português sobre animes. Ordem correta de franquias, explicações de gêneros e listas para todos os gostos.",
};

const CATEGORY_LABELS: Record<string, string> = {
  iniciante: "Para Iniciantes",
  franquia: "Franquias",
  genero: "Gêneros",
  lista: "Listas",
};

const CATEGORY_EMOJIS: Record<string, string> = {
  iniciante: "🌱",
  franquia: "📺",
  genero: "🎭",
  lista: "📋",
};

export default function GuiasPage() {
  const categories = [...new Set(GUIDES.map((g) => g.category))];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-display text-white mb-2">
          Guias de Anime
        </h1>
        <p className="text-slate-400">
          Tudo o que você precisa saber, em português. Da ordem certa para assistir franquias até entender cada gênero.
        </p>
      </div>

      {/* Category filter buttons */}
      <div className="flex flex-wrap gap-2 mb-8">
        <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-violet-600 text-white">
          Todos ({GUIDES.length})
        </span>
        {categories.map((cat) => (
          <span key={cat} className="px-3 py-1.5 rounded-full text-xs font-medium border border-white/15 text-slate-400">
            {CATEGORY_EMOJIS[cat]} {CATEGORY_LABELS[cat]} ({GUIDES.filter((g) => g.category === cat).length})
          </span>
        ))}
      </div>

      {/* Grouped by category */}
      {categories.map((cat) => {
        const guides = GUIDES.filter((g) => g.category === cat);
        return (
          <section key={cat} className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4">
              {CATEGORY_EMOJIS[cat]} {CATEGORY_LABELS[cat]}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {guides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/guias/${guide.slug}`}
                  className="group flex flex-col p-5 rounded-xl bg-[#0d1424] border border-white/8 hover:border-violet-500/40 transition-all h-full"
                >
                  <div className="text-3xl mb-3">{guide.icon}</div>
                  <h3 className="text-white font-semibold group-hover:text-violet-300 transition-colors mb-2">
                    {guide.title}
                  </h3>
                  <p className="text-slate-400 text-sm line-clamp-3 flex-1">{guide.description}</p>
                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/8">
                    <span className="text-slate-500 text-xs">⏱ {guide.readTime} min de leitura</span>
                    <span className="ml-auto text-violet-400 text-xs font-medium group-hover:text-violet-300">
                      Ler guia →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      {/* Newsletter placeholder */}
      <div className="mt-8 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-violet-900/40 to-[#0d1424] border border-violet-500/20">
        <h2 className="text-xl font-bold text-white mb-2">📬 Novos Guias por E-mail</h2>
        <p className="text-slate-400 text-sm mb-4">
          Receba novos guias, rankings e calendários direto no seu e-mail. Sem spam.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 max-w-md">
          <input
            type="email"
            placeholder="seu@email.com"
            className="flex-1 px-4 py-2.5 bg-white/8 border border-white/12 rounded-xl text-white placeholder-slate-500 text-sm outline-none focus:border-violet-500 transition-colors"
          />
          <button className="px-5 py-2.5 btn-primary text-white font-semibold text-sm rounded-xl whitespace-nowrap">
            Quero receber
          </button>
        </div>
      </div>
    </div>
  );
}
