const ANILIST_API = "https://graphql.anilist.co";

export async function fetchAniList<T>(
  query: string,
  variables?: Record<string, unknown>,
  revalidate = 3600
): Promise<T> {
  const response = await fetch(ANILIST_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate },
  });

  if (!response.ok) {
    throw new Error(`AniList API error: ${response.status} ${response.statusText}`);
  }

  const json = await response.json();

  if (json.errors) {
    throw new Error(json.errors[0]?.message ?? "AniList GraphQL error");
  }

  return json.data as T;
}
