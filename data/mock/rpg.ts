export interface RpgClass {
  id: string;
  label: string;
  emoji: string;
  description: string;
  primaryAttribute: string;
  attributes: Record<string, number>;
  style: string[];
}

export interface RpgElement {
  id: string;
  label: string;
  emoji: string;
  description: string;
}

export interface RpgScene {
  id: string;
  title: string;
  narrative: string;
  actionPrompt: string;
  atmosphere: string;
  primaryAttribute: string;
}

export interface RpgMissionData {
  id: string;
  slug: string;
  title: string;
  theme: string;
  themeEmoji: string;
  difficulty: number;
  estimatedMinutes: number;
  description: string;
  objective: string;
  scenes: RpgScene[];
  xpReward: number;
  badgeKey?: string;
  badgeName?: string;
  rewardsJson: string;
}

export interface AwakeningPath {
  id: string;
  label: string;
  emoji: string;
  description: string;
  attrBonuses: Partial<Record<string, number>>;
}

export const RPG_CLASSES: RpgClass[] = [
  { id: "espadachim", label: "Espadachim", emoji: "⚔️", description: "Mestre em combate corpo-a-corpo. Vive pela honra e pelo fio da lâmina.", primaryAttribute: "courage", style: ["combatente"], attributes: { courage: 9, defense: 8, technique: 7, energy: 6, strategy: 4, empathy: 3, luck: 4, charisma: 3 } },
  { id: "estrategista", label: "Estrategista", emoji: "♟️", description: "Vê o campo de batalha como xadrez. Cada peça tem seu propósito.", primaryAttribute: "strategy", style: ["intelectual"], attributes: { strategy: 10, technique: 7, luck: 5, charisma: 6, defense: 4, empathy: 4, courage: 3, energy: 3 } },
  { id: "curandeiro", label: "Curandeiro", emoji: "💚", description: "A força que mantém a party em pé. Seu poder é a vida dos outros.", primaryAttribute: "empathy", style: ["suporte"], attributes: { empathy: 10, defense: 7, charisma: 6, technique: 5, energy: 4, strategy: 4, courage: 3, luck: 3 } },
  { id: "invocador", label: "Invocador", emoji: "🌀", description: "Tece contratos com entidades de outros planos. Poder com custo.", primaryAttribute: "energy", style: ["magico", "suporte"], attributes: { energy: 10, charisma: 8, technique: 6, empathy: 5, strategy: 4, luck: 4, defense: 3, courage: 2 } },
  { id: "exorcista", label: "Exorcista", emoji: "🔥", description: "Caçador de espíritos mal-intencionados. Opera entre o mundo dos vivos e dos mortos.", primaryAttribute: "courage", style: ["furtivo", "combatente"], attributes: { courage: 8, technique: 8, energy: 7, defense: 5, strategy: 5, empathy: 4, luck: 3, charisma: 2 } },
  { id: "ninja_urbano", label: "Ninja Urbano", emoji: "🌑", description: "Fantasma nas ruas modernas. Informação é sua arma principal.", primaryAttribute: "technique", style: ["furtivo"], attributes: { technique: 10, luck: 8, energy: 6, strategy: 6, courage: 4, defense: 3, empathy: 3, charisma: 2 } },
  { id: "alquimista", label: "Alquimista", emoji: "⚗️", description: "Transforma o mundo através da ciência e da magia. Improvisa soluções impossíveis.", primaryAttribute: "strategy", style: ["intelectual", "magico"], attributes: { strategy: 9, technique: 8, energy: 6, luck: 6, defense: 4, empathy: 4, courage: 3, charisma: 2 } },
  { id: "guardiao", label: "Guardião", emoji: "🛡️", description: "O muro que protege todos os outros. Sua existência é um ato de amor.", primaryAttribute: "defense", style: ["suporte", "combatente"], attributes: { defense: 10, empathy: 8, courage: 7, charisma: 5, technique: 4, energy: 3, strategy: 3, luck: 2 } },
  { id: "atirador", label: "Atirador", emoji: "🏹", description: "Precisão acima de tudo. Atinge alvos que ninguém mais vê.", primaryAttribute: "technique", style: ["furtivo"], attributes: { technique: 10, luck: 7, energy: 7, strategy: 6, courage: 4, defense: 3, empathy: 3, charisma: 2 } },
  { id: "mago_elemental", label: "Mago Elemental", emoji: "✨", description: "Canaliza as forças primordiais da natureza. Poder imenso, controle difícil.", primaryAttribute: "energy", style: ["magico"], attributes: { energy: 11, technique: 7, strategy: 6, charisma: 5, luck: 4, defense: 3, empathy: 3, courage: 3 } },
  { id: "lutador", label: "Lutador", emoji: "👊", description: "Força bruta e instinto afiado. Não precisa de planos quando tem poder.", primaryAttribute: "courage", style: ["combatente"], attributes: { courage: 10, energy: 9, defense: 6, technique: 5, luck: 4, charisma: 4, strategy: 2, empathy: 2 } },
  { id: "oraculo", label: "Oráculo Narrativo", emoji: "📖", description: "Lê padrões invisíveis no mundo. Vê possibilidades onde outros veem caos.", primaryAttribute: "charisma", style: ["intelectual", "suporte"], attributes: { charisma: 10, empathy: 8, strategy: 7, luck: 6, technique: 4, defense: 3, energy: 2, courage: 2 } },
];

