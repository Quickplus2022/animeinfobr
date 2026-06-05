"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { DUELS, type Duel } from "@/data/mock/duelos";
import { trackDuelVote } from "@/lib/missions";

const VOTES_KEY = "aibr_duel_votes";

function getDuelVotes(): Record<string, "a" | "b"> {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem(VOTES_KEY) ?? "{}"); } catch { return {}; }
}

function saveDuelVote(slug: string, side: "a" | "b"): void {
  const votes = getDuelVotes();
  votes[slug] = side;
  localStorage.setItem(VOTES_KEY, JSON.stringify(votes));
  trackDuelVote();
}

function getMockVotes(duel: Duel): { a: number; b: number } {
  const seedA = (duel.a.id * 31) % 7000 + 8000;
  const seedB = (duel.b.id * 17) % 7000 + 8000;
  return { a: seedA, b: seedB };
}

function DuelCard({ duel }: { duel: Duel }) {
  const [vote, setVote] = useState<"a" | "b" | null>(null);
  const [mounted, setMounted] = useState(false);
  const mockVotes = getMockVotes(duel);

  useEffect(() => {
    setMounted(true);
    const votes = getDuelVotes();
    setVote(votes[duel.slug] ?? null);
  }, [duel.slug]);

  function handle(side: "a" | "b") {
    if (vote) return;
    setVote(side);
    saveDuelVote(duel.slug, side);
  }

  const total = mockVotes.a + mockVotes.b + (vote === "a" ? 1 : 0) + (vote === "b" ? 1 : 0);
  const pctA = Math.round(((mockVotes.a + (vote === "a" ? 1 : 0)) / total) * 100);
  const pctB = 100 - pctA;

  const shareText = encodeURIComponent(
    `⚔️ Duelo de Anime no AnimeInfoBR!\n${duel.a.title} vs ${duel.b.title}\n"${duel.question}"\nVote você também: animeinfobr.com.br/duelos`
  );

  return (
    <div className="bg-[#0d1424] rounded-2xl border border-white/8 overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-5 pb-3 text-center">
        <span className="text-2xl">{duel.emoji}</span>
        <p className="text-white font-bold mt-1">{duel.question}</p>
      </div>

      {/* VS grid */}
      <div className="grid grid-cols-2 gap-px bg-white/8">
        {(["a", "b"] as const).map((side) => {
          const anime = duel[side];
          const pct = side === "a" ? pctA : pctB;
          const isVoted = vote === side;
          const isOther = vote !== null && vote !== side;

          return (
            <button
              key={side}
              onClick={() => handle(side)}
              disabled={!!vote}
              className={`group flex flex-col items-center gap-3 p-4 transition-all ${
                isVoted ? "bg-violet-500/15" : isOther ? "bg-white/3 opacity-60" : "bg-[#0d1424] hover:bg-white/5 cursor-pointer"
              }`}
            >
              {/* Cover */}
              <div className={`relative w-24 h-32 rounded-xl overflow-hidden shadow-lg transition-transform ${!vote ? "group-hover:scale-105" : ""}`}>
                {anime.cover ? (
                  <Image src={anime.cover} alt={anime.title} fill className="object-cover" sizes="96px" />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-900/50 to-[#0d1424] flex items-center justify-center text-3xl">
                    🎌
                  </div>
                )}
                {isVoted && (
                  <div className="absolute inset-0 bg-violet-500/30 flex items-center justify-center text-2xl">✓</div>
                )}
              </div>

              <p className={`font-bold text-sm text-center line-clamp-2 ${isVoted ? "text-violet-300" : "text-white"}`}>
                {anime.title}
              </p>

              {/* Progress */}
              {mounted && vote && (
                <div className="w-full">
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden mb-1">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${isVoted ? "bg-violet-500" : "bg-white/30"}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <p className={`text-xs font-bold ${isVoted ? "text-violet-400" : "text-slate-500"}`}>{pct}%</p>
                </div>
              )}

              {!vote && (
                <span className="text-xs text-slate-500 group-hover:text-violet-400 transition-colors font-medium">
                  Votar →
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer */}
      {vote && (
        <div className="px-5 py-3 flex flex-wrap items-center justify-between gap-2 border-t border-white/8">
          <p className="text-slate-500 text-xs">
            {(total).toLocaleString("pt-BR")} votos
          </p>
          <a
            href={`https://wa.me/?text=${shareText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 text-xs font-medium hover:bg-emerald-600/30 transition-colors"
          >
            📲 Chamar alguém para votar
          </a>
        </div>
      )}
    </div>
  );
}

export default function DuelosClient() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {DUELS.map((duel) => (
        <DuelCard key={duel.slug} duel={duel} />
      ))}
    </div>
  );
}
