import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MISSIONS_DATA } from "@/data/mock/rpg";
import MissaoClient from "./MissaoClient";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const m = MISSIONS_DATA.find(x => x.slug === slug);
  if (!m) return { title: "Missão não encontrada" };
  return { title: `${m.title} | Guilds AnimeInfoBR`, description: m.description };
}

export default async function MissaoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const mission = MISSIONS_DATA.find(m => m.slug === slug);
  if (!mission) notFound();
  return <MissaoClient mission={mission} />;
}
