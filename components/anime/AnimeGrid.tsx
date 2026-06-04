import AnimeCard from "./AnimeCard";
import EmptyState from "@/components/ui/EmptyState";
import type { AniListMedia } from "@/lib/anilist/services";
import { cn } from "@/lib/utils";

interface AnimeGridProps {
  animes: AniListMedia[];
  className?: string;
  priorityCount?: number;
}

export default function AnimeGrid({ animes, className, priorityCount = 4 }: AnimeGridProps) {
  if (animes.length === 0) {
    return (
      <EmptyState
        title="Nenhum anime encontrado"
        description="Tente outros termos ou filtros."
        actionLabel="Explorar animes"
        actionHref="/anime"
      />
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4",
        className
      )}
    >
      {animes.map((anime, i) => (
        <AnimeCard key={anime.id} anime={anime} priority={i < priorityCount} />
      ))}
    </div>
  );
}
