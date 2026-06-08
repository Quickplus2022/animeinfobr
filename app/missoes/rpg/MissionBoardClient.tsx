"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { MISSIONS_DATA, type RpgMissionData } from "@/data/mock/rpg";

type DifficultyFilter = 0 | 1 | 2 | 3;

interface Party {
  id: string;
  name: string;
  status: string;
  theme: string;
  owner: { id: string };
  members: { userId: string }[];
}

const DIFF_LABELS: Record<number, { label: string; color: string; stars: string }> = {
  1: { label: "Iniciante", color: "text-emerald-400", stars: "★☆☆" },
  2: { label: "Intermediário", color: "text-amber-400", stars: "★★☆" },
  3: { label: "Avançado", color: "text-rose-400", stars: "★★★" },
};

const DIFF_CARD_STYLE: Record<number, string> = {
  1: "from-emerald-900/40 to-emerald-900/10 border-emerald-700/50 hover:border-emerald-500/70",
  2: "from-amber-900/40 to-amber-900/10 border-amber-700/50 hover:border-amber-500/70",
  3: "from-rose-900/40 to-rose-900/10 border-rose-700/50 hover:border-rose-500/70",
};

const DIFF_BTN_ACTIVE: Record<number, string> = {
  1: "bg-emerald-600/30 border-emerald-500 text-emerald-300",
  2: "bg-amber-600/30 border-amber-500 text-amber-300",
  3: "bg-rose-600/30 border-rose-500 text-rose-300",
};

const DIFFICULTY_HEADER: Record<number, string> = {
  1: "bg-gradient-to-r from-emerald-900/60 to-teal-900/40",
  2: "bg-gradient-to-r from-amber-900/60 to-yellow-900/40",
  3: "bg-gradient-to-r from-rose-900/60 to-red-900/40",
};

function DifficultyStars({ level }: { level: number }) {
  const info = DIFF_LABELS[level];
  return (
    <span className={`text-sm font-bold ${info.color}`}>
      {info.stars} {info.label}
    </span>
  );
}

