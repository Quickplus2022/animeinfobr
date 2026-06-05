"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getMissionState, getLevelInfo, MISSIONS, BADGES, type MissionState } from "@/lib/missions";

export default function MissoesClient() {
  const [state, setState] = useState<MissionState | null>(null);

  useEffect(() => {
    setState(getMissionState());
    const id = setInterval(() => setState(getMissionState()), 2000);
    return () => clearInterval(id);
  }, []);

  if (!state) {
    return (
      <div className="flex justify-center py-16">
        <div className="w-10 h-10 border-4 border-white/10 border-t-violet-500 rounded-full animate-spin" />
      </div>
    );
  }

  const { level, label, color, progress, nextXP, xp } = getLevelInfo(state.totalXP);
  const completedCount = state.completedToday.length;

  return (
    <div className="space-y-8">
      {/* XP + Level card */}
      <div className="bg-[#0d1424] rounded-2xl border border-violet-500/20 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-2xl font-black ${color}`}>Nível {level}</span>
              <span className={`text-sm font-semibold ${color}`}>— {label}</span>
            </div>
            <p className="text-slate-500 text-sm mb-3">
              {xp} XP total · {completedCount}/{MISSIONS.length} missões de hoje
            </p>
            <div className="h-3 bg-white/8 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-violet-600 to-cyan-500 rounded-full transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>
            {nextXP && (
              <p className="text-slate-600 text-xs mt-1.5">{nextXP - xp} XP para o próximo nível</p>
            )}
          </div>
          <div className="text-center shrink-0">
            <div className={`text-5xl font-black ${color}`}>{xp}</div>
            <div className="text-slate-500 text-xs">XP total</div>
          </div>
        </div>
      </div>

      {/* Daily missions */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">🗓️ Missões de Hoje</h2>
        <div className="space-y-3">
          {MISSIONS.map((mission) => {
            const done = state.completedToday.includes(mission.id);
            const LINKS: Record<string, string> = {
              quiz: "/quiz", duel: "/duelos", list: "/minha-lista", calendar: "/calendario", ranking: "/ranking",
            };
            return (
              <div
                key={mission.id}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                  done ? "bg-emerald-500/10 border-emerald-500/25" : "bg-[#0d1424] border-white/8"
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${done ? "bg-emerald-500/20" : "bg-white/5"}`}>
                  {done ? "✅" : mission.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-semibold text-sm ${done ? "text-emerald-300 line-through opacity-70" : "text-white"}`}>
                    {mission.label}
                  </p>
                  <p className="text-slate-500 text-xs">{mission.description}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className={`text-xs font-bold ${done ? "text-emerald-400" : "text-violet-400"}`}>+{mission.xp} XP</span>
                  {!done && (
                    <Link
                      href={LINKS[mission.id] ?? "/"}
                      className="px-3 py-1.5 rounded-lg bg-violet-600/20 border border-violet-500/30 text-violet-300 text-xs font-medium hover:bg-violet-600/30 transition-colors"
                    >
                      Ir →
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-slate-600 text-xs text-center mt-4">Missões renovam diariamente à meia-noite.</p>
      </div>

      {/* Badges */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">🎖️ Conquistas</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {BADGES.map((badge) => {
            const earned = state.badges.includes(badge.id);
            return (
              <div
                key={badge.id}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border text-center transition-all ${
                  earned ? "bg-amber-500/10 border-amber-500/30" : "bg-white/3 border-white/8 opacity-50"
                }`}
              >
                <span className={`text-3xl ${!earned ? "grayscale" : ""}`}>{badge.icon}</span>
                <p className={`text-xs font-semibold ${earned ? "text-amber-300" : "text-slate-500"}`}>{badge.label}</p>
                <p className="text-[10px] text-slate-600">{badge.description}</p>
                {earned && <span className="text-[10px] text-amber-500 font-bold">✓ Desbloqueada</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
