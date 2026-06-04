import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import AnimeCard from "@/components/anime/AnimeCard";
import {
  getAnimeById,
  getIdFromSlug,
  getDisplayTitle,
  formatSeason,
} from "@/lib/anilist/services";
import { fetchAniList } from "@/lib/anilist/client";
import { MEDIA_FRAGMENT } from "@/lib/anilist/queries";
import type { AniListMedia, TrendingAnimeResponse } from "@/lib/anilist/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const SIMILAR_BY_GENRE_QUERY = `
  ${MEDIA_FRAGMENT}
  query SimilarAnime($genres: [String], $id_not: Int, $page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      media(type: ANIME, genre_in: $genres, id_not: $id_not, sort: SCORE_DESC, status: FINISHED, averageScore_greater: 65) {
        ...MediaFields
      }
    }
  }
`;

async function getSimilarAnime(id: number, genres: string[]): Promise<AniListMedia[]> {
  try {
    const data = await fetchAniList<TrendingAnimeResponse>(SIMILAR_BY_GENRE_QUERY, {
      genres,
      id_not: id,
      page: 1,
      perPage: 12,
    });
    return data.Page.media;
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const id = getIdFromSlug(slug);
  if (isNaN(id)) return { title: "Animes Parecidos" };

  const anime = await getAnimeById(id);
  if (!anime) return { title: "Animes Parecidos" };

  const title = getDisplayTitle(anime.title);
  return {
    title: `Animes Parecidos com ${title}`,
    description: `Se você gosta de ${title}, vai adorar esses animes com gêneros e estilo semelhantes. Lista com ${anime.genres.slice(0, 3).join(", ")}.`,
  };
}

export default async function ParecidosSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const id = getIdFromSlug(slug);

  if (isNaN(id)) notFound();

  const anime = await getAnimeById(id);
  if (!anime) notFound();

  const title = getDisplayTitle(anime.title);
  const score = anime.averageScore ? (anime.averageScore / 10).toFixed(1) : null;

  // Get similar: combine recommendations + genre-based search
  const [recSimilar, genreSimilar] = await Promise.all([
    Promise.resolve(
      (anime.recommendations?.nodes ?? [])
        .filter((n) => n.mediaRecommendation && n.rating > 0)
        .slice(0, 6)
        .map((n) => n.mediaRecommendation!)
    ),
    getSimilarAnime(anime.id, anime.genres.slice(0, 2)),
  ]);

  // Merge and deduplicate
  const seen = new Set<number>();
  const similar: AniListMedia[] = [];
  for (const a of [...recSimilar, ...genreSimilar]) {
    if (!seen.has(a.id)) {
      seen.add(a.id);
      similar.push(a);
    }
  }

  const whyGenres = anime.genres.slice(0, 3).join(", ");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-white transition-colors">Início</Link>
        <span>/</span>
        <Link href="/parecidos" className="hover:text-white transition-colors">Parecidos</Link>
        <span>/</span>
        <span className="text-slate-300 line-clamp-1">{title}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold font-display text-white mb-2">
          Animes Parecidos com <span className="gradient-text">{title}</span>
        </h1>

        {/* Reference card */}
        <div className="mt-4 p-4 rounded-xl bg-[#0d1424] border border-white/8 flex flex-wrap items-center gap-4">
          <div>
            <p className="text-slate-400 text-xs mb-1">Você procurou por</p>
            <p className="text-white font-semibold">{title}</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {anime.genres.slice(0, 4).map((g) => (
                <span key={g} className="text-xs px-2 py-0.5 rounded-full bg-violet-900/40 text-violet-300 border border-violet-800/50">
                  {g}
                </span>
              ))}
            </div>
          </div>
          {score && (
            <div className="flex items-center gap-1 ml-auto">
              <span className="text-yellow-400 text-lg">★</span>
              <span className="text-white font-bold text-lg">{score}</span>
            </div>
          )}
        </div>
      </div>

      {/* Why similar */}
      <div className="mb-6 p-4 rounded-xl bg-blue-900/20 border border-blue-800/25">
        <p className="text-blue-300 text-sm">
          <strong>Por que esses animes?</strong> Selecionamos títulos com gêneros similares ({whyGenres}),
          bem avaliados pela comunidade e recomendados por quem curtiu {title}.
          {formatSeason(anime.season, anime.seasonYear) !== "—" && ` Temporada: ${formatSeason(anime.season, anime.seasonYear)}.`}
        </p>
      </div>

      {/* Grid */}
      {similar.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-slate-400 mb-4">Não encontramos recomendações suficientes para este anime.</p>
          <Link href="/anime" className="px-6 py-2.5 btn-primary text-white font-semibold rounded-xl">
            Explorar animes
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {similar.map((a, i) => (
            <AnimeCard key={a.id} anime={a} priority={i < 6} />
          ))}
        </div>
      )}

      {/* Related links */}
      <div className="mt-12 border-t border-white/8 pt-8">
        <h2 className="text-lg font-semibold text-white mb-4">Outras Buscas Populares</h2>
        <div className="flex flex-wrap gap-2">
          {[
            { slug: "5114-fullmetal-alchemist-brotherhood", label: "FMA: Brotherhood" },
            { slug: "2904-death-note", label: "Death Note" },
            { slug: "30276-one-punch-man", label: "One Punch Man" },
            { slug: "9253-steinsgate", label: "Steins;Gate" },
          ]
            .filter((l) => !slug.startsWith(l.slug.split("-")[0]))
            .map((link) => (
              <Link
                key={link.slug}
                href={`/parecidos/${link.slug}`}
                className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:border-violet-500/40 text-slate-300 hover:text-violet-300 text-sm font-medium transition-all"
              >
                Parecido com {link.label}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
