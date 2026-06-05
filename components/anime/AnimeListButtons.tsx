"use client";

import { useState, useEffect } from "react";
import { useAnimeList, type AnimeStatus } from "@/hooks/useAnimeList";

interface Props {
  animeId: number;
  slug: string;
  title: string;
  cover?: string | null;
}

const BUTTONS: { status: AnimeStatus; icon: string; label: string; activeClass: string; inactiveClass: string }[] = [
  {
    status: "want",
    icon: "📌",
    label: "Quero Assistir",
    activeClass: "bg-amber-500/20 border-amber-500/50 text-amber-300",
    inactiveClass: "bg-white/5 border-white/12 text-slate-400 hover:border-amber-500/30 hover:text-amber-300",
  },
  {
    status: "watching",
    icon: "👁️",
    label: "Assistindo",
    activeClass: "bg-cyan-500/20 border-cyan-500/50 text-cyan-300",
    inactiveClass: "bg-white/5 border-white/12 text-slate-400 hover:border-cyan-500/30 hover:text-cyan-300",
  },
  {
    status: "watched",
    icon: "✅",
    label: "Já Assisti",
    activeClass: "bg-emerald-500/20 border-emerald-500/50 text-emerald-300",
    inactiveClass: "bg-white/5 border-white/12 text-slate-400 hover:border-emerald-500/30 hover:text-emerald-300",
  },
  {
    status: "favorite",
    icon: "❤️",
    label: "Favorito",
    activeClass: "bg-rose-500/20 border-rose-500/50 text-rose-300",
    inactiveClass: "bg-white/5 border-white/12 text-slate-400 hover:border-rose-500/30 hover:text-rose-300",
  },
];

export default function AnimeListButtons({ animeId, slug, title, cover }: Props) {
  const { addAnimeToList, removeAnimeFromList, isAnimeSaved } = useAnimeList();
  const [current, setCurrent] = useState<AnimeStatus | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCurrent(isAnimeSaved(animeId));
  }, [animeId, isAnimeSaved]);

  function handle(status: AnimeStatus) {
    if (current === status) {
      removeAnimeFromList(animeId);
      setCurrent(null);
    } else {
      addAnimeToList({ id: animeId, slug, title, cover: cover ?? null, status });
      setCurrent(status);
    }
  }

  if (!mounted) {
    return (
      <div className="flex flex-wrap gap-2">
        {BUTTONS.map((b) => (
          <div key={b.status} className="h-9 w-32 rounded-xl bg-white/5 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {BUTTONS.map((btn) => {
        const isActive = current === btn.status;
        return (
          <button
            key={btn.status}
            onClick={() => handle(btn.status)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-sm font-medium transition-all ${isActive ? btn.activeClass : btn.inactiveClass}`}
          >
            <span>{btn.icon}</span>
            {btn.label}
            {isActive && <span className="text-xs opacity-70">✓</span>}
          </button>
        );
      })}
    </div>
  );
}
