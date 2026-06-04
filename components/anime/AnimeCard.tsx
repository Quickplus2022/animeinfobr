import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import {
  createAnimeSlug,
  formatFormat,
  getDisplayTitle,
  type AniListMedia,
} from "@/lib/anilist/services";

interface AnimeCardProps {
  anime: AniListMedia;
  priority?: boolean;
  className?: string;
  showDescription?: boolean;
}

export default function AnimeCard({
  anime,
  priority = false,
  className,
  showDescription = false,
}: AnimeCardProps) {
  const slug = createAnimeSlug(anime.id, anime.title);
  const title = getDisplayTitle(anime.title);
  const score = anime.averageScore ? (anime.averageScore / 10).toFixed(1) : null;

  return (
    <Link
      href={`/anime/${slug}`}
      className={cn(
        "group relative flex flex-col rounded-xl overflow-hidden",
        "bg-[#0d1424] border border-white/8",
        "hover:border-violet-500/40 transition-all duration-300",
        "hover:shadow-[0_0_30px_rgba(124,58,237,0.2)]",
        className
      )}
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden bg-[#152038]">
        {anime.coverImage.large ? (
          <Image
            src={anime.coverImage.large}
            alt={`Capa de ${title}`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 200px"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            priority={priority}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-20">
            🎌
          </div>
        )}

        {/* Score overlay */}
        {score && (
          <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-full px-2 py-0.5 flex items-center gap-0.5">
            <span className="text-yellow-400 text-xs">★</span>
            <span className="text-white text-xs font-bold">{score}</span>
          </div>
        )}

        {/* Format badge */}
        <div className="absolute bottom-2 left-2">
          <span className="bg-black/70 backdrop-blur-sm text-slate-300 text-[10px] font-medium px-1.5 py-0.5 rounded">
            {formatFormat(anime.format)}
          </span>
        </div>

        {/* Status indicator */}
        {anime.status === "RELEASING" && (
          <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Em exibição" />
        )}
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col gap-1.5 flex-1">
        <h3 className="text-white font-semibold text-sm leading-tight line-clamp-2 group-hover:text-violet-300 transition-colors">
          {title}
        </h3>

        {/* Genres */}
        {anime.genres.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {anime.genres.slice(0, 2).map((g) => (
              <Badge key={g} genre>
                {g}
              </Badge>
            ))}
          </div>
        )}

        {/* Meta */}
        <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-auto">
          {anime.episodes && <span>{anime.episodes} ep</span>}
          {anime.episodes && anime.seasonYear && <span>·</span>}
          {anime.seasonYear && <span>{anime.seasonYear}</span>}
        </div>

        {/* Description */}
        {showDescription && anime.description && (
          <p className="text-slate-400 text-xs line-clamp-3 mt-1">
            {anime.description.replace(/<[^>]+>/g, "")}
          </p>
        )}
      </div>
    </Link>
  );
}
