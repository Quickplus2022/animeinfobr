import { type NextRequest, NextResponse } from "next/server";
import { getRecommendedAnime } from "@/lib/anilist/services";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const genre = searchParams.get("genre");
  const format = searchParams.get("format");
  const perPage = parseInt(searchParams.get("perPage") ?? "12", 10);

  const genres = genre ? [genre] : ["Action", "Drama"];
  const formats = format ? [format] : ["TV"];

  const media = await getRecommendedAnime(genres, formats, perPage);
  return NextResponse.json({ media });
}
