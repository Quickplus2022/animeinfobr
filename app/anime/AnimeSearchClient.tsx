"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export default function AnimeSearchClient({ initialQuery }: { initialQuery: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [, startTransition] = useTransition();
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    startTransition(() => {
      router.push(q ? `/anime?q=${encodeURIComponent(q)}` : "/anime");
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <div className="relative flex-1">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Nome do anime..."
          className="w-full pl-9 pr-4 py-2.5 bg-[#0d1424] border border-white/12 focus:border-violet-500 rounded-xl text-white placeholder-slate-500 text-sm outline-none transition-colors"
        />
      </div>
      <button
        type="submit"
        className="px-5 py-2.5 btn-primary text-white font-semibold text-sm rounded-xl"
      >
        Buscar
      </button>
    </form>
  );
}
