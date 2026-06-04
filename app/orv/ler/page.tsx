import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ler ORV em Português | AnimeInfoBR",
  description: "Leia Omniscient Reader's Viewpoint (Ponto de Vista do Leitor Onisciente) completo em português. Versão autorizada pelo autor.",
};

export default function ORVLerPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <div className="sticky top-16 z-40 bg-[#0a0f1e]/95 backdrop-blur border-b border-white/8 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Link href="/orv" className="text-slate-400 hover:text-white transition-colors shrink-0">
              ← Voltar
            </Link>
            <span className="text-white/20 shrink-0">|</span>
            <span className="text-white font-semibold text-sm truncate">
              Omniscient Reader&apos;s Viewpoint — PT-BR
            </span>
            <span className="hidden sm:inline px-2 py-0.5 rounded-full text-xs bg-emerald-500/15 text-emerald-300 border border-emerald-500/25 shrink-0">
              Versão autorizada
            </span>
          </div>
          <a
            href="/novels/orv-pt-br.pdf"
            download
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-colors shrink-0"
          >
            ⬇ Baixar PDF
          </a>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 bg-[#060d1a]">
        <iframe
          src="/novels/orv-pt-br.pdf"
          className="w-full"
          style={{ height: "calc(100vh - 128px)", border: "none" }}
          title="Omniscient Reader's Viewpoint — PT-BR"
        />
      </div>

      {/* Mobile fallback */}
      <div className="sm:hidden p-6 text-center bg-[#0d1424] border-t border-white/8">
        <p className="text-slate-400 text-sm mb-4">
          Se o PDF não carregar no celular, use o botão abaixo para abrir ou baixar:
        </p>
        <div className="flex flex-col gap-3">
          <a
            href="/novels/orv-pt-br.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-xl bg-violet-600 text-white font-semibold text-sm"
          >
            📖 Abrir PDF
          </a>
          <a
            href="/novels/orv-pt-br.pdf"
            download
            className="px-5 py-3 rounded-xl border border-white/15 text-slate-300 font-semibold text-sm"
          >
            ⬇ Baixar PDF
          </a>
        </div>
      </div>
    </div>
  );
}
