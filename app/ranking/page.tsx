import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPopularAnime, getTrendingAnime, getDisplayTitle, createAnimeSlug, formatFormat } from "@/lib/anilist/services";
import Badge from "@/components/ui/Badge";
import RefreshButton from "@/components/ui/RefreshButton";

export const metadata: Metadata = {
  title: "Ranking de Animes — Os Mais Populares no Brasil",
  description:
    "Ranking dos animes mais populares e bem avaliados no Brasil. Veja os tops por popularidade, nota e temporada atual.",
};

export default async function RankingPage() {
  const [popular, trending] = await Promise.all([
    getPopularAnime(20),
    getTrendingAnime(10),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold font-display text-white mb-2">
            🏆 Ranking AnimeInfoBR
          </h1>
          <p className="text-slate-400">
            Os animes mais populares e bem avaliados. Atualizado com dados da comunidade global.
          </p>
        </div>
        <RefreshButton label="Atualizar Ranking" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main ranking */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">🌍 Mais Populares</h2>
            <span className="text-xs text-slate-500">Baseado em popularidade global</span>
          </div>
          <div className="space-y-3">
            {popular.map((anime, i) => {
              const slug = createAnimeSlug(anime.id, anime.title);
              const title = getDisplayTitle(anime.title);
              const score = anime.averageScore ? (anime.averageScore / 10).toFixed(1) : null;
              const medal = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : null;

              return (
                <Link
                  key={anime.id}
                  href={`/anime/${slug}`}
                  className="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-[#0d1424] border border-white/8 hover:border-violet-500/30 transition-all group"
                >
                  {/* Position */}
                  <div className="w-8 sm:w-10 text-center shrink-0">
                    {medal ? (
                      <span className="text-lg sm:text-xl">{medal}</span>
                    ) : (
                      <span className={`text-base sm:text-lg font-black ${i < 10 ? "text-slate-400" : "text-slate-600"}`}>
                        {i + 1}
                      </span>
                    )}
                  </div>

                  {/* Cover */}
                  {anime.coverImage.large && (
                    <div className="relative w-10 h-14 sm:w-12 sm:h-16 shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src={anime.coverImage.large}
                        alt={title}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                  )}

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-sm line-clamp-1 group-hover:text-violet-300 transition-colors">
                      {title}
                    </h3>
                    <div className="flex flex-wrap gap-1 mt-0.5">
                      {anime.genres.slice(0, 2).map((g) => (
                        <Badge key={g} genre>{g}</Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                      <span>{formatFormat(anime.format)}</span>
                      {anime.episodes && <><span>·</span><span>{anime.episodes} ep</span></>}
                    </div>
                  </div>

                  {/* Score */}
                  {score && (
                    <div className="shrink-0 text-right">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400 text-sm">★</span>
                        <span className="text-white font-bold text-sm">{score}</span>
                      </div>
                      <div className="text-slate-600 text-[10px]">nota</div>
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Sidebar: trending */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">🔥 Em Alta Agora</h2>
          </div>
          <div className="space-y-3">
            {trending.slice(0, 10).map((anime, i) => {
              const slug = createAnimeSlug(anime.id, anime.title);
              const title = getDisplayTitle(anime.title);
              return (
                <Link
                  key={anime.id}
                  href={`/anime/${slug}`}
                  className="flex items-center gap-3 group"
                >
                  <span className="text-slate-600 text-sm font-bold w-5 shrink-0">{i + 1}</span>
                  {anime.coverImage.medium && (
                    <div className="relative w-8 h-10 shrink-0 rounded overflow-hidden">
                      <Image
                        src={anime.coverImage.medium}
                        alt={title}
                        fill
                        sizes="32px"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <span className="text-slate-300 text-sm line-clamp-1 group-hover:text-violet-300 transition-colors">
                    {title}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-6 p-4 rounded-xl bg-[#0d1424] border border-white/8">
            <h3 className="text-sm font-semibold text-white mb-2">ℹ️ Sobre o Ranking</h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              O ranking é baseado em popularidade e nota média da comunidade global via AniList.
              Em breve: votação dos usuários brasileiros do AnimeInfoBR.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
