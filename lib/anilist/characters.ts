import { fetchAniList } from "./client";

export interface AniListCharacter {
  id: number;
  name: { full: string; native: string | null };
  image: { large: string; medium: string };
  description: string | null;
  favourites: number;
  media: {
    nodes: Array<{
      id: number;
      title: { romaji: string; english: string | null };
      coverImage: { large: string };
      type: string;
    }>;
  };
}

const SEARCH_CHARACTERS_QUERY = `
query SearchCharacters($search: String, $page: Int) {
  Page(page: $page, perPage: 12) {
    characters(search: $search, sort: [FAVOURITES_DESC]) {
      id
      name { full native }
      image { large medium }
      description(asHtml: false)
      favourites
      media(perPage: 3, type: ANIME) {
        nodes {
          id
          title { romaji english }
          coverImage { large }
          type
        }
      }
    }
  }
}
`;

const GET_CHARACTER_QUERY = `
query GetCharacter($id: Int) {
  Character(id: $id) {
    id
    name { full native }
    image { large medium }
    description(asHtml: false)
    favourites
    media(perPage: 5, type: ANIME) {
      nodes {
        id
        title { romaji english }
        coverImage { large }
        type
      }
    }
  }
}
`;

export async function searchCharacters(query: string, page = 1): Promise<AniListCharacter[]> {
  try {
    const data = await fetchAniList<{ Page: { characters: AniListCharacter[] } }>(
      SEARCH_CHARACTERS_QUERY, { search: query, page }, 300
    );
    return data.Page.characters;
  } catch { return []; }
}

export async function getCharacterById(id: number): Promise<AniListCharacter | null> {
  try {
    const data = await fetchAniList<{ Character: AniListCharacter }>(
      GET_CHARACTER_QUERY, { id }, 3600
    );
    return data.Character;
  } catch { return null; }
}

export function stripDescription(text: string | null, maxLen = 300): string {
  if (!text) return "";
  return text.replace(/__[^_]+__/g, "").replace(/~![^~]+!~/g, "[spoiler]").slice(0, maxLen).trim();
}
