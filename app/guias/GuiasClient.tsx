"use client";

import { useState } from "react";
import Link from "next/link";
import { GUIDES } from "@/data/mock/guides";

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

export default function GuiasClient() {
  const [active, setActive] = useState<string | null>(null);
  const categories = [...new Set(GUIDES.map((g) => g.category))];

  const filtered = active ? GUIDES.filter((g) => g.category === active) : GUIDES;
  const visibleCats = active ? [active] : categories;

  return (
    <>
      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActive(null)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            active === null
              ? "bg-violet-600 text-white"
              : "border border-white/15 text-slate-400 hover:text-white hover:border-white/30"
          }`}
        >
          Todos ({GUIDES.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(active === cat ? null : cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              active === cat
                ? "bg-violet-600 text-white"
                : "border border-white/15 text-slate-400 hover:text-white hover:border-white/30"
            }`}
          >
            {CATEGORY_EMOJIS[cat]} {CATEGORY_LABELS[cat]} ({GUIDES.filter((g) => g.category === cat).length})
          </button>
        ))}
      </div>

      {/* Grouped by category */}
      {visibleCats.map((cat) => {
        const guides = filtered.filter((g) => g.category === cat);
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
    </>
  );
}
