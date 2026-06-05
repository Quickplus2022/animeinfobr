"use client";

import { useState, useEffect } from "react";
import { trackMission } from "@/lib/missions";
import Link from "next/link";
import Image from "next/image";
import { QUIZ_QUESTIONS, getQuizResult } from "@/data/mock/quiz";
import type { AniListMedia } from "@/lib/anilist/services";
import { getDisplayTitle, createAnimeSlug } from "@/lib/anilist/services";

export default function QuizClient() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{
    title: string;
    description: string;
    emoji: string;
    genres: string[];
    highlights: string[];
    animes: AniListMedia[];
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const total = QUIZ_QUESTIONS.length;
  const current = QUIZ_QUESTIONS[step];
  const progress = (step / total) * 100;

  async function selectAnswer(value: string) {
    const newAnswers = { ...answers, [current.id]: value };
    setAnswers(newAnswers);

    if (step < total - 1) {
      setStep(step + 1);
    } else {
      // Finished - fetch results
      setLoading(true);
      const quizResult = getQuizResult(newAnswers);

      try {
        const params = new URLSearchParams({
          genre: quizResult.genres[0] ?? "Action",
          perPage: "8",
          ...(quizResult.formats[0] === "MOVIE" ? { format: "MOVIE" } : {}),
        });
        const res = await fetch(`/api/anime/recommend?${params}`);
        const data = await res.json();
        setResult({ ...quizResult, animes: data.media ?? [] });
        trackMission("quiz");
      } catch {
        setResult({ ...quizResult, animes: [] });
      } finally {
        setLoading(false);
      }
    }
  }

  function restart() {
    setStep(0);
    setAnswers({});
    setResult(null);
  }

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="w-16 h-16 mx-auto border-4 border-white/10 border-t-violet-500 rounded-full animate-spin mb-6" />
        <p className="text-slate-300 text-lg font-semibold">Calculando seu resultado...</p>
      </div>
    );
  }

  if (result) {
    const shareText = `🎌 Fiz o Quiz do AnimeInfoBR!\n\n${result.emoji} ${result.title}\n"${result.description}"\n\n🎭 ${result.genres.join(", ")}\n⭐ ${result.highlights.join(", ")}\n\nFaça o seu → animeinfobr.com.br/quiz`;
    const waUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

    function copyResult() {
      navigator.clipboard.writeText(shareText).then(() => alert("Resultado copiado! 🎌")).catch(() => {});
    }

    return (
      <div className="animate-fade-in">
        {/* Result card */}
        <div className="bg-gradient-to-br from-violet-900/40 via-[#0d1424] to-cyan-900/20 rounded-2xl border border-violet-500/30 p-6 md:p-8 mb-8 text-center">
          <div className="text-6xl mb-4 animate-bounce">{result.emoji}</div>
          <h2 className="text-2xl md:text-3xl font-black font-display text-white mb-3">
            {result.title}
          </h2>
          <p className="text-slate-300 mb-4 max-w-md mx-auto">{result.description}</p>

          {/* Genres */}
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {result.genres.map((g) => (
              <span key={g} className="px-3 py-1 rounded-full bg-violet-900/40 text-violet-300 border border-violet-800/50 text-sm font-medium">
                {g}
              </span>
            ))}
          </div>

          {/* Highlights */}
          {result.highlights.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <span className="text-slate-500 text-xs self-center">Animes ideais:</span>
              {result.highlights.map((h) => (
                <span key={h} className="px-2.5 py-1 rounded-lg bg-cyan-900/30 text-cyan-300 border border-cyan-800/40 text-xs font-medium">
                  ⭐ {h}
                </span>
              ))}
            </div>
          )}

          {/* Share buttons */}
          <div className="flex flex-wrap justify-center gap-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/40 text-emerald-300 rounded-xl text-sm font-semibold transition-colors"
            >
              📲 Compartilhar no WhatsApp
            </a>
            <button
              onClick={copyResult}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/30 text-blue-300 rounded-xl text-sm font-medium transition-colors"
            >
              📋 Copiar resultado
            </button>
            <button
              onClick={restart}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/8 hover:bg-white/12 border border-white/10 text-slate-300 rounded-xl text-sm font-medium transition-colors"
            >
              🔄 Refazer
            </button>
          </div>
        </div>

        {/* Recommended animes */}
        {result.animes.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Animes Recomendados para Você</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {result.animes.slice(0, 8).map((anime) => {
                const slug = createAnimeSlug(anime.id, anime.title);
                const title = getDisplayTitle(anime.title);
                const score = anime.averageScore ? (anime.averageScore / 10).toFixed(1) : null;
                return (
                  <Link
                    key={anime.id}
                    href={`/anime/${slug}`}
                    className="group relative flex flex-col rounded-xl overflow-hidden bg-[#0d1424] border border-white/8 hover:border-violet-500/40 transition-all"
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
                        <div className="absolute top-1.5 right-1.5 bg-black/70 rounded-full px-1.5 py-0.5 flex items-center gap-0.5">
                          <span className="text-yellow-400 text-[10px]">★</span>
                          <span className="text-white text-[10px] font-bold">{score}</span>
                        </div>
                      )}
                    </div>
                    <div className="p-2.5">
                      <h4 className="text-white text-xs font-semibold line-clamp-2 group-hover:text-violet-300 transition-colors">
                        {title}
                      </h4>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="text-center">
              <Link href="/descobrir" className="inline-flex items-center gap-2 px-6 py-2.5 btn-primary text-white font-semibold rounded-xl">
                🎯 Recomendador Inteligente
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-[#0d1424] rounded-2xl border border-white/8 p-6 md:p-8">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-xs text-slate-500 mb-2">
          <span>Pergunta {step + 1} de {total}</span>
          <span>{Math.round((step / total) * 100)}%</span>
        </div>
        <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-violet-600 to-cyan-500 rounded-full transition-all duration-500"
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {current.options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => selectAnswer(opt.value)}
            className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/50 hover:bg-violet-500/10 text-left transition-all group"
          >
            <span className="text-2xl shrink-0">{opt.emoji}</span>
            <span className="text-slate-300 group-hover:text-white font-medium text-sm">
              {opt.label}
            </span>
          </button>
        ))}
      </div>

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
