"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { TEST_QUESTIONS, getCharacterResult, type ArchetypeScore, type AnimeCharacter } from "@/data/mock/characters";
import type { Archetype } from "@/data/mock/characters";

const KEY = "aibr_char_dna";

const ARCHETYPE_COLORS: Record<Archetype, string> = {
  coracao: "text-rose-400 border-rose-500/40 bg-rose-500/10",
  mente: "text-cyan-400 border-cyan-500/40 bg-cyan-500/10",
  forca: "text-amber-400 border-amber-500/40 bg-amber-500/10",
  espirito: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10",
  conexao: "text-violet-400 border-violet-500/40 bg-violet-500/10",
};

function CharacterCard({ char, label, match }: { char: AnimeCharacter; label: string; match: number }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={`rounded-2xl border p-5 transition-all ${ARCHETYPE_COLORS[char.archetype]}`}>
      <div className="flex items-start gap-3 mb-3">
        <div className="text-4xl shrink-0">{char.image ?? "🎌"}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <span className="text-white/40 text-xs font-semibold uppercase">{label}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 font-bold">{match}% compatível</span>
          </div>
          <h3 className="text-white font-black text-lg leading-tight">{char.name}</h3>
          <p className="text-slate-400 text-xs">{char.anime}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {char.traits.map((t) => (
          <span key={t} className="text-[11px] px-2 py-0.5 rounded-full bg-white/8 border border-white/10 text-slate-300">{t}</span>
        ))}
      </div>

      <blockquote className="text-slate-400 text-xs italic border-l-2 border-current pl-3 mb-3">
        &ldquo;{char.quote}&rdquo;
      </blockquote>

      <button onClick={() => setExpanded(v => !v)} className="text-xs font-semibold opacity-60 hover:opacity-100 transition-opacity">
        {expanded ? "▲ Menos" : "▼ Ver ficha técnica"}
      </button>

      {expanded && (
        <div className="mt-3 space-y-2 border-t border-white/10 pt-3">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <p className="text-slate-500 uppercase tracking-wider mb-0.5">Arquétipo</p>
              <p className="text-white font-semibold">{char.archetypeLabel}</p>
            </div>
            <div>
              <p className="text-slate-500 uppercase tracking-wider mb-0.5">Idade</p>
              <p className="text-white font-semibold">{char.age}</p>
            </div>
          </div>
          <div className="text-xs">
            <p className="text-slate-500 uppercase tracking-wider mb-0.5">Habilidade especial</p>
            <p className="text-slate-300">{char.ability}</p>
          </div>
          <div className="text-xs">
            <p className="text-slate-500 uppercase tracking-wider mb-0.5">Sobre ele/ela</p>
            <p className="text-slate-300 leading-relaxed">{char.description}</p>
          </div>
          <div className="text-xs">
            <p className="text-slate-500 uppercase tracking-wider mb-0.5">Personagens parecidos</p>
            <p className="text-slate-300">{char.similarTo.join(" · ")}</p>
          </div>
          <Link
            href={`/anime?search=${encodeURIComponent(char.anime.split("/")[0].trim())}`}
            className="inline-flex items-center gap-1.5 mt-1 px-3 py-1.5 rounded-lg bg-white/8 border border-white/10 text-slate-300 hover:text-white text-xs font-medium transition-colors"
          >
            🔍 Ver {char.anime.split("/")[0].trim()}
          </Link>
        </div>
      )}
    </div>
  );
}

export default function CharacterTest() {
  const [step, setStep] = useState<"start" | "test" | "result">("start");
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState<ArchetypeScore>({ coracao: 0, mente: 0, forca: 0, espirito: 0, conexao: 0 });
  const [result, setResult] = useState<ReturnType<typeof getCharacterResult> | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    if (saved) {
      try { setResult(JSON.parse(saved)); setStep("result"); } catch { /* noop */ }
    }
  }, []);

  function answer(optionScores: Partial<ArchetypeScore>) {
    const newScores = { ...scores };
    for (const [k, v] of Object.entries(optionScores) as [Archetype, number][]) {
      newScores[k] = (newScores[k] ?? 0) + v;
    }
    setScores(newScores);

    if (current + 1 >= TEST_QUESTIONS.length) {
      const res = getCharacterResult(newScores);
      setResult(res);
      setStep("result");
      localStorage.setItem(KEY, JSON.stringify(res));
    } else {
      setCurrent(c => c + 1);
    }
  }

  function restart() {
    setStep("start");
    setCurrent(0);
    setScores({ coracao: 0, mente: 0, forca: 0, espirito: 0, conexao: 0 });
    setResult(null);
    localStorage.removeItem(KEY);
  }

  const total = TEST_QUESTIONS.length;
  const q = TEST_QUESTIONS[current];

  if (step === "start") {
    return (
      <div className="bg-[#0d1424] rounded-2xl border border-white/8 p-6 text-center">
        <div className="text-5xl mb-3">🧬</div>
        <h3 className="text-white font-black text-xl mb-2">Anime Character DNA</h3>
        <p className="text-slate-400 text-sm mb-5 max-w-md mx-auto">
          7 perguntas sobre sua personalidade. Descubra qual personagem de anime você é — do icônico ao completamente desconhecido.
        </p>
        <button
          onClick={() => setStep("test")}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-bold hover:opacity-90 transition-opacity"
        >
          Iniciar teste →
        </button>
      </div>
    );
  }

  if (step === "test") {
    return (
      <div className="bg-[#0d1424] rounded-2xl border border-white/8 p-6">
        <div className="mb-5">
          <div className="flex justify-between text-xs text-slate-500 mb-1.5">
            <span>Pergunta {current + 1} de {total}</span>
            <span>{Math.round((current / total) * 100)}%</span>
          </div>
          <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-violet-600 to-cyan-500 rounded-full transition-all duration-500" style={{ width: `${(current / total) * 100}%` }} />
          </div>
        </div>
        <div className="text-center mb-5">
          <div className="text-3xl mb-2">{q.emoji}</div>
          <h3 className="text-white font-bold text-lg">{q.question}</h3>
        </div>
        <div className="space-y-2">
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => answer(opt.scores)}
              className="w-full text-left px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:border-violet-500/50 hover:bg-violet-500/10 hover:text-white transition-all text-sm"
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (!result) return null;

  const maxScore = Math.max(...Object.values(scores));
  const primaryMatch = Math.min(98, 65 + Math.round((scores[result.archetype] / maxScore) * 30));

  return (
    <div className="space-y-4">
      <div className="bg-[#0d1424] rounded-2xl border border-white/8 p-5 text-center">
        <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Seu DNA de Anime</p>
        <h3 className={`text-xl font-black mb-1 ${ARCHETYPE_COLORS[result.archetype].split(" ")[0]}`}>
          {result.archetypeLabel}
        </h3>
        <p className="text-slate-400 text-sm">Veja seus 3 personagens — do famoso ao oculto:</p>
      </div>

      <CharacterCard char={result.primary} label="⭐ Ícone" match={primaryMatch} />
      <CharacterCard char={result.medium} label="🔵 Conhecido" match={Math.max(60, primaryMatch - 12)} />
      <CharacterCard char={result.hidden} label="💎 Oculto" match={Math.max(50, primaryMatch - 20)} />

      <div className="text-center pt-2">
        <button onClick={restart} className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
          🔄 Refazer teste
        </button>
      </div>
    </div>
  );
}
