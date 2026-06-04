import { type NextRequest, NextResponse } from "next/server";
import { searchAnime } from "@/lib/anilist/services";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  const genres = searchParams.getAll("genre");
  const format = searchParams.get("format") ?? undefined;
  const page = parseInt(searchParams.get("page") ?? "1", 10);
  const perPage = parseInt(searchParams.get("perPage") ?? "20", 10);

  const result = await searchAnime({
    search: q || undefined,
    genres: genres.length ? genres : undefined,
    format,
    page,
    perPage: Math.min(perPage, 50),
  });

  return NextResponse.json(result, {
    headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" },
  });
}
