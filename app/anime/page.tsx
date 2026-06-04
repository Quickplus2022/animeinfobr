import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import AnimeGrid from "@/components/anime/AnimeGrid";
import { AnimeGridSkeleton } from "@/components/anime/AnimeSkeleton";
import AnimeSearchClient from "./AnimeSearchClient";
import { searchAnime, getTrendingAnime } from "@/lib/anilist/services";

interface PageProps {
  searchParams: Promise<{ q?: string; genres?: string; sort?: string; page?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const q = params.q;
  return {
    title: q ? `Busca: "${q}"` : "Buscar Animes",
    description: q
      ? `Resultados para "${q}" no AnimeInfoBR. Encontre sinopse, gêneros, nota e onde assistir.`
      : "Busque qualquer anime. Encontre sinopse, gêneros, notas e onde assistir legalmente.",
  };
}

const GENRES = [
  "Action", "Adventure", "Comedy", "Drama", "Fantasy",
  "Horror", "Mystery", "Romance", "Sci-Fi", "Sports",
  "Slice of Life", "Supernatural", "Thriller", "Mecha", "Psychological",
];

async function AnimeResults({ q, genres }: { q?: string; genres?: string }) {
  if (!q && !genres) {
    const trending = await getTrendingAnime(24);
    return (
      <>
        <p className="text-slate-400 text-sm mb-6">
          Mostrando animes em alta. Use a busca acima para encontrar títulos específicos.
        </p>
        <AnimeGrid animes={trending} />
      </>
    );
  }

  const genreList = genres ? [genres] : [];
  const result = await searchAnime({ search: q, genres: genreList, perPage: 24 });

  return (
    <>
      {q && (
        <p className="text-slate-400 text-sm mb-6">
          {result.total > 0
            ? `${result.total} resultados para "${q}"`
            : `Nenhum resultado para "${q}"`}
        </p>
      )}
      <AnimeGrid animes={result.media} />
    </>
  );
}

export default async function AnimePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const { q, genres } = params;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-display text-white mb-2">
          {q ? `Busca: "${q}"` : "Buscar Animes"}
        </h1>
        <p className="text-slate-400">
          Encontre qualquer anime, veja sinopse sem spoiler e saiba onde assistir legalmente.
        </p>
      </div>

      {/* Search bar client */}
      <AnimeSearchClient initialQuery={q ?? ""} />

      {/* Genre filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Link
          href="/anime"
          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
            !genres ? "bg-violet-600 text-white border-transparent" : "border-white/15 text-slate-400 hover:border-white/30 hover:text-white"
          }`}
        >
          Todos
        </Link>
        {GENRES.map((g) => (
          <Link
            key={g}
            href={`/anime?genres=${g}${q ? `&q=${q}` : ""}`}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              genres === g
                ? "bg-violet-600 text-white border-transparent"
                : "border-white/15 text-slate-400 hover:border-white/30 hover:text-white"
            }`}
          >
            {g}
          </Link>
        ))}
      </div>

      {/* Results */}
      <Suspense fallback={<AnimeGridSkeleton />}>
        <AnimeResults q={q} genres={genres} />
      </Suspense>
    </div>
  );
}
