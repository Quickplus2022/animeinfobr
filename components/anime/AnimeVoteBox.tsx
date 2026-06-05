"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Vote = "liked" | "disliked" | "masterpiece" | "overrated";

interface Props {
  animeId: number;
  slug: string;
  title: string;
}

const VOTES: { id: Vote; icon: string; label: string; activeClass: string }[] = [
  { id: "masterpiece", icon: "🏆", label: "Obra-prima", activeClass: "bg-amber-500/20 border-amber-500/50 text-amber-300" },
  { id: "liked", icon: "👍", label: "Gostei", activeClass: "bg-emerald-500/20 border-emerald-500/50 text-emerald-300" },
  { id: "disliked", icon: "👎", label: "Não gostei", activeClass: "bg-red-500/20 border-red-500/50 text-red-300" },
  { id: "overrated", icon: "💤", label: "Superestimado", activeClass: "bg-slate-500/20 border-slate-500/50 text-slate-300" },
];

const KEY = "aibr_votes";

function getMockCount(animeId: number, type: string): number {
  const seed = (animeId * (type.charCodeAt(0) + 7)) % 8500;
  return 1200 + seed;
}

function getVote(animeId: number): Vote | null {
  if (typeof window === "undefined") return null;
  try {
    const data = JSON.parse(localStorage.getItem(KEY) ?? "{}");
    return data[animeId] ?? null;
  } catch { return null; }
}

function saveVote(animeId: number, vote: Vote | null): void {
  try {
    const data = JSON.parse(localStorage.getItem(KEY) ?? "{}");
    if (vote === null) delete data[animeId]; else data[animeId] = vote;
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch { /* noop */ }
}

export default function AnimeVoteBox({ animeId, slug, title }: Props) {
  const [vote, setVote] = useState<Vote | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setVote(getVote(animeId));
  }, [animeId]);

  function handle(v: Vote) {
    const next = vote === v ? null : v;
    setVote(next);
    saveVote(animeId, next);
  }

  return (
    <div className="bg-[#0d1424] rounded-xl border border-white/8 p-5">
      <h3 className="text-white font-bold mb-1">O que você acha de {title}?</h3>
      <p className="text-slate-500 text-xs mb-4">Sua opinião anônima, salva localmente.</p>

      {!mounted ? (
        <div className="flex flex-wrap gap-2">
          {VOTES.map((v) => <div key={v.id} className="h-9 w-28 rounded-xl bg-white/5 animate-pulse" />)}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2 mb-4">
          {VOTES.map((v) => {
            const isActive = vote === v.id;
            const count = getMockCount(animeId, v.id);
            return (
              <button
                key={v.id}
                onClick={() => handle(v.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-sm font-medium transition-all ${isActive ? v.activeClass : "bg-white/5 border-white/10 text-slate-400 hover:border-white/20 hover:text-white"}`}
              >
                <span>{v.icon}</span>
                <span>{v.label}</span>
                <span className={`text-xs ${isActive ? "opacity-80" : "opacity-40"}`}>
                  {(count + (isActive ? 1 : 0)).toLocaleString("pt-BR")}
                </span>
              </button>
            );
          })}
        </div>
      )}

      <Link
        href={`/parecidos/${slug}`}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600/20 border border-violet-500/30 text-violet-300 hover:bg-violet-600/30 text-sm font-medium transition-colors"
      >
        🔍 Ver animes parecidos
      </Link>
    </div>
  );
}
