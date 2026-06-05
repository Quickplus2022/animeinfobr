"use client";

import type { AnimeDNA } from "@/data/mock/characters";

const DNA_LABELS: Record<keyof AnimeDNA, string> = {
  action: "Ação", romance: "Romance", mystery: "Mistério", comedy: "Comédia",
  fantasy: "Fantasia", drama: "Drama", psychological: "Psicológico",
  adventure: "Aventura", sliceOfLife: "Slice of Life", sciFi: "Sci-Fi",
};

const DNA_COLORS: Partial<Record<keyof AnimeDNA, string>> = {
  action: "bg-red-500", romance: "bg-pink-500", mystery: "bg-indigo-500",
  comedy: "bg-yellow-500", fantasy: "bg-violet-500", drama: "bg-slate-500",
  psychological: "bg-cyan-500", adventure: "bg-emerald-500",
  sliceOfLife: "bg-teal-500", sciFi: "bg-blue-500",
};

interface Props { dna: AnimeDNA; }

export default function AnimeDNAChart({ dna }: Props) {
  const sorted = (Object.entries(dna) as [keyof AnimeDNA, number][])
    .sort((a, b) => b[1] - a[1]);

  return (
    <div className="bg-[#0d1424] rounded-2xl border border-white/8 p-5">
      <h3 className="text-white font-bold mb-1">🧬 Anime DNA</h3>
      <p className="text-slate-500 text-xs mb-4">Sua mistura única de gêneros com base no teste de personalidade.</p>
      <div className="space-y-2.5">
        {sorted.map(([key, value]) => (
          <div key={key}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300 font-medium">{DNA_LABELS[key]}</span>
              <span className="text-slate-500">{value}%</span>
            </div>
            <div className="h-2 bg-white/8 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${DNA_COLORS[key] ?? "bg-violet-500"}`}
                style={{ width: `${value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
