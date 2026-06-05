"use client";
import { useState, useCallback } from "react";
import { rollD20, getResultType, RESULT_LABELS, type ResultType } from "@/data/mock/rpg";

interface DiceRollerProps {
  onRoll?: (roll: number, result: ResultType) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}

export function DiceRoller({ onRoll, disabled, size = "md" }: DiceRollerProps) {
  const [rolling, setRolling] = useState(false);
  const [result, setResult] = useState<{ roll: number; type: ResultType } | null>(null);

  const sizes = { sm: "text-2xl p-2", md: "text-4xl p-4", lg: "text-6xl p-6" };

  const handleRoll = useCallback(() => {
    if (rolling || disabled) return;
    setRolling(true);
    setResult(null);

    let ticks = 0;
    const maxTicks = 10;
    const interval = setInterval(() => {
      ticks++;
      const temp = rollD20();
      setResult({ roll: temp, type: getResultType(temp) });
      if (ticks >= maxTicks) {
        clearInterval(interval);
        setRolling(false);
        const final = rollD20();
        const type = getResultType(final);
        setResult({ roll: final, type });
        onRoll?.(final, type);
      }
    }, 80);
  }, [rolling, disabled, onRoll]);

  const label = result ? RESULT_LABELS[result.type] : null;

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={handleRoll}
        disabled={disabled || rolling}
        className={`
          ${sizes[size]} rounded-2xl font-black transition-all select-none
          ${rolling ? "animate-bounce bg-violet-700 text-white scale-110" : ""}
          ${!rolling && !disabled ? "bg-violet-600 hover:bg-violet-500 text-white hover:scale-105 cursor-pointer" : ""}
          ${disabled && !rolling ? "bg-slate-700 text-slate-500 cursor-not-allowed" : ""}
          shadow-lg shadow-violet-900/40
        `}
        aria-label="Rolar D20"
      >
        🎲
      </button>

      {result && !rolling && (
        <div className="text-center">
          <div className={`text-3xl font-black ${label?.color}`}>{result.roll}</div>
          <div className={`text-sm font-bold ${label?.color}`}>{label?.emoji} {label?.label}</div>
        </div>
      )}

      {rolling && result && (
        <div className="text-center">
          <div className="text-3xl font-black text-violet-300 animate-pulse">{result.roll}</div>
          <div className="text-xs text-slate-500">rolando...</div>
        </div>
      )}
    </div>
  );
}
