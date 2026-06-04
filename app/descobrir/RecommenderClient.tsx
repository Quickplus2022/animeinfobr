"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createAnimeSlug, getDisplayTitle } from "@/lib/anilist/services";
import type { AniListMedia } from "@/lib/anilist/services";

const STEPS = [
  {
    id: "mood",
    question: "Qual clima você quer hoje?",
    emoji: "🎭",
    options: [
      { label: "Ação e batalhas", value: "Action", emoji: "⚔️" },
      { label: "Romance e drama", value: "Romance", emoji: "💕" },
      { label: "Comédia e leveza", value: "Comedy", emoji: "😂" },
      { label: "Mistério e suspense", value: "Mystery", emoji: "🕵️" },
      { label: "Fantasia e aventura", value: "Fantasy", emoji: "🔮" },
      { label: "Ficção científica", value: "Sci-Fi", emoji: "🚀" },
      { label: "Terror e horror", value: "Horror", emoji: "👻" },
      { label: "Slice of life", value: "Slice of Life", emoji: "🌸" },
    ],
  },
  {
    id: "time",
    question: "Quanto tempo você tem?",
    emoji: "⏱️",
    options: [
      { label: "Curto (12 eps)", value: "short", emoji: "⚡" },
      { label: "Médio (24-50 eps)", value: "medium", emoji: "📺" },
      { label: "Longo (100+ eps)", value: "long", emoji: "🏃" },
      { label: "Prefiro filmes", value: "movie", emoji: "🎬" },
    ],
  },
  {
    id: "intensity",
    question: "Que nível de intensidade?",
    emoji: "🔥",
    options: [
      { label: "Leve e relaxante", value: "chill", emoji: "☁️" },
      { label: "Envolvente", value: "moderate", emoji: "🌊" },
      { label: "Intenso e pesado", value: "intense", emoji: "🔥" },
      { label: "Me surpreenda!", value: "surprise", emoji: "🎲" },
    ],
  },
  {
    id: "experience",
    question: "Qual sua experiência?",
    emoji: "🎌",
    options: [
      { label: "Iniciante total", value: "beginner", emoji: "🌱" },
      { label: "Assisto alguns", value: "intermediate", emoji: "🌿" },
      { label: "Otaku experiente", value: "expert", emoji: "🌳" },
      { label: "Voltando após tempo", value: "returning", emoji: "🔄" },
    ],
  },
  {
    id: "spoiler",
    question: "Quer evitar spoilers?",
    emoji: "🚫",
    options: [
      { label: "Sim, por favor!", value: "yes", emoji: "🙈" },
      { label: "Não me importo", value: "no", emoji: "😏" },
    ],
  },
];

