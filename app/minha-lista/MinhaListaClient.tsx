"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAnimeList, type AnimeStatus, STATUS_LABELS, STATUS_ICONS } from "@/hooks/useAnimeList";
import { Trash2 } from "lucide-react";

const TABS: { status: AnimeStatus; color: string }[] = [
  { status: "watching", color: "text-cyan-400 border-cyan-500" },
  { status: "want", color: "text-amber-400 border-amber-500" },
  { status: "watched", color: "text-emerald-400 border-emerald-500" },
  { status: "favorite", color: "text-rose-400 border-rose-500" },
];

export default function MinhaListaClient() {
  const { list, removeAnimeFromList, updateAnimeStatus, getAnimeListByStatus } = useAnimeList();
  const [tab, setTab] = useState<AnimeStatus>("watching");
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const items = mounted ? getAnimeListByStatus(tab) : [];
  const totalItems = mounted ? list.length : 0;

  if (!mounted) {
    return (
      <div className="flex justify-center py-16">
        <div className="w-10 h-10 border-4 border-white/10 border-t-violet-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {TABS.map(({ status, color }) => {
          const count = getAnimeListByStatus(status).length;
          const isActive = tab === status;
          return (
            <button
              key={status}
              onClick={() => setTab(status)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                isActive
                  ? `bg-white/10 ${color} border-current`
                  : "bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20"
              }`}
            >
              <span>{STATUS_ICONS[status]}</span>
              {STATUS_LABELS[status]}
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${isActive ? "bg-white/20" : "bg-white/8"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Empty state */}
      {items.length === 0 && (
        <div className="text-center py-16 bg-[#0d1424] rounded-2xl border border-white/8">
          <div className="text-5xl mb-4">{STATUS_ICONS[tab]}</div>
          <p className="text-white font-bold mb-2">Nenhum anime aqui ainda</p>
          <p className="text-slate-500 text-sm mb-6">
            Acesse a página de um anime e clique em &quot;{STATUS_LABELS[tab]}&quot;
          </p>
          <Link href="/anime" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-colors">
            Explorar animes →
          </Link>
        </div>
      )}

      {/* Grid */}
      {items.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {items.map((item) => (
            <div key={item.id} className="group relative flex flex-col rounded-xl overflow-hidden bg-[#0d1424] border border-white/8 hover:border-violet-500/30 transition-all">
              {/* Poster */}
              <div className="relative aspect-[2/3] bg-[#152038] overflow-hidden">
                {item.cover ? (
                  <Image src={item.cover} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 50vw, 20vw" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-20">🎌</div>
                )}
                {/* Remove button */}
                <button
                  onClick={() => removeAnimeFromList(item.id)}
                  className="absolute top-1.5 right-1.5 w-7 h-7 rounded-lg bg-red-500/80 hover:bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remover da lista"
                >
                  <Trash2 size={12} />
                </button>
              </div>

              {/* Info */}
              <div className="p-2.5 flex-1 flex flex-col gap-2">
                <Link href={`/anime/${item.slug}`} className="text-white text-xs font-semibold line-clamp-2 hover:text-violet-300 transition-colors">
                  {item.title}
                </Link>

                {/* Status selector */}
                <select
                  value={item.status}
                  onChange={(e) => updateAnimeStatus(item.id, e.target.value as AnimeStatus)}
                  className="w-full text-[11px] bg-white/5 border border-white/10 text-slate-400 rounded-lg px-2 py-1 focus:outline-none focus:border-violet-500"
                >
                  {TABS.map(({ status }) => (
                    <option key={status} value={status}>{STATUS_ICONS[status]} {STATUS_LABELS[status]}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalItems > 0 && (
        <p className="text-slate-600 text-xs text-center mt-8">
          {totalItems} anime{totalItems !== 1 ? "s" : ""} na sua lista · Salvo localmente no seu dispositivo
        </p>
      )}
    </>
  );
}
