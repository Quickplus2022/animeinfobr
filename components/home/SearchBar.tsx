"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [, startTransition] = useTransition();
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    startTransition(() => {
      router.push(`/anime?q=${encodeURIComponent(q)}`);
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full max-w-2xl"
      role="search"
    >
      <div className="relative flex items-center">
        <svg
          className="absolute left-4 w-5 h-5 text-slate-500 pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar anime... ex: Naruto, Solo Leveling, Demon Slayer"
          className="w-full pl-12 pr-32 py-4 bg-white/8 border border-white/12 hover:border-violet-500/40 focus:border-violet-500 rounded-2xl text-white placeholder-slate-500 text-base outline-none transition-all backdrop-blur-sm"
          aria-label="Buscar anime"
        />
        <button
          type="submit"
          className="absolute right-2 px-5 py-2 btn-primary text-white font-semibold text-sm rounded-xl transition-all"
        >
          Buscar
        </button>
      </div>
    </form>
  );
}
