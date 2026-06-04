export const MEDIA_FRAGMENT = `
  fragment MediaFields on Media {
    id
    title { romaji english native }
    description(asHtml: false)
    coverImage { large medium color }
    bannerImage
    genres
    status
    season
    seasonYear
    episodes
    duration
    averageScore
    popularity
    format
    startDate { year month day }
  }
`;

export const SEARCH_ANIME_QUERY = `
  ${MEDIA_FRAGMENT}
  query SearchAnime($search: String, $page: Int, $perPage: Int, $genres: [String], $format: MediaFormat, $status: MediaStatus) {
    Page(page: $page, perPage: $perPage) {
      pageInfo { total currentPage lastPage hasNextPage }
      media(search: $search, type: ANIME, sort: POPULARITY_DESC, genre_in: $genres, format: $format, status: $status) {
        ...MediaFields
      }
    }
  }
`;

export const TRENDING_ANIME_QUERY = `
  ${MEDIA_FRAGMENT}
  query TrendingAnime($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo { total currentPage lastPage hasNextPage }
      media(type: ANIME, sort: TRENDING_DESC, status_not: NOT_YET_RELEASED) {
        ...MediaFields
      }
    }
  }
`;

export const POPULAR_ANIME_QUERY = `
  ${MEDIA_FRAGMENT}
  query PopularAnime($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo { total currentPage lastPage hasNextPage }
      media(type: ANIME, sort: POPULARITY_DESC, status: FINISHED) {
        ...MediaFields
      }
    }
  }
`;

export const ANIME_BY_ID_QUERY = `
  ${MEDIA_FRAGMENT}
  query AnimeById($id: Int) {
    Media(id: $id, type: ANIME) {
      ...MediaFields
      studios { nodes { name } }
      characters(sort: [ROLE, RELEVANCE], perPage: 8) {
        nodes { id name { full native } image { large medium } }
      }
      relations {
        edges {
          node { ...MediaFields }
          relationType(version: 2)
        }
      }
      recommendations(sort: RATING_DESC, perPage: 8) {
        nodes {
          rating
          mediaRecommendation { ...MediaFields }
        }
      }
      trailer { id site }
    }
  }
`;

export const SEASONAL_ANIME_QUERY = `
  ${MEDIA_FRAGMENT}
  query SeasonalAnime($season: MediaSeason, $year: Int, $page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo { total currentPage lastPage hasNextPage }
      media(type: ANIME, season: $season, seasonYear: $year, sort: POPULARITY_DESC) {
        ...MediaFields
      }
    }
  }
`;

export const RECOMMENDATIONS_QUERY = `
  ${MEDIA_FRAGMENT}
  query RecommendedAnime($page: Int, $perPage: Int, $genres: [String], $formats: [MediaFormat]) {
    Page(page: $page, perPage: $perPage) {
      pageInfo { total currentPage lastPage hasNextPage }
      media(type: ANIME, genre_in: $genres, format_in: $formats, sort: SCORE_DESC, status: FINISHED, averageScore_greater: 70) {
        ...MediaFields
      }
    }
  }
`;
