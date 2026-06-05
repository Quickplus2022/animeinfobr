export interface DuelAnime {
  id: number;
  slug: string;
  title: string;
  cover: string | null;
}

export interface Duel {
  slug: string;
  question: string;
  emoji: string;
  a: DuelAnime;
  b: DuelAnime;
}

export const DUELS: Duel[] = [
  {
    slug: "naruto-vs-one-piece",
    question: "Qual é o melhor shounen longo?",
    emoji: "⚔️",
    a: { id: 20, slug: "20-naruto", title: "Naruto", cover: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx20-zvKFcpMQhIhK.jpg" },
    b: { id: 21, slug: "21-one-piece", title: "One Piece", cover: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21-jlAVTgFOzBN3.jpg" },
  },
  {
    slug: "demon-slayer-vs-jujutsu-kaisen",
    question: "Qual tem a melhor animação?",
    emoji: "🎨",
    a: { id: 101922, slug: "101922-kimetsu-no-yaiba", title: "Demon Slayer", cover: null },
    b: { id: 113415, slug: "113415-jujutsu-kaisen", title: "Jujutsu Kaisen", cover: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx113415-979R8ItZ0kDQ.jpg" },
  },
  {
    slug: "death-note-vs-attack-on-titan",
    question: "Qual é o melhor thriller?",
    emoji: "🔥",
    a: { id: 1535, slug: "1535-death-note", title: "Death Note", cover: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx1535-lawCwhzEoSBt.jpg" },
    b: { id: 16498, slug: "16498-shingeki-no-kyojin", title: "Attack on Titan", cover: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx16498-73IhOXpJZiMF.jpg" },
  },
  {
    slug: "hxh-vs-fma-brotherhood",
    question: "Qual é a melhor obra completa?",
    emoji: "🏆",
    a: { id: 11061, slug: "11061-hunter-x-hunter-2011", title: "Hunter x Hunter", cover: null },
    b: { id: 5114, slug: "5114-fullmetal-alchemist-brotherhood", title: "Fullmetal Alchemist: Brotherhood", cover: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx5114-KJTQz9AIm6Wk.jpg" },
  },
  {
    slug: "mha-vs-bleach",
    question: "Qual você prefere?",
    emoji: "💥",
    a: { id: 99262, slug: "99262-boku-no-hero-academia", title: "My Hero Academia", cover: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx99262-qVFY5BzdIeD0.jpg" },
    b: { id: 269, slug: "269-bleach", title: "Bleach", cover: null },
  },
];
