import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página não encontrada | AnimeInfoBR",
};

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-8rem)] hero-bg flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl mb-6">🎌</div>
        <h1 className="text-6xl font-black font-display gradient-text mb-4">404</h1>
        <h2 className="text-2xl font-bold text-white mb-3">Página não encontrada</h2>
        <p className="text-slate-400 mb-8">
          Esta página não existe ou foi movida. Mas temos muitos animes para você descobrir!
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold"
          >
            🏠 Voltar ao Início
          </Link>
          <Link
            href="/anime"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/8 border border-white/12 hover:border-white/25 text-white font-semibold transition-all"
          >
            🔍 Buscar Animes
          </Link>
        </div>
      </div>
    </div>
  );
}