function MissionCard({
  mission,
  canStart,
  onStart,
  starting,
}: {
  mission: RpgMissionData;
  canStart: boolean;
  onStart: (slug: string) => void;
  starting: string | null;
}) {
  const isStarting = starting === mission.slug;

  return (
    <div
      className={`
        relative flex flex-col rounded-2xl border bg-gradient-to-b
        transition-all duration-200 overflow-hidden
        ${DIFF_CARD_STYLE[mission.difficulty]}
      `}
    >
      {/* Header */}
      <div className={`px-5 py-4 ${DIFFICULTY_HEADER[mission.difficulty]}`}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{mission.themeEmoji}</span>
            <div>
              <h3 className="font-black text-white text-base leading-tight">{mission.title}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{mission.theme}</p>
            </div>
          </div>
          <DifficultyStars level={mission.difficulty} />
        </div>
      </div>

      {/* Body */}
      <div className="px-5 py-4 flex-1 flex flex-col gap-4">
        <p className="text-sm text-slate-300 leading-relaxed">{mission.description}</p>

        {/* Objective */}
        <div className="bg-slate-900/60 rounded-xl p-3">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 font-bold">Objetivo</div>
          <p className="text-xs text-slate-300">{mission.objective}</p>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-4 text-xs text-slate-400">
          <span title="Cenas">📖 {mission.scenes.length} cenas</span>
          <span title="Duração estimada">⏱️ ~{mission.estimatedMinutes}min</span>
          <span className="text-violet-400 font-bold ml-auto">+{mission.xpReward} XP</span>
        </div>

        {/* Scenes preview */}
        <div className="space-y-1.5">
          {mission.scenes.map((scene, idx) => (
            <div key={scene.id} className="flex items-center gap-2 text-xs text-slate-500">
              <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-400 shrink-0">
                {idx + 1}
              </span>
              <span>{scene.title}</span>
              <span className="ml-auto opacity-60">{scene.atmosphere.split(" ")[0]}</span>
            </div>
          ))}
        </div>

        {/* Badge reward */}
        {mission.badgeKey && (
          <div className="flex items-center gap-2 bg-amber-900/20 border border-amber-700/40 rounded-lg px-3 py-2 text-xs">
            <span>🎖️</span>
            <span className="text-amber-300 font-semibold">Badge: {mission.badgeName}</span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-5 pb-5">
        {canStart ? (
          <button
            onClick={() => onStart(mission.slug)}
            disabled={isStarting || starting !== null}
            className={`
              w-full py-3 rounded-xl font-bold text-sm transition-all
              ${isStarting
                ? "bg-slate-700 text-slate-400 cursor-wait"
                : starting !== null
                ? "bg-slate-700/50 text-slate-500 cursor-not-allowed"
                : "bg-violet-600 hover:bg-violet-500 active:scale-95 text-white shadow-lg shadow-violet-900/40"
              }
            `}
          >
            {isStarting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-slate-400 border-t-white rounded-full animate-spin" />
                Iniciando...
              </span>
            ) : (
              "⚔️ Iniciar Aventura"
            )}
          </button>
        ) : (
          <div className="text-center text-xs text-slate-600 py-3">
            Apenas o dono da party pode iniciar
          </div>
        )}
      </div>
    </div>
  );
}

export default function MissionBoardClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const partyId = searchParams.get("partyId");

  const [party, setParty] = useState<Party | null>(null);
  const [loadingParty, setLoadingParty] = useState(true);
  const [filter, setFilter] = useState<DifficultyFilter>(0);
  const [starting, setStarting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadParty = useCallback(async () => {
    const res = await fetch("/api/rpg/party");
    if (res.ok) {
      const data = await res.json();
      if (data?.id) setParty(data);
    }
    setLoadingParty(false);
  }, []);

  useEffect(() => {
    loadParty();
  }, [loadParty]);

  const visibleMissions = filter === 0
    ? MISSIONS_DATA
    : MISSIONS_DATA.filter(m => m.difficulty === filter);

  async function startMission(slug: string) {
    if (!party) return;
    setError(null);
    setStarting(slug);

    const res = await fetch("/api/rpg/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ partyId: party.id, missionSlug: slug }),
    });

    if (res.ok) {
      const session = await res.json();
      router.push(`/party/sessao/${session.id}`);
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Erro ao iniciar missão. Tente novamente.");
      setStarting(null);
    }
  }

  if (loadingParty) {
    return (
      <div className="flex justify-center py-24">
        <div className="w-10 h-10 border-4 border-white/10 border-t-violet-500 rounded-full animate-spin" />
      </div>
    );
  }

  const isOwner = party && party.owner?.id !== undefined;
  const partyInMission = party?.status === "IN_MISSION";

  return (
    <div className="space-y-8">
      {/* Party status banner */}
      {party ? (
        <div className="flex items-center justify-between bg-slate-800/60 border border-slate-700 rounded-2xl px-5 py-4">
          <div>
            <div className="text-sm text-slate-400">Party ativa</div>
            <div className="font-bold text-white">{party.name}</div>
          </div>
          {partyInMission && (
            <span className="text-xs bg-amber-500/20 text-amber-400 font-bold px-3 py-1 rounded-full border border-amber-500/30">
              ⚔️ Em missão
            </span>
          )}
          {!partyInMission && (
            <span className="text-xs bg-emerald-500/20 text-emerald-400 font-bold px-3 py-1 rounded-full border border-emerald-500/30">
              ✓ Disponível
            </span>
          )}
        </div>
      ) : (
        <div className="bg-amber-900/20 border border-amber-700/40 rounded-2xl px-5 py-4 text-amber-300 text-sm">
          ⚠️ Você precisa estar em uma party para iniciar missões.{" "}
          <Link href="/party" className="font-bold underline hover:text-amber-200">
            Criar party →
          </Link>
        </div>
      )}

      {partyInMission && (
        <div className="bg-slate-800/60 border border-amber-700/40 rounded-2xl px-5 py-4 text-center">
          <p className="text-amber-300 font-bold mb-2">Sua party está em missão</p>
          <p className="text-slate-400 text-sm mb-4">Conclua a sessão atual antes de iniciar uma nova.</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-900/20 border border-red-700/40 rounded-xl px-4 py-3 text-red-300 text-sm">
          {error}
        </div>
      )}

      {/* Filter tabs */}
      <div>
        <h2 className="text-sm text-slate-400 mb-3 font-semibold uppercase tracking-wider">Filtrar por dificuldade</h2>
        <div className="flex flex-wrap gap-2">
          {([0, 1, 2, 3] as DifficultyFilter[]).map(d => (
            <button
              key={d}
              onClick={() => setFilter(d)}
              className={`
                px-4 py-2 rounded-xl border text-sm font-bold transition-all
                ${filter === d
                  ? d === 0
                    ? "bg-violet-600/30 border-violet-500 text-violet-300"
                    : DIFF_BTN_ACTIVE[d]
                  : "border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white"
                }
              `}
            >
              {d === 0 ? "✨ Todas" : `${DIFF_LABELS[d].stars} ${DIFF_LABELS[d].label}`}
            </button>
          ))}
        </div>
      </div>

      {/* Missions grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-black text-white">
            {visibleMissions.length} missão{visibleMissions.length !== 1 ? "ões" : ""} disponível{visibleMissions.length !== 1 ? "is" : ""}
          </h2>
          <span className="text-xs text-slate-500">
            {MISSIONS_DATA.reduce((s, m) => s + m.scenes.length, 0)} cenas no total
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {visibleMissions.map(mission => (
            <MissionCard
              key={mission.id}
              mission={mission}
              canStart={!!party && !partyInMission && isOwner !== false}
              onStart={startMission}
              starting={starting}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
