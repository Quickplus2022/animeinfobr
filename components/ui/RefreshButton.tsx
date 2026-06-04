"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

type RefreshTarget = "home" | "calendar" | "ranking" | "all" | "page";

interface RefreshButtonProps {
  label?: string;
  className?: string;
  target?: RefreshTarget;
  size?: "sm" | "md";
}

export default function RefreshButton({
  label = "Atualizar Dados",
  className,
  size = "md",
}: RefreshButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  function handleRefresh() {
    startTransition(async () => {
      // Force Next.js to re-fetch all server data for this route
      router.refresh();
      setLastUpdated(new Date());
    });
  }

  const sizeClasses = size === "sm"
    ? "px-3 py-1.5 text-xs"
    : "px-4 py-2 text-sm";

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        onClick={handleRefresh}
        disabled={isPending}
        title="Buscar dados mais recentes das APIs"
        className={`inline-flex items-center gap-2 rounded-xl bg-white/8 border border-white/12 hover:border-violet-500/40 hover:bg-violet-500/10 text-slate-300 hover:text-white font-medium transition-all disabled:opacity-50 disabled:cursor-wait ${sizeClasses} ${className ?? ""}`}
      >
        <svg
          className={`w-3.5 h-3.5 ${isPending ? "animate-spin" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        {isPending ? "Atualizando..." : label}
      </button>
      {lastUpdated && (
        <span className="text-slate-600 text-[10px]">
          Atualizado {lastUpdated.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
        </span>
      )}
    </div>
  );
}

// Versão compacta para usar em seções da home
export function RefreshSection({
  onRefresh,
  isPending,
}: {
  onRefresh: () => void;
  isPending: boolean;
}) {
  return (
    <button
      onClick={onRefresh}
      disabled={isPending}
      className="p-1.5 rounded-lg text-slate-600 hover:text-violet-400 hover:bg-violet-500/10 transition-all disabled:opacity-50"
      title="Atualizar dados desta seção"
    >
      <svg
        className={`w-3.5 h-3.5 ${isPending ? "animate-spin" : ""}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    </button>
  );
}