export default function RecommenderClient() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<AniListMedia[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalSteps = STEPS.length;
  const current = STEPS[step];
  const progress = ((step) / totalSteps) * 100;

  async function fetchResults(finalAnswers: Record<string, string>) {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (finalAnswers.mood) params.set("genre", finalAnswers.mood);
      if (finalAnswers.time === "movie") params.set("format", "MOVIE");
      params.set("perPage", "12");

      const res = await fetch(`/api/anime/recommend?${params}`);
      if (!res.ok) throw new Error("Erro ao buscar recomendações");
      const data = await res.json();
      setResults(data.media ?? []);
    } catch {
      setError("Não foi possível carregar as recomendações. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  function selectOption(value: string) {
    const newAnswers = { ...answers, [current.id]: value };
    setAnswers(newAnswers);

    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      fetchResults(newAnswers);
    }
  }

  function restart() {
    setStep(0);
    setAnswers({});
    setResults(null);
    setError(null);
  }

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="w-16 h-16 mx-auto border-4 border-white/10 border-t-violet-500 rounded-full animate-spin mb-6" />
        <p className="text-slate-300 text-lg font-semibold">Buscando recomendações perfeitas para você...</p>
        <p className="text-slate-500 text-sm mt-2">Consultando nossa base de dados</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">⚠️</div>
        <p className="text-white text-lg font-semibold mb-2">Algo deu errado</p>
        <p className="text-slate-400 text-sm mb-6">{error}</p>
        <button
          onClick={() => fetchResults(answers)}
          className="px-6 py-2.5 btn-primary text-white font-semibold rounded-xl mr-3"
        >
          Tentar novamente
        </button>
        <button onClick={restart} className="px-6 py-2.5 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl transition-colors">
          Recomeçar
        </button>
      </div>
    );
  }

  if (results !== null) {
    return (
      <div>
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🎉</div>
          <h2 className="text-2xl font-bold font-display text-white mb-2">
            Suas Recomendações Personalizadas
          </h2>
          <p className="text-slate-400 text-sm">
            Baseado nas suas preferências, selecionamos {results.length} animes para você.
          </p>
        </div>

        {results.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-slate-400 mb-4">Não encontramos resultados exatos. Tente outras preferências.</p>
            <button onClick={restart} className="px-6 py-2.5 btn-primary text-white font-semibold rounded-xl">
              Tentar novamente
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
              {results.map((anime) => {
                const slug = createAnimeSlug(anime.id, anime.title);
                const title = getDisplayTitle(anime.title);
                const score = anime.averageScore ? (anime.averageScore / 10).toFixed(1) : null;
                return (
                  <Link
                    key={anime.id}
                    href={`/anime/${slug}`}
                    className="group relative flex flex-col rounded-xl overflow-hidden bg-[#0d1424] border border-white/8 hover:border-violet-500/40 transition-all duration-300"
                  >
                    <div className="relative aspect-[2/3] overflow-hidden bg-[#152038]">
                      {anime.coverImage.large && (
                        <Image
                          src={anime.coverImage.large}
                          alt={title}
                          fill
                          sizes="(max-width: 640px) 50vw, 25vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                      {score && (
                        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-full px-2 py-0.5 flex items-center gap-0.5">
                          <span className="text-yellow-400 text-xs">★</span>
                          <span className="text-white text-xs font-bold">{score}</span>
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <h3 className="text-white font-semibold text-sm line-clamp-2 group-hover:text-violet-300 transition-colors">
                        {title}
                      </h3>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {anime.genres.slice(0, 2).map((g) => (
                          <span key={g} className="text-[10px] text-violet-400 bg-violet-900/30 px-1.5 py-0.5 rounded-full">
                            {g}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={restart}
                className="px-6 py-2.5 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl transition-colors"
              >
                🔄 Tentar com outras preferências
              </button>
              <Link
                href="/anime"
                className="px-6 py-2.5 btn-primary text-white font-semibold rounded-xl text-center"
              >
                🔍 Explorar todos os animes
              </Link>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="bg-[#0d1424] rounded-2xl border border-white/8 p-6 md:p-8">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs text-slate-500 mb-2">
          <span>Pergunta {step + 1} de {totalSteps}</span>
          <span>{Math.round(progress)}% concluído</span>
        </div>
        <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-violet-600 to-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="text-center mb-8">
        <div className="text-4xl mb-3">{current.emoji}</div>
        <h2 className="text-xl md:text-2xl font-bold font-display text-white">
          {current.question}
        </h2>
      </div>

      {/* Options */}
      <div className={`grid gap-3 ${current.options.length <= 4 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-2 sm:grid-cols-4"}`}>
        {current.options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => selectOption(opt.value)}
            className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/50 hover:bg-violet-500/10 text-left transition-all group"
          >
            <span className="text-2xl shrink-0">{opt.emoji}</span>
            <span className="text-slate-300 group-hover:text-white font-medium text-sm transition-colors">
              {opt.label}
            </span>
          </button>
        ))}
      </div>

      {/* Back */}
      {step > 0 && (
        <button
          onClick={() => setStep(step - 1)}
          className="mt-6 text-slate-500 hover:text-slate-300 text-sm transition-colors"
        >
          ← Voltar
        </button>
      )}
    </div>
  );
}