export const RPG_ELEMENTS: RpgElement[] = [
  { id: "fogo", label: "Fogo", emoji: "🔥", description: "Paixão, destruição e renovação. Queima tudo para recomeçar." },
  { id: "agua", label: "Água", emoji: "🌊", description: "Adaptável e profunda. Encontra caminho em qualquer obstáculo." },
  { id: "vento", label: "Vento", emoji: "💨", description: "Liberdade e velocidade. Impossível de capturar." },
  { id: "terra", label: "Terra", emoji: "🌍", description: "Solidez e paciência. Força que suporta tudo." },
  { id: "luz", label: "Luz", emoji: "☀️", description: "Verdade e cura. Ilumina o que estava escondido." },
  { id: "sombra", label: "Sombra", emoji: "🌑", description: "Medo e mistério. Poder que opera onde a luz não chega." },
  { id: "raio", label: "Raio", emoji: "⚡", description: "Velocidade e impacto. Age antes que o adversário perceba." },
  { id: "gelo", label: "Gelo", emoji: "❄️", description: "Frieza e precisão. Paralisa antes de golpear." },
  { id: "metal", label: "Metal", emoji: "⚙️", description: "Resistência e afiamento. Forjado na adversidade." },
  { id: "espirito", label: "Espírito", emoji: "👻", description: "Entre os mundos. Percebe o que nenhum ser físico consegue." },
  { id: "tempo", label: "Tempo", emoji: "⏳", description: "O elemento mais raro. Manipula instantes com precisão cirúrgica." },
  { id: "memoria", label: "Memória", emoji: "💭", description: "Acessa o passado como arma. O que foi vivido não pode ser desfeito." },
];

export const STYLE_OPTIONS = [
  { id: "combatente", label: "Combatente", emoji: "⚔️", description: "Prefiro ação direta. Resolvo problemas com força e técnica.", classes: ["espadachim", "lutador", "guardiao"] },
  { id: "intelectual", label: "Intelectual", emoji: "🧠", description: "Planejo antes de agir. Minha mente é minha arma principal.", classes: ["estrategista", "alquimista", "oraculo"] },
  { id: "suporte", label: "Suporte", emoji: "🌿", description: "Fico mais feliz quando meu time está seguro e forte.", classes: ["curandeiro", "guardiao", "invocador"] },
  { id: "furtivo", label: "Furtivo", emoji: "👁️", description: "Prefiro agir nas sombras. Eficiência sem confronto desnecessário.", classes: ["ninja_urbano", "atirador", "exorcista"] },
  { id: "magico", label: "Mágico", emoji: "✨", description: "Poder arcano me fascina. Vou além do que a física permite.", classes: ["mago_elemental", "invocador", "alquimista"] },
];

export const GUILD_BADGES = [
  { key: "primeiro_heroi", name: "Primeiro Herói", icon: "🌟", description: "Criou seu personagem RPG" },
  { key: "fundador_guilda", name: "Fundador de Guilda", icon: "🏰", description: "Criou uma party" },
  { key: "guardiao_amigos", name: "Guardião dos Amigos", icon: "🤝", description: "Fez seu primeiro amigo" },
  { key: "critico_20", name: "Crítico 20!", icon: "🎲", description: "Tirou 20 no dado em uma ação" },
  { key: "sobreviveu_portal", name: "Sobreviveu ao Portal", icon: "🌀", description: "Concluiu A Torre dos Ecos" },
  { key: "estrategista_guilda", name: "Estrategista da Guilda", icon: "♟️", description: "Concluiu 3 missões" },
  { key: "heroi_temporada", name: "Herói da Temporada", icon: "👑", description: "Concluiu 5 missões" },
  { key: "jogador_equipe", name: "Jogador de Equipe", icon: "🎭", description: "Jogou com 3 amigos em uma sessão" },
];

