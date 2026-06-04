export interface AniListTitle {
  romaji: string;
  english: string | null;
  native: string;
}

export interface AniListCoverImage {
  large: string;
  medium: string;
  color: string | null;
}

export interface AniListCharacter {
  id: number;
  name: { full: string; native: string | null };
  image: { large: string; medium: string };
}

export interface AniListMedia {
  id: number;
  title: AniListTitle;
  description: string | null;
  coverImage: AniListCoverImage;
  bannerImage: string | null;
  genres: string[];
  status: "FINISHED" | "RELEASING" | "NOT_YET_RELEASED" | "CANCELLED" | "HIATUS";
  season: "WINTER" | "SPRING" | "SUMMER" | "FALL" | null;
  seasonYear: number | null;
  episodes: number | null;
  duration: number | null;
  averageScore: number | null;
  popularity: number;
  format: "TV" | "MOVIE" | "OVA" | "ONA" | "SPECIAL" | "MUSIC" | "MANGA" | "NOVEL" | "ONE_SHOT";
  startDate: { year: number | null; month: number | null; day: number | null };
  studios?: { nodes: Array<{ name: string }> };
  characters?: { nodes: AniListCharacter[] };
  relations?: {
    edges: Array<{
      node: AniListMedia;
      relationType: string;
    }>;
  };
  recommendations?: {
    nodes: Array<{
      rating: number;
      mediaRecommendation: AniListMedia | null;
    }>;
  };
  trailer?: { id: string; site: string } | null;
}

export interface AniListPageInfo {
  total: number;
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
}

export interface AniListPage<T> {
  pageInfo: AniListPageInfo;
  media: T[];
}

export interface SearchAnimeResponse {
  Page: AniListPage<AniListMedia>;
}

export interface TrendingAnimeResponse {
  Page: AniListPage<AniListMedia>;
}

export interface AnimeByIdResponse {
  Media: AniListMedia;
}

export interface SeasonalAnimeResponse {
  Page: AniListPage<AniListMedia>;
}
