import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ler ORV em Português | AnimeInfoBR",
  description:
    "Leia Omniscient Reader's Viewpoint (Ponto de Vista do Leitor Onisciente) completo em português. Versão autorizada pelo autor.",
};

const PDF_URL = "https://www.animeinfobr.com.br/novels/orv-pt-br.pdf";
const GDOCS_URL = `https://docs.google.com/viewer?url=${encodeURIComponent(PDF_URL)}&embedded=true`;

export default function ORVLerPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#060d1a]">
      {/* Top bar */}
      <div className="sticky top-16 z-40 bg-[#0a0f1e]/95 backdrop-blur border-b border-white/8 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Link href="/orv" className="text-slate-400 hover:text-white transition-colors shrink-0 text-sm">
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
            href={PDF_URL}
            download="ORV-PT-BR.pdf"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-colors shrink-0"
          >
            ⬇ Baixar
          </a>
        </div>
      </div>

      {/* Action buttons — visible on mobile and as fallback */}
      <div className="bg-[#0d1424] border-b border-white/8 px-4 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-3 items-center justify-between">
          <p className="text-slate-400 text-sm">
            <span className="text-white font-medium">Novel completo</span> · 560+ capítulos · PT-BR
          </p>
          <div className="flex gap-2">
            <a
              href={PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors"
            >
              📖 Abrir em nova aba
            </a>
            <a
              href={PDF_URL}
              download="ORV-PT-BR.pdf"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors"
            >
              ⬇ Baixar PDF
            </a>
          </div>
        </div>
      </div>

      {/* PDF viewer — uses Google Docs viewer for broad compatibility */}
      <div className="flex-1 relative">
        <iframe
          src={GDOCS_URL}
          className="w-full"
          style={{ height: "calc(100vh - 180px)", border: "none", minHeight: "500px" }}
          title="Omniscient Reader's Viewpoint — PT-BR"
          allowFullScreen
        />
      </div>

      {/* Mobile / fallback message */}
      <div className="bg-[#0d1424] border-t border-white/8 p-4 text-center">
        <p className="text-slate-500 text-xs">
          Se o leitor não abrir, use{" "}
          <a href={PDF_URL} target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300">
            Abrir em nova aba
          </a>{" "}
          ou{" "}
          <a href={PDF_URL} download className="text-violet-400 hover:text-violet-300">
            Baixar o PDF
          </a>
          .
        </p>
      </div>
    </div>
  );
}