// ── SISTEMA DE NÍVEIS (100 níveis) ────────────────────────────────────────────

const TIER_TITLES: Array<{ minLevel: number; title: string }> = [
  { minLevel: 100, title: "Imortal" },
  { minLevel: 90, title: "Transcendido" },
  { minLevel: 80, title: "Lendário" },
  { minLevel: 70, title: "Guardião" },
  { minLevel: 60, title: "Campeão" },
  { minLevel: 50, title: "Mestre" },
  { minLevel: 40, title: "Veterano" },
  { minLevel: 30, title: "Guerreiro" },
  { minLevel: 20, title: "Iniciado" },
  { minLevel: 10, title: "Aventureiro" },
  { minLevel: 1, title: "Recruta" },
];

export function getLevelTitle(level: number): string {
  for (const tier of TIER_TITLES) {
    if (level >= tier.minLevel) return tier.title;
  }
  return "Recruta";
}

export function xpForLevel(n: number): number {
  if (n <= 1) return 0;
  return Math.round((n - 1) * n / 2 * 100);
}

export function getLevelFromXp(xp: number): {
  level: number; label: string; currentXp: number; nextXp: number; progress: number;
} {
  let level = 1;
  for (let n = 100; n >= 1; n--) {
    if (xp >= xpForLevel(n)) { level = n; break; }
  }
  const currentLevelXp = xpForLevel(level);
  const nextLevelXp = level >= 100 ? xpForLevel(100) + 50000 : xpForLevel(level + 1);
  const range = nextLevelXp - currentLevelXp;
  const progress = level >= 100 ? 100 : Math.min(100, Math.round(((xp - currentLevelXp) / range) * 100));
  return { level, label: getLevelTitle(level), currentXp: currentLevelXp, nextXp: nextLevelXp, progress };
}

// Legacy compat — some callers used XP_LEVELS array
export const XP_LEVELS = Array.from({ length: 100 }, (_, i) => {
  const n = i + 1;
  return { level: n, min: xpForLevel(n), max: n < 100 ? xpForLevel(n + 1) - 1 : Infinity, label: getLevelTitle(n) };
});

// ── TIERS VISUAIS ─────────────────────────────────────────────────────────────

export type VisualTier =
  | "recruta" | "aventureiro" | "iniciado" | "guerreiro" | "veterano"
  | "mestre" | "campeao" | "guardiao" | "lendario" | "transcendido" | "imortal";

export interface TierStyle {
  tier: VisualTier;
  borderColor: string;
  bgColor: string;
  textColor: string;
  shadowColor: string;
  glowClass: string;
  badgeEmoji: string;
  tierLabel: string;
}

export function getVisualTier(level: number): TierStyle {
  if (level >= 100) return { tier: "imortal", borderColor: "border-yellow-400", bgColor: "bg-yellow-900/30", textColor: "text-yellow-300", shadowColor: "shadow-yellow-500/40", glowClass: "shadow-lg", badgeEmoji: "👑", tierLabel: "Imortal" };
  if (level >= 90) return { tier: "transcendido", borderColor: "border-red-400", bgColor: "bg-red-900/20", textColor: "text-red-300", shadowColor: "shadow-red-500/30", glowClass: "shadow-md", badgeEmoji: "🌌", tierLabel: "Transcendido" };
  if (level >= 80) return { tier: "lendario", borderColor: "border-rose-400", bgColor: "bg-rose-900/20", textColor: "text-rose-300", shadowColor: "shadow-rose-500/25", glowClass: "shadow-md", badgeEmoji: "🏆", tierLabel: "Lendário" };
  if (level >= 70) return { tier: "guardiao", borderColor: "border-orange-400", bgColor: "bg-orange-900/20", textColor: "text-orange-300", shadowColor: "shadow-orange-500/20", glowClass: "shadow-sm", badgeEmoji: "🔱", tierLabel: "Guardião" };
  if (level >= 60) return { tier: "campeao", borderColor: "border-amber-400", bgColor: "bg-amber-900/20", textColor: "text-amber-300", shadowColor: "shadow-amber-500/20", glowClass: "shadow-sm", badgeEmoji: "🌟", tierLabel: "Campeão" };
  if (level >= 50) return { tier: "mestre", borderColor: "border-purple-400", bgColor: "bg-purple-900/20", textColor: "text-purple-300", shadowColor: "shadow-purple-500/20", glowClass: "shadow-sm", badgeEmoji: "💜", tierLabel: "Mestre" };
  if (level >= 40) return { tier: "veterano", borderColor: "border-violet-400", bgColor: "bg-violet-900/20", textColor: "text-violet-300", shadowColor: "shadow-violet-500/15", glowClass: "", badgeEmoji: "⚡", tierLabel: "Veterano" };
  if (level >= 30) return { tier: "guerreiro", borderColor: "border-cyan-500", bgColor: "bg-cyan-900/15", textColor: "text-cyan-300", shadowColor: "", glowClass: "", badgeEmoji: "⚔️", tierLabel: "Guerreiro" };
  if (level >= 20) return { tier: "iniciado", borderColor: "border-blue-500", bgColor: "bg-blue-900/15", textColor: "text-blue-300", shadowColor: "", glowClass: "", badgeEmoji: "🔵", tierLabel: "Iniciado" };
  if (level >= 10) return { tier: "aventureiro", borderColor: "border-emerald-500", bgColor: "bg-emerald-900/15", textColor: "text-emerald-300", shadowColor: "", glowClass: "", badgeEmoji: "🌿", tierLabel: "Aventureiro" };
  return { tier: "recruta", borderColor: "border-slate-600", bgColor: "bg-slate-800", textColor: "text-slate-400", shadowColor: "", glowClass: "", badgeEmoji: "🗡️", tierLabel: "Recruta" };
}

