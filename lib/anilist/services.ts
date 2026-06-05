import { fetchAniList } from "./client";
import {
  SEARCH_ANIME_QUERY,
  TRENDING_ANIME_QUERY,
  POPULAR_ANIME_QUERY,
  ANIME_BY_ID_QUERY,
  SEASONAL_ANIME_QUERY,
  RECOMMENDATIONS_QUERY,
} from "./queries";
import type {
  AniListMedia,
  SearchAnimeResponse,
  TrendingAnimeResponse,
  AnimeByIdResponse,
  SeasonalAnimeResponse,
} from "./types";

export type { AniListMedia };

const COVERS_QUERY = `
query($ids: [Int]) {
  Page(perPage: 20) {
    media(id_in: $ids, type: ANIME) {
      id
      coverImage { large }
    }
  }
}
`;

export async function getAnimeCoversById(ids: number[]): Promise<Record<number, string | null>> {
  try {
    const data = await fetchAniList<{ Page: { media: { id: number; coverImage: { large: string } }[] } }>(
      COVERS_QUERY,
      { ids },
      3600
    );
    const result: Record<number, string | null> = {};
    for (const m of data.Page.media) result[m.id] = m.coverImage?.large ?? null;
    return result;
  } catch {
    return {};
  }
}

export async function searchAnime(
  params: {
    search?: string;
    genres?: string[];
    format?: string;
    status?: string;
    page?: number;
    perPage?: number;
  } = {}
): Promise<{ media: AniListMedia[]; hasNextPage: boolean; total: number }> {
  try {
    const data = await fetchAniList<SearchAnimeResponse>(SEARCH_ANIME_QUERY, {
      search: params.search || undefined,
      genres: params.genres?.length ? params.genres : undefined,
      format: params.format || undefined,
      status: params.status || undefined,
      page: params.page ?? 1,
      perPage: params.perPage ?? 20,
    });
    return {
      media: data.Page.media,
      hasNextPage: data.Page.pageInfo.hasNextPage,
      total: data.Page.pageInfo.total,
    };
  } catch {
    return { media: [], hasNextPage: false, total: 0 };
  }
}

export async function getTrendingAnime(perPage = 12): Promise<AniListMedia[]> {
  try {
    const data = await fetchAniList<TrendingAnimeResponse>(TRENDING_ANIME_QUERY, {
      page: 1,
      perPage,
    });
    return data.Page.media;
  } catch {
    return [];
  }
}

export async function getPopularAnime(perPage = 10): Promise<AniListMedia[]> {
  try {
    const data = await fetchAniList<TrendingAnimeResponse>(POPULAR_ANIME_QUERY, {
      page: 1,
      perPage,
    });
    return data.Page.media;
  } catch {
    return [];
  }
}

export async function getAnimeById(id: number): Promise<AniListMedia | null> {
  try {
    const data = await fetchAniList<AnimeByIdResponse>(
      ANIME_BY_ID_QUERY,
      { id },
      86400
    );
    return data.Media;
  } catch {
    return null;
  }
}

export function getCurrentSeason(): { season: string; year: number } {
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const season =
    month <= 3 ? "WINTER" : month <= 6 ? "SPRING" : month <= 9 ? "SUMMER" : "FALL";
  return { season, year };
}

export async function getSeasonalAnime(perPage = 20): Promise<AniListMedia[]> {
  try {
    const { season, year } = getCurrentSeason();
    const data = await fetchAniList<SeasonalAnimeResponse>(SEASONAL_ANIME_QUERY, {
      season,
      year,
      page: 1,
      perPage,
    });
    return data.Page.media;
  } catch {
    return [];
  }
}

export async function getRecommendedAnime(
  genres: string[],
  formats: string[] = ["TV"],
  perPage = 12
): Promise<AniListMedia[]> {
  try {
    const data = await fetchAniList<TrendingAnimeResponse>(RECOMMENDATIONS_QUERY, {
      genres: genres.length ? genres : undefined,
      formats,
      page: 1,
      perPage,
    });
    return data.Page.media;
  } catch {
    return [];
  }
}

export function createAnimeSlug(id: number, title: AniListMedia["title"]): string {
  const name = (title.english ?? title.romaji)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60);
  return `${id}-${name}`;
}

export function getIdFromSlug(slug: string): number {
  return parseInt(slug.split("-")[0], 10);
}

export function getDisplayTitle(title: AniListMedia["title"]): string {
  return title.english ?? title.romaji;
}

export function formatStatus(status: AniListMedia["status"]): string {
  const map: Record<string, string> = {
    FINISHED: "Finalizado",
    RELEASING: "Em exibição",
    NOT_YET_RELEASED: "Não lançado",
    CANCELLED: "Cancelado",
    HIATUS: "Hiato",
  };
  return map[status] ?? status;
}

export function formatSeason(
  season: AniListMedia["season"],
  year: number | null
): string {
  if (!season) return year ? String(year) : "—";
  const seasons: Record<string, string> = {
    WINTER: "Inverno",
    SPRING: "Primavera",
    SUMMER: "Verão",
    FALL: "Outono",
  };
  return `${seasons[season]} ${year ?? ""}`.trim();
}

export function formatFormat(format: AniListMedia["format"]): string {
  const map: Record<string, string> = {
    TV: "TV",
    MOVIE: "Filme",
    OVA: "OVA",
    ONA: "ONA",
    SPECIAL: "Especial",
    MUSIC: "Música",
    MANGA: "Mangá",
    NOVEL: "Novel",
    ONE_SHOT: "One-shot",
  };
  return map[format] ?? format;
}

export function stripHtml(html: string | null): string {
  if (!html) return "";
  return html.replace(/<[^>]+>/g, "").replace(/&[a-z]+;/gi, " ").trim();
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).replace(/\s+\S*$/, "") + "…";
}
