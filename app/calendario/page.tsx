import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getSeasonalAnime, getCurrentSeason, getDisplayTitle, createAnimeSlug, formatFormat } from "@/lib/anilist/services";
import Badge from "@/components/ui/Badge";
import RefreshButton from "@/components/ui/RefreshButton";
import { AnimeGridSkeleton } from "@/components/anime/AnimeSkeleton";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Calendário da Temporada",
  description: "Acompanhe os lançamentos de anime da temporada atual. Veja quais animes estão sendo exibidos agora, quando estreiam novos episódios e os mais populares.",
};

const SEASON_NAMES: Record<string, string> = {
  WINTER: "Inverno",
  SPRING: "Primavera",
  SUMMER: "Verão",
  FALL: "Outono",
};

const DAY_ORDER = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

async function SeasonalGrid() {
  const animes = await getSeasonalAnime(50);
  const { season, year } = getCurrentSeason();

  if (animes.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-5xl mb-4">📡</div>
        <p className="text-slate-400 text-lg font-medium">Calendário temporariamente indisponível</p>
        <p className="text-slate-600 text-sm mt-2">
          Não foi possível carregar os animes de {SEASON_NAMES[season]} {year}. Tente novamente em alguns instantes.
        </p>
      </div>
    );
  }

  const releasing = animes.filter((a) => a.status === "RELEASING");
  const notStarted = animes.filter((a) => a.status === "NOT_YET_RELEASED");
  const finished = animes.filter((a) => a.status === "FINISHED");

  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { label: "Em Exibição", value: releasing.length, color: "text-emerald-400", bg: "bg-emerald-900/20 border-emerald-800/30" },
          { label: "Em Breve", value: notStarted.length, color: "text-yellow-400", bg: "bg-yellow-900/20 border-yellow-800/30" },
          { label: "Finalizados", value: finished.length, color: "text-slate-400", bg: "bg-white/5 border-white/8" },
        ].map((stat) => (
          <div key={stat.label} className={`p-4 rounded-xl border text-center ${stat.bg}`}>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-slate-400 text-xs mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Releasing */}
      {releasing.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Em Exibição Agora
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {releasing.map((anime) => {
              const slug = createAnimeSlug(anime.id, anime.title);
              const title = getDisplayTitle(anime.title);
              const score = anime.averageScore ? (anime.averageScore / 10).toFixed(1) : null;
              return (
                <Link
                  key={anime.id}
                  href={`/anime/${slug}`}
                  className="flex gap-3 p-3 rounded-xl bg-[#0d1424] border border-white/8 hover:border-emerald-500/40 transition-all group"
                >
                  <div className="relative w-16 h-20 shrink-0 rounded-lg overflow-hidden bg-[#152038]">
                    {anime.coverImage.large && (
                      <Image
                        src={anime.coverImage.large}
                        alt={title}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-sm line-clamp-2 group-hover:text-emerald-300 transition-colors">
                      {title}
                    </h3>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {anime.genres.slice(0, 2).map((g) => (
                        <Badge key={g} genre>{g}</Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-500">
                      <span>{formatFormat(anime.format)}</span>
                      {anime.episodes && <><span>·</span><span>{anime.episodes} ep</span></>}
                      {score && (
                        <span className="ml-auto flex items-center gap-0.5">
                          <span className="text-yellow-400">★</span>
                          <span className="text-slate-300">{score}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Not yet released */}
      {notStarted.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-bold text-white mb-4">🗓️ Em Breve</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {notStarted.map((anime) => {
              const slug = createAnimeSlug(anime.id, anime.title);
              const title = getDisplayTitle(anime.title);
              return (
                <Link
                  key={anime.id}
                  href={`/anime/${slug}`}
                  className="group relative flex flex-col rounded-xl overflow-hidden bg-[#0d1424] border border-yellow-800/30 hover:border-yellow-500/50 transition-all"
                >
                  <div className="relative aspect-[2/3] overflow-hidden bg-[#152038]">
                    {anime.coverImage.large && (
                      <Image
                        src={anime.coverImage.large}
                        alt={title}
                        fill
                        sizes="(max-width: 640px) 50vw, 16vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                    <div className="absolute top-2 left-2 bg-yellow-500/90 text-black text-[10px] font-bold px-1.5 py-0.5 rounded">
                      Em breve
                    </div>
                  </div>
                  <div className="p-2">
                    <h3 className="text-white text-xs font-medium line-clamp-2">{title}</h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Weekly schedule hint */}
      <div className="bg-[#0d1424] rounded-2xl border border-white/8 p-6">
        <h2 className="text-lg font-bold text-white mb-2">📆 Dias da Semana</h2>
        <p className="text-slate-400 text-sm mb-4">
          A maioria dos animes da temporada de {SEASON_NAMES[season]} {year} lança episódios semanalmente.
          Acompanhe os lançamentos por dia:
        </p>
        <div className="grid grid-cols-7 gap-1">
          {DAY_ORDER.map((day) => (
            <div key={day} className="flex flex-col items-center p-2 rounded-lg bg-white/5">
              <span className="text-slate-400 text-[10px] font-medium">{day.slice(0, 3)}</span>
            </div>
          ))}
        </div>
        <p className="text-slate-600 text-xs mt-3">
          * Horários exatos em UTC-3 (Brasília). Anime geralmente liberam à meia-noite do Japão.
        </p>
      </div>
    </>
  );
}

export default async function CalendarioPage() {
  const { season, year } = getCurrentSeason();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold font-display text-white mb-2">
            Calendário da Temporada
          </h1>
          <p className="text-slate-400">
            Temporada de {SEASON_NAMES[season]} {year} • Acompanhe os lançamentos e estreias
          </p>
        </div>
        <RefreshButton />
      </div>

      <Suspense fallback={<AnimeGridSkeleton count={18} />}>
        <SeasonalGrid />
      </Suspense>
    </div>
  );
}
