"use client";
import { getLevelFromXp, getClassById, getElementById, getVisualTier, getAwakeningById } from "@/data/mock/rpg";

interface CharacterMiniProps {
  name: string;
  avatarEmoji: string;
  classType: string;
  elementType: string;
  level: number;
  xp: number;
  awakeningClass?: string | null;
  prestigeCount?: number;
  size?: "xs" | "sm" | "md";
  showStats?: boolean;
  showXpBar?: boolean;
}

export function CharacterMini({
  name, avatarEmoji, classType, elementType, level, xp,
  awakeningClass, prestigeCount = 0,
  size = "sm", showStats, showXpBar,
}: CharacterMiniProps) {
  const cls = getClassById(classType);
  const el = getElementById(elementType);
  const lvlData = getLevelFromXp(xp);
  const tier = getVisualTier(level);
  const awakening = awakeningClass ? getAwakeningById(classType, awakeningClass) : null;

  const iconSize = { xs: "w-10 h-10 text-xl", sm: "w-12 h-12 text-2xl", md: "w-16 h-16 text-4xl" }[size];
  const nameSize = { xs: "text-xs", sm: "text-sm", md: "text-base" }[size];

  return (
    <div className="flex items-center gap-3">
      {/* Avatar com tier border */}
      <div className="relative flex-shrink-0">
        <div className={`${iconSize} flex items-center justify-center rounded-xl border-2 ${tier.borderColor} ${tier.bgColor} ${tier.glowClass} ${tier.shadowColor}`}>
          {avatarEmoji}
        </div>
        {/* Prestige counter */}
        {prestigeCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 bg-yellow-500 text-black text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center leading-none">
            {prestigeCount}
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className={`font-bold text-white truncate ${nameSize}`}>{name}</span>
          {level >= 25 && awakening && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/10 text-slate-300 font-medium shrink-0">
              {awakening.emoji} {awakening.label}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 flex-wrap mt-0.5">
          <span className="text-xs text-slate-400">{cls?.emoji} {cls?.label}</span>
          <span className="text-slate-600">·</span>
          <span className="text-xs text-slate-400">{el?.emoji} {el?.label}</span>
        </div>

        <div className="flex items-center gap-2 mt-1">
          <span className={`text-xs font-bold ${tier.textColor}`}>Lv.{level}</span>
          <span className={`text-xs font-medium ${tier.textColor} opacity-80`}>{tier.tierLabel}</span>
          {showStats && <span className="text-xs text-slate-500">{xp} XP</span>}
        </div>

        {showXpBar && level < 100 && (
          <div className="mt-1.5">
            <div className="h-1 bg-white/8 rounded-full overflow-hidden w-28">
              <div
                className={`h-full rounded-full transition-all ${tier.tier === "recruta" ? "bg-slate-500" : tier.tier === "aventureiro" ? "bg-emerald-500" : tier.tier === "iniciado" ? "bg-blue-500" : tier.tier === "guerreiro" ? "bg-cyan-500" : tier.tier === "veterano" ? "bg-violet-500" : tier.tier === "mestre" ? "bg-purple-500" : tier.tier === "campeao" ? "bg-amber-500" : tier.tier === "guardiao" ? "bg-orange-500" : tier.tier === "lendario" ? "bg-rose-500" : tier.tier === "transcendido" ? "bg-red-500" : "bg-yellow-400"}`}
                style={{ width: `${lvlData.progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
