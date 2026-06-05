"use client";

import { useState } from "react";
import type { AnimeCharacter } from "@/data/mock/characters";

interface Props {
  name: string;
  username: string | null;
  character: AnimeCharacter;
  matchPct: number;
  archetypeLabel: string;
}

export default function ShareCard({ name, username, character, matchPct, archetypeLabel }: Props) {
  const [copied, setCopied] = useState(false);

  const profileUrl = username
    ? `https://www.animeinfobr.com.br/u/${username}`
    : "https://www.animeinfobr.com.br/perfil";

  const shareText =
    `🧬 Meu Anime Character DNA no AnimeInfoBR!\n\n` +
    `${character.image} Personagem espelho: ${character.name}\n` +
    `📺 Anime: ${character.anime}\n` +
    `🎭 Arquétipo: ${archetypeLabel}\n` +
    `💯 Compatibilidade: ${matchPct}%\n\n` +
    `⭐ Traços: ${character.traits.slice(0, 3).join(" · ")}\n\n` +
    `Descubra o seu → ${profileUrl}`;

  const waUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

  async function copy() {
    await navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="bg-gradient-to-br from-violet-900/40 via-[#0d1424] to-cyan-900/20 rounded-2xl border border-violet-500/30 p-5">
      {/* Card preview */}
      <div className="flex items-center gap-3 mb-4 p-4 bg-[#080f1e] rounded-xl border border-white/8">
        <div className="text-4xl shrink-0">{character.image}</div>
        <div className="min-w-0">
          <p className="text-white font-black text-base">{character.name}</p>
          <p className="text-violet-300 text-xs">{archetypeLabel}</p>
          <p className="text-slate-400 text-xs">{character.anime} · {matchPct}% compatível</p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-slate-600 text-[10px]">AnimeInfoBR</p>
          <p className="text-slate-600 text-[10px]">Character DNA</p>
        </div>
      </div>

      <p className="text-slate-400 text-xs mb-3 text-center">Compartilhe seu resultado:</p>
      <div className="flex gap-2">
        <a href={waUrl} target="_blank" rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-300 text-sm font-semibold hover:bg-emerald-600/30 transition-colors">
          📲 WhatsApp
        </a>
        <button onClick={copy}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/8 border border-white/10 text-slate-300 text-sm font-medium hover:bg-white/12 transition-colors">
          {copied ? "✓ Copiado!" : "📋 Copiar"}
        </button>
        {username && (
          <a href={profileUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 px-3 py-2.5 rounded-xl bg-violet-600/20 border border-violet-500/30 text-violet-300 text-sm hover:bg-violet-600/30 transition-colors">
            🔗
          </a>
        )}
      </div>
    </div>
  );
}