// ── DESPERTAR (AWAKENING) ─────────────────────────────────────────────────────

export const AWAKENING_PATHS: Record<string, [AwakeningPath, AwakeningPath]> = {
  espadachim: [
    { id: "ronin", label: "Ronin Eterno", emoji: "🌑", description: "Abraça o caminho solitário. Velocidade e letalidade máximas.", attrBonuses: { courage: 3, technique: 2 } },
    { id: "cavaleiro_sagrado", label: "Cavaleiro Sagrado", emoji: "🛡️", description: "Jura proteger os aliados acima da própria vida.", attrBonuses: { defense: 3, empathy: 2, courage: 1 } },
  ],
  estrategista: [
    { id: "arquiteto_sombra", label: "Arquiteto das Sombras", emoji: "🕸️", description: "Manipula eventos muito antes que aconteçam. Invisível.", attrBonuses: { strategy: 4, luck: 2 } },
    { id: "comandante", label: "Comandante de Campo", emoji: "🏴", description: "Amplifica a eficiência de toda a party em batalha.", attrBonuses: { strategy: 2, charisma: 3, technique: 1 } },
  ],
  curandeiro: [
    { id: "medico_guerra", label: "Médico de Guerra", emoji: "🩺", description: "Cura rápida em condições caóticas. Ninguém cai com ele.", attrBonuses: { empathy: 3, technique: 3 } },
    { id: "arquiteto_vida", label: "Arquiteto da Vida", emoji: "🌿", description: "Auras de cura passiva que beneficiam todos ao redor.", attrBonuses: { empathy: 4, energy: 2 } },
  ],
  invocador: [
    { id: "mestre_contratos", label: "Mestre dos Contratos", emoji: "📜", description: "Invoca entidades mais poderosas com maior controle.", attrBonuses: { energy: 3, charisma: 3 } },
    { id: "guardiao_portal", label: "Guardião dos Portais", emoji: "🌀", description: "Abre portais dimensionais para apoio tático da party.", attrBonuses: { energy: 2, technique: 2, defense: 2 } },
  ],
  exorcista: [
    { id: "cacador_spectros", label: "Caçador de Spectros", emoji: "👁️", description: "Detecta e erradica entidades antes que causem dano.", attrBonuses: { technique: 3, courage: 2, luck: 1 } },
    { id: "ponte_mundos", label: "Ponte entre Mundos", emoji: "🌉", description: "Negocia com entidades ao invés de destruí-las.", attrBonuses: { empathy: 3, charisma: 3 } },
  ],
  ninja_urbano: [
    { id: "fantasma_digital", label: "Fantasma Digital", emoji: "💻", description: "Invisível em redes digitais e físicas. Zero rastros.", attrBonuses: { technique: 4, luck: 2 } },
    { id: "assassino_silencioso", label: "Assassino Silencioso", emoji: "🗡️", description: "Strike letal de um único golpe antes de ser detectado.", attrBonuses: { technique: 2, courage: 2, luck: 2 } },
  ],
  alquimista: [
    { id: "transmutador", label: "Transmutador Supremo", emoji: "⚗️", description: "Transforma qualquer material em arma ou ferramenta.", attrBonuses: { strategy: 3, technique: 3 } },
    { id: "construtor_runas", label: "Construtor de Runas", emoji: "🔮", description: "Grava runas permanentes que persistem pelo mapa.", attrBonuses: { energy: 3, strategy: 2, luck: 1 } },
  ],
  guardiao: [
    { id: "bastiao", label: "Bastião Inabalável", emoji: "🏰", description: "Absorve dano que destruiria aliados. Imovível.", attrBonuses: { defense: 4, courage: 2 } },
    { id: "sentinel", label: "Sentinela Sagrada", emoji: "⚡", description: "Proteção ativa — reflete parte do dano recebido.", attrBonuses: { defense: 2, energy: 2, technique: 2 } },
  ],
  atirador: [
    { id: "franco_atirador", label: "Franco-Atirador Supremo", emoji: "🎯", description: "Elimina alvos prioritários com um único tiro certeiro.", attrBonuses: { technique: 4, luck: 2 } },
    { id: "artilheiro_area", label: "Artilheiro de Área", emoji: "💥", description: "Supressão total — cobre toda a área inimiga.", attrBonuses: { technique: 2, energy: 3, courage: 1 } },
  ],
  mago_elemental: [
    { id: "arconte", label: "Arconte Elemental", emoji: "🌪️", description: "Domina até 3 elementos simultaneamente.", attrBonuses: { energy: 4, technique: 2 } },
    { id: "feiticeiro_caos", label: "Feiticeiro do Caos", emoji: "🌀", description: "Magias imprevisíveis que confundem e paralisam inimigos.", attrBonuses: { energy: 3, luck: 3 } },
  ],
  lutador: [
    { id: "berserker", label: "Berserker Lendário", emoji: "🔥", description: "Quanto mais machucado, mais devastador fica.", attrBonuses: { courage: 4, energy: 2 } },
    { id: "mestre_marcial", label: "Mestre das Artes Marciais", emoji: "🥋", description: "Cada golpe é uma obra de arte técnica perfeita.", attrBonuses: { technique: 3, courage: 2, strategy: 1 } },
  ],
  oraculo: [
    { id: "profeta", label: "Profeta dos Fins", emoji: "🔮", description: "Vê possibilidades de vitória que outros não enxergam.", attrBonuses: { charisma: 3, luck: 3 } },
    { id: "narrador_destino", label: "Narrador do Destino", emoji: "📖", description: "Reescreve resultados negativos uma vez por sessão.", attrBonuses: { charisma: 4, strategy: 2 } },
  ],
};

