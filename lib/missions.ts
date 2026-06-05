export type MissionId = "quiz" | "duel" | "list" | "calendar" | "ranking";

export interface MissionDef {
  id: MissionId;
  label: string;
  description: string;
  icon: string;
  xp: number;
}

export const MISSIONS: MissionDef[] = [
  { id: "quiz", label: "Faça 1 quiz", description: "Complete o quiz de descoberta de anime", icon: "🎯", xp: 20 },
  { id: "duel", label: "Vote em 3 duelos", description: "Escolha seu lado em 3 duelos de anime", icon: "⚔️", xp: 30 },
  { id: "list", label: "Adicione 1 anime à lista", description: "Salve um anime na sua lista pessoal", icon: "📋", xp: 25 },
  { id: "calendar", label: "Visite o calendário", description: "Confira os animes da temporada atual", icon: "📅", xp: 15 },
  { id: "ranking", label: "Visite o ranking", description: "Explore o ranking de animes populares", icon: "🏆", xp: 20 },
];

export const BADGES = [
  { id: "explorador", label: "Explorador Otaku", icon: "🌟", description: "Completou sua primeira missão" },
  { id: "maratonista", label: "Maratonista", icon: "🏃", description: "Completou 5 missões no total" },
  { id: "sem_spoiler", label: "Sem Spoiler", icon: "🤫", description: "Adicionou anime à sua lista" },
  { id: "sensei", label: "Sensei dos Rankings", icon: "👑", description: "Visitou o ranking" },
  { id: "cacador", label: "Caçador de Animes", icon: "🎌", description: "Completou todas as missões do dia" },
];

export const LEVELS = [
  { min: 0, max: 99, label: "Iniciante Otaku", color: "text-slate-400" },
  { min: 100, max: 249, label: "Fã de Anime", color: "text-emerald-400" },
  { min: 250, max: 499, label: "Otaku Experiente", color: "text-cyan-400" },
  { min: 500, max: 999, label: "Mestre Otaku", color: "text-violet-400" },
  { min: 1000, max: Infinity, label: "Lenda Otaku", color: "text-amber-400" },
];

export interface MissionState {
  completedToday: MissionId[];
  date: string;
  totalXP: number;
  badges: string[];
  totalCompleted: number;
  duelVotesToday: number;
}

const KEY = "aibr_missions";

function todayStr(): string {
  return new Date().toISOString().split("T")[0];
}

function defaultState(): MissionState {
  return { completedToday: [], date: todayStr(), totalXP: 0, badges: [], totalCompleted: 0, duelVotesToday: 0 };
}

export function getMissionState(): MissionState {
  if (typeof window === "undefined") return defaultState();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultState();
    const state: MissionState = JSON.parse(raw);
    if (state.date !== todayStr()) {
      const reset: MissionState = { ...state, completedToday: [], date: todayStr(), duelVotesToday: 0 };
      localStorage.setItem(KEY, JSON.stringify(reset));
      return reset;
    }
    return state;
  } catch {
    return defaultState();
  }
}

export function trackMission(id: MissionId): boolean {
  if (typeof window === "undefined") return false;
  const state = getMissionState();
  if (state.completedToday.includes(id)) return false;

  const mission = MISSIONS.find((m) => m.id === id);
  if (!mission) return false;

  const completedToday = [...state.completedToday, id];
  const totalXP = state.totalXP + mission.xp;
  const totalCompleted = state.totalCompleted + 1;

  const badges = [...state.badges];
  if (!badges.includes("explorador") && totalCompleted >= 1) badges.push("explorador");
  if (!badges.includes("maratonista") && totalCompleted >= 5) badges.push("maratonista");
  if (!badges.includes("sem_spoiler") && id === "list") badges.push("sem_spoiler");
  if (!badges.includes("sensei") && id === "ranking") badges.push("sensei");
  if (!badges.includes("cacador") && completedToday.length >= MISSIONS.length) badges.push("cacador");

  localStorage.setItem(KEY, JSON.stringify({ ...state, completedToday, totalXP, totalCompleted, badges }));
  return true;
}

export function trackDuelVote(): void {
  if (typeof window === "undefined") return;
  const state = getMissionState();
  const duelVotesToday = state.duelVotesToday + 1;
  localStorage.setItem(KEY, JSON.stringify({ ...state, duelVotesToday }));
  if (duelVotesToday >= 3) trackMission("duel");
}

export function getLevelInfo(xp: number) {
  const idx = LEVELS.findIndex((l) => xp >= l.min && xp <= l.max);
  const level = idx + 1;
  const current = LEVELS[idx] ?? LEVELS[0];
  const next = LEVELS[idx + 1];
  const progress = next ? Math.min(100, Math.round(((xp - current.min) / (next.min - current.min)) * 100)) : 100;
  return { level, label: current.label, color: current.color, progress, nextXP: next?.min ?? null, xp };
}
