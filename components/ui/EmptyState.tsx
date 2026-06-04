import Link from "next/link";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  icon?: React.ReactNode;
}

export default function EmptyState({
  title = "Nada encontrado",
  description = "Não encontramos resultados para sua busca.",
  actionLabel,
  actionHref,
  icon,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      {icon ?? (
        <div className="text-6xl mb-4 opacity-40">🎌</div>
      )}
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-slate-400 max-w-sm mb-6">{description}</p>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-colors"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}

export function ErrorState({ message }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="text-5xl mb-4">⚠️</div>
      <h3 className="text-lg font-semibold text-white mb-2">Erro ao carregar</h3>
      <p className="text-slate-400 text-sm max-w-xs">
        {message ?? "Não foi possível carregar os dados. Verifique sua conexão e tente novamente."}
      </p>
    </div>
  );
}