export function getAwakeningOptions(classType: string): [AwakeningPath, AwakeningPath] | null {
  return AWAKENING_PATHS[classType] ?? null;
}

export function getAwakeningById(classType: string, awakeningId: string): AwakeningPath | null {
  const paths = AWAKENING_PATHS[classType];
  if (!paths) return null;
  return paths.find(p => p.id === awakeningId) ?? null;
}

// ── MISSÕES ───────────────────────────────────────────────────────────────────

export const MISSIONS_DATA: RpgMissionData[] = [
  {
    id: "torre-ecos",
    slug: "a-torre-dos-ecos",
    title: "A Torre dos Ecos",
    theme: "fantasia · mistério",
    themeEmoji: "🗼",
    difficulty: 1,
    estimatedMinutes: 20,
    description: "Uma torre de pedra antiga surgiu do nada no centro da floresta. Dizem que ela ecoa os maiores medos de quem entra — e recompensa aqueles que conseguem chegar ao topo.",
    objective: "Escalar os 3 andares da Torre dos Ecos e derrotar o Guardião no cume.",
    xpReward: 100,
    badgeKey: "sobreviveu_portal",
    badgeName: "Sobreviveu ao Portal",
    scenes: [
      {
        id: "portao",
        title: "O Portão da Torre",
        atmosphere: "🌙 Noite fria. Runas brilham em roxo no portão.",
        narrative: "Diante de vocês, a Torre dos Ecos se ergue contra o céu estrelado. O portão está selado por runas mágicas que pulsam como um coração. Um Guardião Espiritual — uma armadura vazia animada por energia arcana — flutua na entrada, seu elmo vazio focado em vocês.\n\n\"Apenas aqueles com propósito verdadeiro passam\", ele ressoa sem boca.",
        actionPrompt: "Como vocês convencem ou vencem o Guardião para entrar na torre?",
        primaryAttribute: "strategy",
      },
      {
        id: "corredor",
        title: "O Corredor das Ilusões",
        atmosphere: "😨 Espelhos distorcidos em cada parede. Suas imagens mostram versões alternativas.",
        narrative: "O segundo andar é um corredor longo de espelhos. Mas o reflexo não mostra quem vocês são — mostra quem vocês temem se tornar. Guerreiros sem honra. Estrategistas que traíram aliados. Curandeiros que chegaram tarde demais.\n\nUma voz ecoa: \"Somente quem conhece seus fantasmas pode passar.\"",
        actionPrompt: "O que cada um faz ao encarar seu reflexo perturbador? Como vocês avançam?",
        primaryAttribute: "empathy",
      },
      {
        id: "cume",
        title: "O Guardião dos Ecos",
        atmosphere: "⚡ Trovões internos. O ser de luz e eco aguarda.",
        narrative: "No cume, um ser feito de luz fragmentada — o Guardião dos Ecos — aguarda em silêncio. Ele não ataca primeiro. Mas quando age, copia cada movimento da party com perfeição absoluta.\n\nAtacar com força? Ele devolve com força dobrada. Usar estratégia? Ele já previu.\n\n\"Para vencer o eco, pare de criar um\", a torre sussurra.",
        actionPrompt: "Como vocês derrotam um inimigo que imita tudo que fazem?",
        primaryAttribute: "courage",
      },
    ],
    rewardsJson: '{"xp": 100, "badge": "sobreviveu_portal"}',
  },
  {
    id: "cidade-neon",
    slug: "a-cidade-neon-dos-exorcistas",
    title: "A Cidade Neon dos Exorcistas",
    theme: "cyberpunk · sobrenatural",
    themeEmoji: "🏙️",
    difficulty: 2,
    estimatedMinutes: 30,
    description: "No Distrito 7, espíritos fragmentados derivam entre os transeuntes sem que ninguém perceba. Mas vocês percebem. E algo no coração digital da cidade está se alimentando deles.",
    objective: "Infiltrar o mercado clandestino de contratos espirituais e desativar o Terminal Espiritual ilegal.",
    xpReward: 130,
    scenes: [
      {
        id: "ruas",
        title: "Ruas do Distrito 7",
        atmosphere: "🔴 Neon vermelho. Chuva ácida. Espíritos invisíveis cruzando calçadas.",
        narrative: "O Distrito 7 às 23h é uma mistura de tecnologia e sobrenatural mal-contida. Drones de segurança monitoram as ruas. Espíritos fragmentados — invisíveis para mortais comuns — colidem com pedestres sem saber.\n\nUm exorcista local os aborda: \"Não conheço suas faces. Mostrem autorização espiritual ou sumam do meu distrito — antes que eu faça vocês sumirem.\"",
        actionPrompt: "Como vocês lidam com o exorcista local e navegam pelo distrito hostil?",
        primaryAttribute: "charisma",
      },
      {
        id: "mercado",
        title: "O Mercado das Almas",
        atmosphere: "🌫️ Vapores coloridos. Barracas com artefatos pulsantes. Sussurros por toda parte.",
        narrative: "Sob um viaduto de neon laranja, o mercado clandestino funciona sem disfarce — porque quem vê não pode reportar o que não deveria ver. Contratos espirituais são comprados e vendidos. Uma figura encapuzada oferece algo mais perturbador: fragmentos de memória extraídos de seres espirituais vivos.\n\nIsso alimenta o Terminal. Isso precisa parar.",
        actionPrompt: "Como vocês investigam o mercado e localizam a fonte dos contratos sem alertar os vendedores?",
        primaryAttribute: "strategy",
      },
      {
        id: "terminal",
        title: "Terminal Espiritual",
        atmosphere: "💀 Servidor gigante. Almas digitalizadas pulsando nas telas. Contagem regressiva.",
        narrative: "O Terminal Espiritual fica no subsolo do distrito — um servidor que digitaliza almas fragmentadas e as converte em energia para alimentar o grid de neon. Proteção tripla: física, digital e espiritual.\n\nSe destruído sem controle, a onda de espíritos libertos apaga o Distrito 7 inteiro. Precisam desativar com cirurgia.",
        actionPrompt: "Como vocês desativam o Terminal sem destruir o distrito?",
        primaryAttribute: "technique",
      },
    ],
    rewardsJson: '{"xp": 130}',
  },
  {
    id: "torneio-mascaras",
    slug: "o-torneio-das-sete-mascaras",
    title: "O Torneio das Sete Máscaras",
    theme: "shounen · torneio",
    themeEmoji: "🎭",
    difficulty: 2,
    estimatedMinutes: 25,
    description: "O Torneio das Sete Máscaras acontece uma vez por geração. Cada máscara representa uma escola de combate diferente. Apenas uma party sobrevive até o fim.",
    objective: "Vencer as três fases do torneio e enfrentar o Portador da Sétima Máscara.",
    xpReward: 120,
    scenes: [
      {
        id: "qualificacao",
        title: "Arena da Qualificação",
        atmosphere: "🌅 Amanhecer na arena. Mil olhos assistindo. Dez parties competindo.",
        narrative: "A qualificação é simples na teoria: cada party enfrenta um desafio de sua escolha — força, agilidade, estratégia ou astúcia. O público decide quem avança baseado em estilo, não em resultado.\n\nO organizador se aproxima: \"Vocês têm cinco minutos para escolher seu desafio. Escolham com sabedoria — seu estilo revela quem vocês são.\"",
        actionPrompt: "Que tipo de desafio vocês escolhem e como se apresentam ao público?",
        primaryAttribute: "charisma",
      },
      {
        id: "semifinal",
        title: "As Semifinais — O Espelho",
        atmosphere: "⚔️ Arena vazia. Apenas vocês e os adversários. Silêncio total antes do combate.",
        narrative: "Na semifinal, enfrentam A Party do Espelho — cinco combatentes que estudaram cada movimento de vocês durante a qualificação e prepararam contra-ataques perfeitos para cada estratégia óbvia.\n\nEles sabem o que vocês vão fazer antes de vocês decidirem.",
        actionPrompt: "Como vocês vencem adversários que se prepararam especificamente para suas táticas?",
        primaryAttribute: "strategy",
      },
      {
        id: "final",
        title: "O Portador da Sétima Máscara",
        atmosphere: "👁️ A arena escurece. Uma única máscara dourada brilha no centro.",
        narrative: "O Portador da Sétima Máscara não luta com técnica. Luta com propósito. Cada golpe tem uma história por trás. Cada defesa protege algo que ele valoriza.\n\n\"Mostrem-me o que defendem\", ele diz removendo a máscara para revelar... um rosto diferente para cada um de vocês.",
        actionPrompt: "O que cada personagem luta para proteger? Como isso se manifesta no combate final?",
        primaryAttribute: "courage",
      },
    ],
    rewardsJson: '{"xp": 120}',
  },
  {
    id: "vila-sol",
    slug: "a-vila-que-esqueceu-o-sol",
    title: "A Vila que Esqueceu o Sol",
    theme: "drama · fantasia",
    themeEmoji: "🌅",
    difficulty: 1,
    estimatedMinutes: 20,
    description: "A Vila do Crepúsculo não vê o sol há 40 anos. Seus habitantes já não sabem por que. Alguém escolheu esquecer — e esse esquecimento precisa ser desfeito antes que a vila desapareça.",
    objective: "Descobrir a origem da maldição e despertar a memória coletiva da vila.",
    xpReward: 100,
    scenes: [
      {
        id: "chegada",
        title: "A Vila no Eterno Entardecer",
        atmosphere: "🌫️ Céu sempre laranja. Nenhuma sombra. Nenhuma criança brincando.",
        narrative: "A vila de Miriath existe em eterno entardecer. Os moradores se movem como autômatos — funcionais, mas sem alegria. Uma velha sentada na praça os enxerga com olhos curiosamente lúcidos:\n\n\"Visitantes que enxergam. Faz tempo. O último que enxergou disse que ia trazer o sol de volta.\" Ela sorri. \"Isso foi há 40 anos.\"",
        actionPrompt: "Como vocês iniciam a investigação sobre o que aconteceu com a vila?",
        primaryAttribute: "empathy",
      },
      {
        id: "memoria",
        title: "A Câmara da Memória Perdida",
        atmosphere: "📦 Arquivo subterrâneo. Caixas com nomes. Cada uma contém uma memória roubada.",
        narrative: "Sob a prefeitura, descobrem uma câmara de memórias. Cada caixa tem um nome — cada morador da vila que 'esqueceu' algo tem uma caixa aqui. No centro, uma grande caixa sem nome pulsa com intensidade.\n\nA Memória Coletiva. O Sol. Alguém a guardou aqui intencionalmente.",
        actionPrompt: "Como vocês acessam a memória central e descobrem quem a guardou — e por quê?",
        primaryAttribute: "strategy",
      },
      {
        id: "despertar",
        title: "O Despertar",
        atmosphere: "✨ A câmara vibra. Lá fora, moradores param o que fazem e olham para cima.",
        narrative: "A memória mostra tudo: 40 anos atrás, a própria vila escolheu esquecer o sol após uma tragédia coletiva devastadora. A Memória Coletiva foi guardada por alguém que amava demais para deixar o dolor durar eternamente — esperando por viajantes suficientemente presentes para devolvê-la.\n\nAgora é com vocês.",
        actionPrompt: "Como vocês devolvem a memória coletiva à vila de forma que ela possa carregar o peso do passado?",
        primaryAttribute: "empathy",
      },
    ],
    rewardsJson: '{"xp": 100}',
  },
  {
    id: "portal-escola",
    slug: "o-portal-da-escola-dimensional",
    title: "O Portal da Escola Dimensional",
    theme: "escola mágica · isekai",
    themeEmoji: "🏫",
    difficulty: 3,
    estimatedMinutes: 30,
    description: "A Academia dos Portais Dimensionais está em colapso. Um estudante abriu uma brecha proibida, e agora realidades paralelas estão colapsando umas sobre as outras.",
    objective: "Navegar a academia em colapso dimensional e fechar a brecha antes que a realidade colapse.",
    xpReward: 150,
    scenes: [
      {
        id: "academia",
        title: "A Academia Dobrada",
        atmosphere: "🌀 Corredores que levam a salas impossíveis. Gravidade opcional. Estudantes em pânico.",
        narrative: "A Academia dos Portais Dimensionais normalmente tem 4 andares. Hoje tem 47 — e nenhum faz sentido geográfico. Estudantes correm sem saber para onde. Professores tentam manter ordem em salas que mudam de dimensão a cada minuto.\n\nO diretor os encontra: \"Não sei como vocês chegaram aqui, mas precisam chegar ao Laboratório 7-Ômega. Onde quer que ele esteja hoje.\"",
        actionPrompt: "Como vocês navegam por uma escola com física impossível para achar o laboratório?",
        primaryAttribute: "luck",
      },
      {
        id: "exame",
        title: "O Exame Proibido",
        atmosphere: "📚 Sala de exame suspensa no vácuo entre dimensões. Tempo correndo diferente.",
        narrative: "Para passar pela Sala Proibida que protege o acesso ao laboratório, precisam completar o Exame das Dimensões — um teste que avalia se são dignos de conhecer o que existe além da realidade atual.\n\nAs questões não têm resposta certa. Têm respostas autênticas.",
        actionPrompt: "Cada um responde uma questão que revela seus valores mais profundos. O que vocês respondem?",
        primaryAttribute: "charisma",
      },
      {
        id: "brecha",
        title: "A Brecha Dimensional",
        atmosphere: "💥 O laboratório colapsa entre realidades. O estudante culpado chora no centro.",
        narrative: "No centro do colapso, o estudante Kai — 16 anos, olhos vermelhos de choro — segurava um livro proibido. Ele abriu a brecha tentando alcançar uma realidade onde seu irmão ainda existia.\n\nA brecha cresce. Em 10 minutos, engole a academia e depois a cidade.",
        actionPrompt: "Como vocês fecham a brecha sem destruir a esperança de Kai?",
        primaryAttribute: "empathy",
      },
    ],
    rewardsJson: '{"xp": 150}',
  },
];

