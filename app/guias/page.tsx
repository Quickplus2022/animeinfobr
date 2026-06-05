import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/newsletter/NewsletterForm";
import GuiasClient from "./GuiasClient";

export const metadata: Metadata = {
  title: "Guias de Anime: Para Iniciantes e Fãs",
  description:
    "Guias completos em português sobre animes. Ordem correta de franquias, explicações de gêneros e listas para todos os gostos.",
};

export default function GuiasPage() {
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

      {/* EXTRA destaque - ORV */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">⭐ Extras</h2>
        <Link
          href="/orv"
          className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 rounded-xl bg-gradient-to-r from-violet-900/40 via-indigo-900/30 to-[#0d1424] border border-violet-500/30 hover:border-violet-400/60 transition-all"
        >
          <div className="text-4xl shrink-0">📖</div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wider">★ EXTRA</span>
              <span className="px-2 py-0.5 rounded-full text-xs bg-violet-500/15 text-violet-300 border border-violet-500/25">Manhwa · Web Novel</span>
            </div>
            <h3 className="text-white font-bold text-lg group-hover:text-violet-300 transition-colors">
              Omniscient Reader&apos;s Viewpoint: Guia Definitivo
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              Personagens, sistema de poderes, constelações, ordem de leitura e por que ORV é considerado uma obra-prima. O guia mais completo em português.
            </p>
          </div>
          <span className="text-violet-400 text-sm font-medium group-hover:text-violet-300 shrink-0">
            Ver guia →
          </span>
        </Link>
      </div>

      <GuiasClient />

      {/* Newsletter */}
      <div className="mt-8 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-violet-900/40 to-[#0d1424] border border-violet-500/20">
        <h2 className="text-xl font-bold text-white mb-2">📬 Novos Guias por E-mail</h2>
        <p className="text-slate-400 text-sm mb-4">
          Receba novos guias, rankings e calendários direto no seu e-mail. Sem spam.
        </p>
        <NewsletterForm />
      </div>
    </div>
  );
}
