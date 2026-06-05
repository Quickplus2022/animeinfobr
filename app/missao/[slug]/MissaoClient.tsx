"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import type { RpgMissionData, ResultType } from "@/data/mock/rpg";
import { RESULT_LABELS, RPG_CLASSES } from "@/data/mock/rpg";
import { DiceRoller } from "@/components/rpg/DiceRoller";
import { MissionCompleteCard } from "@/components/rpg/MissionCompleteCard";

const ATTRIBUTES = [
  { id: "courage", label: "Coragem" }, { id: "strategy", label: "Estratégia" },
  { id: "empathy", label: "Empatia" }, { id: "energy", label: "Energia" },
  { id: "technique", label: "Técnica" }, { id: "defense", label: "Defesa" },
  { id: "luck", label: "Sorte" }, { id: "charisma", label: "Carisma" },
];

interface ActionLog {
  id: string;
  characterName: string;
  actionText: string;
  attributeUsed: string;
  diceRoll: number;
  bonus: number;
  total: number;
  resultType: ResultType;
  resultText: string;
  user: { name: string | null; username: string | null };
}

interface SessionData {
  id: string;
  status: string;
  currentSceneIndex: number;
  turnUserId: string;
  actions: ActionLog[];
  party: { id: string; name: string; members: Array<{ userId: string; user: { id: string; name: string | null; avatarEmoji: string | null } }> };
}

interface RpgCharacter {
  id: string;
  name: string;
  classType: string;
}