// ── FUNÇÕES UTILITÁRIAS ───────────────────────────────────────────────────────

export function rollD20(): number {
  return Math.floor(Math.random() * 20) + 1;
}

export function getAttributeBonus(value: number): number {
  return Math.floor((value - 5) / 2);
}

export type ResultType = "FAILURE" | "PARTIAL" | "SUCCESS" | "CRITICAL";

export function getResultType(total: number): ResultType {
  if (total <= 5) return "FAILURE";
  if (total <= 10) return "PARTIAL";
  if (total <= 17) return "SUCCESS";
  return "CRITICAL";
}

export const RESULT_LABELS: Record<ResultType, { label: string; color: string; emoji: string }> = {
  FAILURE: { label: "Falha", color: "text-red-400", emoji: "💀" },
  PARTIAL: { label: "Sucesso Parcial", color: "text-amber-400", emoji: "⚠️" },
  SUCCESS: { label: "Sucesso", color: "text-emerald-400", emoji: "✅" },
  CRITICAL: { label: "Crítico!", color: "text-violet-400", emoji: "🌟" },
};

export function getClassById(id: string) {
  return RPG_CLASSES.find(c => c.id === id);
}

export function getElementById(id: string) {
  return RPG_ELEMENTS.find(e => e.id === id);
}

export function suggestClassesForStyle(styleId: string): RpgClass[] {
  return RPG_CLASSES.filter(c => c.style.includes(styleId));
}

export function getAttributeWithLevel(baseValue: number, level: number, isPrimary: boolean): number {
  return baseValue + Math.floor(level / (isPrimary ? 5 : 10));
}
