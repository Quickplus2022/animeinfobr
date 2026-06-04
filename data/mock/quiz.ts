export interface QuizQuestion {
  id: string;
  question: string;
  emoji: string;
  options: Array<{ label: string; value: string; emoji: string }>;
}

export interface QuizResult {
  title: string;
  description: string;
  genres: string[];
  formats: string[];
  emoji: string;
  highlights: string[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "mood",
    question: "Qual clima você quer hoje?",
    emoji: "🎭",
    options: [
      { label: "Ação intensa", value: "action", emoji: "⚔️" },
      { label: "Romance e drama", value: "romance", emoji: "💕" },
      { label: "Comédia e leveza", value: "comedy", emoji: "😂" },
      { label: "Mistério e suspense", value: "mystery", emoji: "🕵️" },
    ],
  },
  {
    id: "time",
    question: "Quanto tempo você tem?",
    emoji: "⏱️",
    options: [
      { label: "Pouco (12 eps)", value: "short", emoji: "⚡" },
      { label: "Médio (24-50 eps)", value: "medium", emoji: "📺" },
      { label: "Muito (100+ eps)", value: "long", emoji: "🏃" },
      { label: "Prefiro filmes", value: "movie", emoji: "🎬" },
    ],
  },
  {
    id: "intensity",
    question: "Nível de intensidade desejado?",
    emoji: "🔥",
    options: [
      { label: "Leve e relaxante", value: "chill", emoji: "☁️" },
      { label: "Envolvente", value: "moderate", emoji: "🌊" },
      { label: "Intenso e pesado", value: "intense", emoji: "🔥" },
      { label: "Me surpreenda!", value: "surprise", emoji: "🎲" },
    ],
  },
  {
    id: "experience",
    question: "Qual sua experiência com anime?",
    emoji: "🎌",
    options: [
      { label: "Iniciante total", value: "beginner", emoji: "🌱" },
      { label: "Assisto alguns", value: "intermediate", emoji: "🌿" },
      { label: "Otaku experiente", value: "expert", emoji: "🌳" },
      { label: "Só assistia antes", value: "returning", emoji: "🔄" },
    ],
  },
  {
    id: "avoid",
    question: "O que você quer evitar?",
    emoji: "🚫",
    options: [
      { label: "Spoilers e fillers", value: "nofillers", emoji: "⏭️" },
      { label: "Violência excessiva", value: "noviolence", emoji: "🕊️" },
      { label: "Finais abertos", value: "complete", emoji: "✅" },
      { label: "Nada! Pode tudo", value: "anything", emoji: "🎯" },
    ],
  },
];

export const QUIZ_RESULTS: Record<string, QuizResult> = {
  action_short: {
    title: "Você quer Ação Rápida e Explosiva!",
    emoji: "⚡",
    description: "Você está no humor certo para algo que te prenda do primeiro episódio. Sem enrolação, só ação pura.",
    genres: ["Action", "Adventure"],
    formats: ["TV"],
    highlights: ["One Punch Man", "Demon Slayer", "Jujutsu Kaisen"],
  },
  action_long: {
    title: "Prepare-se para uma Aventura Épica!",
    emoji: "⚔️",
    description: "Você quer se perder completamente num mundo incrível por muito tempo.",
    genres: ["Action", "Adventure", "Fantasy"],
    formats: ["TV"],
    highlights: ["Naruto", "One Piece", "Fairy Tail"],
  },
  romance_medium: {
    title: "Você Quer Romance com Profundidade",
    emoji: "💕",
    description: "Histórias de amor envolventes, com personagens que crescem juntos.",
    genres: ["Romance", "Drama"],
    formats: ["TV"],
    highlights: ["Violet Evergarden", "Your Lie in April", "Clannad"],
  },
  comedy_short: {
    title: "Você Quer Rir Muito!",
    emoji: "😂",
    description: "Sem drama. Só diversão, personagens engraçados e momentos hilários.",
    genres: ["Comedy", "Slice of Life"],
    formats: ["TV"],
    highlights: ["KonoSuba", "Spy x Family", "Nichijou"],
  },
  mystery_medium: {
    title: "Você Quer Ser Desafiado",
    emoji: "🕵️",
    description: "Histórias que te fazem pensar, com reviravoltas e atmosfera tensa.",
    genres: ["Mystery", "Psychological", "Thriller"],
    formats: ["TV"],
    highlights: ["Death Note", "Steins;Gate", "Monster"],
  },
  movie: {
    title: "Noite de Filme!",
    emoji: "🎬",
    description: "Uma experiência cinematográfica completa, sem compromisso de série.",
    genres: ["Drama", "Romance", "Fantasy"],
    formats: ["MOVIE"],
    highlights: ["Your Name", "Spirited Away", "A Silent Voice"],
  },
  beginner: {
    title: "Bem-vindo ao Universo Anime!",
    emoji: "🌟",
    description: "Vamos começar com os melhores títulos para quem está começando agora.",
    genres: ["Action", "Adventure"],
    formats: ["TV"],
    highlights: ["Fullmetal Alchemist: Brotherhood", "Death Note", "Demon Slayer"],
  },
  default: {
    title: "Animes para Você!",
    emoji: "🎌",
    description: "Selecionamos os melhores animes baseado nas suas preferências.",
    genres: ["Action", "Drama"],
    formats: ["TV"],
    highlights: ["Demon Slayer", "Attack on Titan", "Death Note"],
  },
};

export function getQuizResult(answers: Record<string, string>): QuizResult {
  const { mood, time, experience } = answers;
  const key = `${mood}_${time}`;
  if (experience === "beginner") return QUIZ_RESULTS.beginner;
  if (time === "movie") return QUIZ_RESULTS.movie;
  return QUIZ_RESULTS[key] ?? QUIZ_RESULTS.default;
}