export default function MissaoClient({ mission }: { mission: RpgMissionData }) {
  const { data: session } = useSession();
  const [rpgSession, setRpgSession] = useState<SessionData | null>(null);
  const [character, setCharacter] = useState<RpgCharacter | null>(null);
  const [party, setParty] = useState<{ id: string; name: string } | null>(null);
  const [actionText, setActionText] = useState("");
  const [selectedAttr, setSelectedAttr] = useState("courage");
  const [rolling, setRolling] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [pendingRoll, setPendingRoll] = useState<{ roll: number; result: ResultType } | null>(null);
  const [completionData, setCompletionData] = useState<{ xpReward: number; missionTitle: string; missionEmoji: string; partyName: string; badgeName?: string } | null>(null);

  const currentScene = rpgSession ? mission.scenes[rpgSession.currentSceneIndex] : null;
  const myTurn = rpgSession?.turnUserId === (session?.user as { id?: string })?.id;

  const loadSession = useCallback(async (id: string) => {
    const res = await fetch(`/api/rpg/session?id=${id}`);
    if (res.ok) setRpgSession(await res.json());
  }, []);

  useEffect(() => {
    async function init() {
      const [charRes, partyRes] = await Promise.all([fetch("/api/rpg/character"), fetch("/api/rpg/party")]);
      if (charRes.ok) { const d = await charRes.json(); if (d?.id) setCharacter(d); }
      if (partyRes.ok) { const d = await partyRes.json(); if (d?.id) setParty(d); }
    }
    if (session?.user) init();
  }, [session]);

  async function startSession() {
    if (!party) return;
    const res = await fetch("/api/rpg/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ partyId: party.id, missionSlug: mission.slug }),
    });
    if (res.ok) {
      const s = await res.json();
      await loadSession(s.id);
    } else {
      alert("Erro ao iniciar sessão. Verifique se você é o dono da party.");
    }
  }

  async function submitAction() {
    if (!rpgSession || !pendingRoll || !actionText.trim()) return;
    setSubmitting(true);
    const res = await fetch(`/api/rpg/session/${rpgSession.id}/action`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ actionText: actionText.trim(), attributeUsed: selectedAttr }),
    });
    if (res.ok) {
      await loadSession(rpgSession.id);
      setActionText("");
      setPendingRoll(null);
    }
    setSubmitting(false);
  }

  async function advanceScene() {
    if (!rpgSession) return;
    const res = await fetch(`/api/rpg/session/${rpgSession.id}/advance`, { method: "POST" });
    if (res.ok) {
      const result = await res.json();
      if (result.status === "COMPLETED") {
        const names = rpgSession.party.members.map(m => m.user.name ?? "Aventureiro");
        setCompletionData({
          xpReward: result.xpReward,
          missionTitle: result.missionTitle ?? mission.title,
          missionEmoji: result.missionEmoji ?? mission.themeEmoji,
          partyName: result.partyName ?? rpgSession.party.name,
          badgeName: mission.badgeName,
        });
      }
      await loadSession(rpgSession.id);
    }
  }

  if (completionData && rpgSession) {
    return (
      <MissionCompleteCard
        missionTitle={completionData.missionTitle}
        missionEmoji={completionData.missionEmoji}
        partyName={completionData.partyName}
        playerNames={rpgSession.party.members.map(m => m.user.name ?? "Aventureiro")}
        xpReward={completionData.xpReward}
        badgeName={completionData.badgeName}
        onClose={() => setCompletionData(null)}
      />
    );
  }

  if (!session?.user) {
    return (
      <div className="min-h-[calc(100vh-4rem)] hero-bg flex items-center justify-center">
        <div className="text-center text-slate-400">
          <p className="mb-4">Faça login para jogar esta missão.</p>
          <Link href="/login" className="text-violet-400 hover:text-violet-300 font-bold">Entrar</Link>
        </div>
      </div>
    );
  }

  // Mission lobby (not started)
  if (!rpgSession) {
    const cls = character ? RPG_CLASSES.find(c => c.id === character.classType) : null;
    return (
      <div className="min-h-[calc(100vh-4rem)] hero-bg">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link href="/guilds" className="text-sm text-slate-400 hover:text-white mb-6 inline-block">← Guilds</Link>

          <div className="bg-slate-800/60 border border-slate-700 rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-slate-700">
              <div className="text-4xl mb-3">{mission.themeEmoji}</div>
              <h1 className="text-2xl font-black text-white mb-2">{mission.title}</h1>
              <div className="text-sm text-slate-400 mb-4">{mission.theme}</div>
              <p className="text-slate-300">{mission.description}</p>
            </div>

            {/* Objective */}
            <div className="p-6 border-b border-slate-700 bg-violet-900/10">
              <div className="text-xs text-violet-400 font-bold uppercase tracking-wider mb-1">Objetivo</div>
              <p className="text-white font-medium">{mission.objective}</p>
            </div>

            {/* Scenes */}
            <div className="p-6 border-b border-slate-700">
              <div className="text-xs text-slate-500 uppercase tracking-wider mb-3">Cenas ({mission.scenes.length})</div>
              <div className="space-y-2">
                {mission.scenes.map((s, i) => (
                  <div key={s.id} className="flex items-center gap-3 text-sm">
                    <span className="text-slate-600 font-mono">{i + 1}</span>
                    <span className="text-slate-400">{s.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rewards */}
            <div className="p-6 border-b border-slate-700">
              <div className="flex items-center gap-4 text-sm">
                <span className="text-slate-400">⏱️ ~{mission.estimatedMinutes} min</span>
                <span className="text-emerald-400">✨ {mission.xpReward} XP</span>
                {mission.badgeKey && <span className="text-amber-400">🏅 Badge: {mission.badgeName}</span>}
              </div>
            </div>

            {/* Start */}
            <div className="p-6">
              {!character ? (
                <div className="text-center">
                  <p className="text-slate-400 mb-4">Você precisa ter um personagem para jogar.</p>
                  <Link href="/personagem" className="bg-violet-600 hover:bg-violet-500 text-white font-bold px-6 py-2.5 rounded-xl transition-colors text-sm">
                    Criar Personagem
                  </Link>
                </div>
              ) : !party ? (
                <div className="text-center">
                  <p className="text-slate-400 mb-4">Você precisa estar em uma party para iniciar.</p>
                  <Link href="/party" className="bg-violet-600 hover:bg-violet-500 text-white font-bold px-6 py-2.5 rounded-xl transition-colors text-sm">
                    Criar/Entrar em Party
                  </Link>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-3 mb-4 bg-slate-900/40 rounded-xl p-3">
                    <span className="text-2xl">{cls?.emoji ?? "⚔️"}</span>
                    <div>
                      <div className="font-bold text-white text-sm">{character.name}</div>
                      <div className="text-xs text-slate-400">Party: {party.name}</div>
                    </div>
                  </div>
                  <button onClick={startSession}
                    className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold px-4 py-3 rounded-xl transition-colors">
                    ⚔️ Iniciar Missão
                  </button>
                  <p className="text-xs text-slate-500 text-center mt-2">Apenas o dono da party pode iniciar.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Active session

  return (
    <div className="min-h-[calc(100vh-4rem)] hero-bg">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">Missão ativa</div>
            <div className="font-bold text-white">{mission.title}</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-500">Cena</div>
            <div className="font-bold text-violet-400">{rpgSession.currentSceneIndex + 1}/{mission.scenes.length}</div>
          </div>
        </div>

        {/* Scene progress */}
        <div className="flex gap-1 mb-6">
          {mission.scenes.map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${i < rpgSession.currentSceneIndex ? "bg-violet-500" : i === rpgSession.currentSceneIndex ? "bg-violet-400" : "bg-slate-700"}`} />
          ))}
        </div>

        {rpgSession.status === "FINISHED" ? (
          <div className="bg-slate-800/60 border border-emerald-700 rounded-2xl p-8 text-center">
            <div className="text-5xl mb-4">🏆</div>
            <h2 className="text-2xl font-black text-white mb-2">Missão Concluída!</h2>
            <p className="text-slate-400 mb-2">+{mission.xpReward} XP conquistados</p>
            {mission.badgeName && <p className="text-amber-400 mb-6">🏅 Badge desbloqueado: {mission.badgeName}</p>}
            <Link href="/guilds" className="bg-violet-600 hover:bg-violet-500 text-white font-bold px-6 py-2.5 rounded-xl transition-colors">
              Voltar para Guilds
            </Link>
          </div>
        ) : currentScene ? (
          <div className="space-y-4">
            {/* Scene card */}
            <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6">
              <div className="text-xs text-slate-500 mb-1">{currentScene.atmosphere}</div>
              <h2 className="text-lg font-bold text-white mb-3">{currentScene.title}</h2>
              <p className="text-slate-300 leading-relaxed whitespace-pre-line">{currentScene.narrative}</p>
              <div className="mt-4 pt-4 border-t border-slate-700">
                <div className="text-sm text-violet-400 font-medium">{currentScene.actionPrompt}</div>
              </div>
            </div>

            {/* Action log */}
            {rpgSession.actions.length > 0 && (
              <div className="space-y-2">
                {rpgSession.actions.slice(-6).map(a => {
                  const lbl = RESULT_LABELS[a.resultType];
                  return (
                    <div key={a.id} className="bg-slate-900/60 border border-slate-800 rounded-xl p-3">
                      <div className="flex items-start justify-between mb-1">
                        <span className="text-sm font-bold text-white">{a.characterName}</span>
                        <span className={`text-xs font-bold ${lbl.color}`}>{lbl.emoji} {a.total}</span>
                      </div>
                      <p className="text-xs text-slate-400 italic mb-1">&ldquo;{a.actionText}&rdquo;</p>
                      <p className="text-xs text-slate-300">{a.resultText}</p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Action input — only on my turn */}
            {myTurn ? (
              <div className="bg-slate-800/60 border border-violet-700 rounded-2xl p-5">
                <div className="text-sm font-bold text-violet-400 mb-3">Sua vez de agir!</div>

                <div className="mb-3">
                  <label className="text-xs text-slate-400 mb-1 block">Atributo utilizado</label>
                  <div className="flex flex-wrap gap-2">
                    {ATTRIBUTES.map(a => (
                      <button key={a.id} onClick={() => setSelectedAttr(a.id)}
                        className={`text-xs px-3 py-1.5 rounded-lg transition-all font-medium ${selectedAttr === a.id ? "bg-violet-600 text-white" : "bg-slate-700 text-slate-400 hover:bg-slate-600"}`}>
                        {a.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="text-xs text-slate-400 mb-1 block">O que você faz?</label>
                  <textarea value={actionText} onChange={e => setActionText(e.target.value)} maxLength={500} rows={2}
                    placeholder="Descreva sua ação na narrativa..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 text-sm resize-none" />
                </div>

                <div className="flex items-center gap-4">
                  <DiceRoller
                    disabled={!actionText.trim() || rolling}
                    onRoll={(roll, result) => { setPendingRoll({ roll, result }); setRolling(false); }}
                    size="sm"
                  />
                  {pendingRoll && (
                    <button onClick={submitAction} disabled={submitting}
                      className="flex-1 bg-violet-600 hover:bg-violet-500 disabled:bg-slate-700 text-white font-bold px-4 py-2.5 rounded-xl transition-colors text-sm">
                      {submitting ? "Registrando..." : "Confirmar Ação"}
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-4 text-center">
                <p className="text-slate-400 text-sm">Aguardando vez de outro membro...</p>
                <button onClick={() => loadSession(rpgSession.id)} className="text-xs text-violet-400 hover:text-violet-300 mt-2">
                  Atualizar
                </button>
              </div>
            )}

            {/* Advance scene */}
            {myTurn && rpgSession.actions.length >= (rpgSession.currentSceneIndex + 1) * rpgSession.party.members.length && (
              <button onClick={advanceScene}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl transition-colors text-sm">
                {rpgSession.currentSceneIndex < mission.scenes.length - 1 ? "Avançar Cena →" : "Concluir Missão 🏆"}
              </button>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
