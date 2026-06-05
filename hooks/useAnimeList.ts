"use client";

import { useState, useEffect, useCallback } from "react";
import { trackMission } from "@/lib/missions";

export type AnimeStatus = "want" | "watching" | "watched" | "favorite";

export interface AnimeListItem {
  id: number;
  slug: string;
  title: string;
  cover: string | null;
  status: AnimeStatus;
  addedAt: string;
}

export const STATUS_LABELS: Record<AnimeStatus, string> = {
  want: "Quero Assistir",
  watching: "Assistindo",
  watched: "Já Assisti",
  favorite: "Favorito",
};

export const STATUS_ICONS: Record<AnimeStatus, string> = {
  want: "📌",
  watching: "👁️",
  watched: "✅",
  favorite: "❤️",
};

const KEY = "aibr_anime_list";

function readList(): AnimeListItem[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(KEY) ?? "[]"); } catch { return []; }
}

function writeList(items: AnimeListItem[]): void {
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function useAnimeList() {
  const [list, setList] = useState<AnimeListItem[]>([]);

  useEffect(() => { setList(readList()); }, []);

  const addAnimeToList = useCallback((item: Omit<AnimeListItem, "addedAt">) => {
    const current = readList();
    const exists = current.find((i) => i.id === item.id);
    let next: AnimeListItem[];
    if (exists) {
      next = current.map((i) => i.id === item.id ? { ...i, status: item.status } : i);
    } else {
      const newItem: AnimeListItem = { ...item, addedAt: new Date().toISOString() };
      next = [newItem, ...current];
      trackMission("list");
    }
    writeList(next);
    setList(next);
  }, []);

  const removeAnimeFromList = useCallback((animeId: number) => {
    const next = readList().filter((i) => i.id !== animeId);
    writeList(next);
    setList(next);
  }, []);

  const updateAnimeStatus = useCallback((animeId: number, status: AnimeStatus) => {
    const next = readList().map((i) => i.id === animeId ? { ...i, status } : i);
    writeList(next);
    setList(next);
  }, []);

  const isAnimeSaved = useCallback((animeId: number): AnimeStatus | null => {
    return readList().find((i) => i.id === animeId)?.status ?? null;
  }, []);

  const getAnimeListByStatus = useCallback((status: AnimeStatus): AnimeListItem[] => {
    return readList().filter((i) => i.status === status);
  }, []);

  return { list, addAnimeToList, removeAnimeFromList, updateAnimeStatus, isAnimeSaved, getAnimeListByStatus };
}
