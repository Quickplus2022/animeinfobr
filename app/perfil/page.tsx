import type { Metadata } from "next";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PerfilClient from "./PerfilClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Meu Perfil | AnimeInfoBR",
  description: "Seu perfil otaku — DNA de personagem, lista, favoritos e muito mais.",
};

export default async function PerfilPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/");

  let activeTab = "overview";
  try {
    const params = await searchParams;
    activeTab = params.tab ?? "overview";
  } catch {
    // searchParams unavailable — use default
  }

  const userId = session.user.id;

  const [user, favorites, watchLater, likes, testResult, slots, rpgCharacter, rpgBadges] =
    await Promise.all([
      prisma.user
        .findUnique({
          where: { id: userId },
          select: {
            bio: true,
            avatarEmoji: true,
            avatarColor: true,
            avatarUrl: true,
            username: true,
            favoriteAnimeTitle: true,
            profileVisibility: true,
            animeDnaJson: true,
          },
        })
        .catch(() => null),
      prisma.userFavorite
        .findMany({ where: { userId }, orderBy: { addedAt: "desc" }, select: { id: true, slug: true, title: true, cover: true } })
        .catch(() => [] as { id: string; slug: string; title: string; cover: string | null }[]),
      prisma.userWatchLater
        .findMany({ where: { userId }, orderBy: { addedAt: "desc" }, select: { id: true, slug: true, title: true, cover: true } })
        .catch(() => [] as { id: string; slug: string; title: string; cover: string | null }[]),
      prisma.userLike
        .findMany({ where: { userId } })
        .catch(() => [] as { id: string }[]),
      prisma.characterTestResult
        .findFirst({ where: { userId }, orderBy: { createdAt: "desc" }, select: { id: true } })
        .catch(() => null),
      prisma.userCharacterSlot
        .findMany({ where: { userId }, select: { id: true } })
        .catch(() => [] as { id: string }[]),
      prisma.rpgCharacter
        .findUnique({
          where: { userId },
          select: { name: true, avatarEmoji: true, classType: true, elementType: true, level: true, xp: true },
        })
        .catch(() => null),
      prisma.rpgBadge
        .findMany({
          where: { userId },
          orderBy: { unlockedAt: "desc" },
          select: { id: true, badgeName: true, description: true },
        })
        .catch(() => [] as { id: string; badgeName: string; description: string }[]),
    ]);

  return (
    <PerfilClient
      activeTab={activeTab}
      session={{ id: userId, name: session.user.name, email: session.user.email }}
      profile={user}
      favorites={favorites}
      watchLater={watchLater}
      likesCount={likes.length}
      hasTestResult={!!testResult}
      slotCount={slots.length}
      rpgCharacter={rpgCharacter}
      rpgBadges={rpgBadges}
    />
  );
}
