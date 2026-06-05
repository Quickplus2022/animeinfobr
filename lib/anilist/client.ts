import { safeFetchJson } from "@/lib/http/safe-fetch";

const ANILIST_API = "https://graphql.anilist.co";

interface AniListEnvelope<T> {
  data: T;
  errors?: { message: string }[];
}

export async function fetchAniList<T>(
  query: string,
  variables?: Record<string, unknown>,
  revalidate = 3600
): Promise<T> {
  const json = await safeFetchJson<AniListEnvelope<T> | null>(ANILIST_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate },
    timeoutMs: 12_000,
    retries: 2,
    fallback: null,
    label: "AniList GraphQL",
  });

  if (!json) throw new Error("AniList API unavailable");
  if (json.errors?.length) throw new Error(json.errors[0].message ?? "AniList GraphQL error");
  return json.data;
}
