"use client";
import { getLevelFromXp, getClassById, getElementById } from "@/data/mock/rpg";

interface CharacterMiniProps {
  name: string;
  avatarEmoji: string;
  classType: string;
  elementType: string;
  level: number;
  xp: number;
  size?: "xs" | "sm" | "md";
  showStats?: boolean;
}

export function CharacterMini({ name, avatarEmoji, classType, elementType, level, xp, size = "sm", showStats }: CharacterMiniProps) {
  const cls = getClassById(classType);
  const el = getElementById(elementType);
  const lvl = getLevelFromXp(xp);

  const emojiSize = { xs: "text-2xl", sm: "text-3xl", md: "text-5xl" }[size];
  const nameSize = { xs: "text-xs", sm: "text-sm", md: "text-base" }[size];

  return (
    <div className="flex items-center gap-3">
      <div className={`${emojiSize} w-12 h-12 flex items-center justify-center rounded-xl bg-slate-800 border border-slate-700 flex-shrink-0`}>
        {avatarEmoji}
      </div>
      <div className="min-w-0">
        <div className={`font-bold text-white truncate ${nameSize}`}>{name}</div>
        <div className="flex items-center gap-1 flex-wrap">
          <span className="text-xs text-slate-400">{cls?.emoji} {cls?.label}</span>
          <span className="text-slate-600">·</span>
          <span className="text-xs text-slate-400">{el?.emoji} {el?.label}</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs font-bold text-violet-400">Lv.{level}</span>
          <span className="text-xs text-slate-500">{lvl.label}</span>
          {showStats && (
            <span className="text-xs text-slate-500">{xp} XP</span>
          )}
        </div>
      </div>
    </div>
  );
}
