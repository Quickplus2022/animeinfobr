export type Archetype = "coracao" | "mente" | "forca" | "espirito" | "conexao";

export interface AnimeDNA {
  action: number; romance: number; mystery: number; comedy: number;
  fantasy: number; drama: number; psychological: number; adventure: number;
  sliceOfLife: number; sciFi: number;
}

export interface AnimeCharacter {
  id: string;
  name: string;
  anime: string;
  archetype: Archetype;
  archetypeLabel: string;
  age: string;
  ability: string;
  traits: string[];
  quote: string;
  description: string;
  fameLevel: "iconic" | "known" | "obscure";
  image: string;
  similarTo: string[];
}

export const CHARACTERS: AnimeCharacter[] = [
  // ── CORAÇÃO ──
  { id: "naruto", name: "Naruto Uzumaki", anime: "Naruto / Shippuden", archetype: "coracao", archetypeLabel: "O Herói Inabalável", age: "17 anos", ability: "Modo Sábio + Modo Kyuubi — poder colosseiro criado pela vontade pura", traits: ["Determinado", "Leal", "Emotivo", "Nunca desiste", "Inspira todos"], quote: "Eu nunca vou voltar atrás! Esse é meu caminho ninja!", description: "Cresceu sozinho, rejeitado por todos. Sua força não vem de talento, mas da recusa absoluta de desistir.", fameLevel: "iconic", image: "🍥", similarTo: ["Luffy (One Piece)", "Deku (MHA)"] },
  { id: "tanjiro", name: "Tanjiro Kamado", anime: "Demon Slayer", archetype: "coracao", archetypeLabel: "O Guerreiro de Coração Gentil", age: "15 anos", ability: "Respiração da Água + Dança do Fogo — técnicas aperfeiçoadas pela empatia", traits: ["Gentileza extrema", "Disciplina feroz", "Amor pela família", "Chora na batalha", "Resolve tudo com esforço"], quote: "Não importa quantas vezes eu caia, vou me levantar e continuar.", description: "Um dos raros heróis que chora diante dos inimigos e ainda assim os derrota. Gentileza e força como sinônimos.", fameLevel: "iconic", image: "🌊", similarTo: ["Naruto", "Gon (HxH)"] },
  { id: "hinata", name: "Hinata Shoyo", anime: "Haikyuu!!", archetype: "coracao", archetypeLabel: "O Menor Que Alcança o Topo", age: "16 anos", ability: "Velocidade explosiva e pulos absurdos para alguém de baixa estatura", traits: ["Energia pura", "Supera limites físicos", "Inspira pelo exemplo", "Otimismo inabalável", "Faz os outros acreditarem"], quote: "Eu posso sempre saltar!", description: "Sem talento natural óbvio. Compensa com trabalho, vontade e uma alegria que contagia todo o time.", fameLevel: "known", image: "🏐", similarTo: ["Naruto", "Deku (MHA)"] },
  { id: "simon", name: "Simon", anime: "Gurren Lagann", archetype: "coracao", archetypeLabel: "O Que Perfura o Impossível", age: "14 → 21 anos", ability: "Core Drill — perfura realidade com força de vontade pura", traits: ["Humilde no início", "Transição épica", "Amor como força", "Supera o mestre", "Escala infinita"], quote: "Quem você acha que eu sou? Eu sou Simon — eu perfuro o impossível!", description: "O personagem com o arco de crescimento mais épico da história do anime. Começa como o garoto mais medroso, termina como o ser que perfurou o espaço-tempo.", fameLevel: "obscure", image: "🌀", similarTo: ["Naruto", "Deku"] },

  // ── MENTE ──
  { id: "light", name: "Light Yagami", anime: "Death Note", archetype: "mente", archetypeLabel: "O Gênio Que Se Perdeu", age: "17 → 23 anos", ability: "Death Note + mente que pensa 14 movimentos à frente", traits: ["Genial", "Vaidoso", "Manipulador", "Idealista corrompido", "Perigoso"], quote: "Sou Kira. Sou o deus do novo mundo.", description: "Queria um mundo melhor. Ficou tão fascinado com o poder que se tornou o que queria destruir.", fameLevel: "iconic", image: "📓", similarTo: ["Lelouch (Code Geass)", "Ayanokoji"] },
  { id: "lelouch", name: "Lelouch vi Britannia", anime: "Code Geass", archetype: "mente", archetypeLabel: "O Estrategista Sacrificial", age: "17 anos", ability: "Geass — força qualquer pessoa a obedecer uma ordem absoluta", traits: ["Estratégico", "Carismático", "Sacrificial", "Orgulhoso", "Amor escondido"], quote: "Eu destruirei o mundo e o reconstruirei.", description: "Usa xadrez com vidas humanas, mas carrega o peso de cada peça. O vilão mais nobre e o herói mais trágico.", fameLevel: "known", image: "♟️", similarTo: ["Light Yagami", "L"] },
  { id: "ayanokoji", name: "Ayanokoji Kiyotaka", anime: "Classroom of the Elite", archetype: "mente", archetypeLabel: "O Gênio Invisível", age: "16 anos", ability: "Inteligência oculta absoluta — parece mediano por escolha própria", traits: ["Calculista", "Inexpressivo", "Manipulação silenciosa", "Observador total", "Sem ego aparente"], quote: "Não existe ato completamente altruísta. Tudo tem uma motivação.", description: "Não quer ser o número um. Quer ser o jogador invisível que move todos os outros sem que percebam.", fameLevel: "obscure", image: "🎯", similarTo: ["Light Yagami", "Shikamaru"] },
  { id: "gojo", name: "Gojo Satoru", anime: "Jujutsu Kaisen", archetype: "mente", archetypeLabel: "O Gênio Que Sabe Que É Gênio", age: "28 anos", ability: "Infinito + Domínio Ilimitado — literalmente o ser mais poderoso do universo mágico", traits: ["Confiança absoluta", "Humor constante", "Genialmente perigoso", "Protege os fracos", "Desafia sistemas"], quote: "Quer dizer que você é o mais forte? Ah, que difícil ser eu.", description: "Único personagem do gênero que sabe exatamente quão poderoso é e usa isso para proteger, não oprimir.", fameLevel: "iconic", image: "👁️", similarTo: ["Lelouch", "L"] },

  // ── FORÇA ──
  { id: "levi", name: "Levi Ackerman", anime: "Attack on Titan", archetype: "forca", archetypeLabel: "O Guerreiro Sem Igual", age: "30+ anos", ability: "Poder Ackerman — reflexos e força sobre-humanos + maestria de espadas duplas", traits: ["Frio", "Disciplinado", "Leal até a morte", "Carrega os mortos", "Curto e direto"], quote: "Não tenha arrependimentos. Qualquer escolha que você fizer, jure até o fim.", description: "Cresceu nas profundezas do submundo. Aprendeu que sobrevivência exige perfeição absoluta.", fameLevel: "iconic", image: "⚔️", similarTo: ["Killua (HxH)", "Itachi"] },
  { id: "killua", name: "Killua Zoldyck", anime: "Hunter x Hunter", archetype: "forca", archetypeLabel: "O Assassino Que Escolheu Ser Mais", age: "12 anos", ability: "Nen de Transmutação — converte energia vital em eletricidade pura", traits: ["Instinto assassino", "Leal ao amigo", "Autocrítico extremo", "Humor seco", "Evolução constante"], quote: "A velocidade que supera os reflexos não pode ser esquivada.", description: "Nasceu para matar. Escolheu sentir. Cada capítulo com Gon é alguém treinado para não ter sentimentos descobrindo o que é ter um amigo.", fameLevel: "known", image: "⚡", similarTo: ["Levi (AoT)", "Hiei (YYH)"] },
  { id: "eren", name: "Eren Yeager", anime: "Attack on Titan", archetype: "forca", archetypeLabel: "O Que Nunca Parou de Correr", age: "15 → 19 anos", ability: "Titã Fundador + Titã de Ataque — poder sobre todos os Titãs", traits: ["Intensidade extrema", "Liberdade acima de tudo", "Rupturas morais", "Evolução perturbadora", "Contradição viva"], quote: "Eu não paro de correr. Continuo avançando.", description: "O personagem mais divisivo da geração. Começa como herói arquetípico e termina como algo que você precisará de semanas para processar.", fameLevel: "iconic", image: "🔥", similarTo: ["Naruto (fase sombria)", "Simon"] },
  { id: "escanor", name: "Escanor", anime: "Seven Deadly Sins", archetype: "forca", archetypeLabel: "O Poderoso Que Carrega Solidão", age: "40 anos", ability: "Sunshine — ao meio-dia é literalmente o ser mais poderoso do mundo", traits: ["Humilde à noite", "Arrogante ao meio-dia", "Amor não correspondido", "Força que isola", "Tragicamente belo"], quote: "Quem decidiu que eu não posso ganhar? Sou eu quem decide isso.", description: "De dia: o ser mais poderoso do universo. À noite: um homem envergonhado que nunca se achou digno de amor.", fameLevel: "obscure", image: "☀️", similarTo: ["All Might (MHA)", "Roy Mustang"] },

  // ── ESPÍRITO ──
  { id: "senku", name: "Senku Ishigami", anime: "Dr. Stone", archetype: "espirito", archetypeLabel: "O Cientista Que Reconstrói o Mundo", age: "15 anos", ability: "Gênio científico com memória fotográfica de todo conhecimento humano", traits: ["Lógico", "Excêntrico", "Entusiasmado", "Ciência como magia", "Nunca para de planejar"], quote: "Dez bilhões por cento seguro!", description: "Para Senku toda pergunta tem resposta e toda resposta leva a uma nova pergunta. O entusiasmo dele sobre reações químicas é mais contagiante que qualquer emoção.", fameLevel: "known", image: "🧪", similarTo: ["Okabe (Steins;Gate)", "Edward Elric"] },
  { id: "frieren", name: "Frieren", anime: "Frieren: Beyond Journey's End", archetype: "espirito", archetypeLabel: "A Que Aprendeu a Sentir o Tempo", age: "Mais de 1000 anos", ability: "Magia acumulada por milênios — poder de quem aprendeu enquanto todos ao redor envelheciam", traits: ["Aparência etérea", "Introspecção profunda", "Tempo diferente", "Aprendendo tardio sobre humanidade", "Saudade como motor"], quote: "Eu simplesmente não conseguia entender os humanos. Agora quero.", description: "Viu seus companheiros envelhecerem e morrerem enquanto ela permanecia a mesma. Seu arco é sobre aprender a sentir antes que seja tarde demais.", fameLevel: "known", image: "🌸", similarTo: ["Ginko (Mushishi)", "Violet Evergarden"] },
  { id: "okabe", name: "Rintarou Okabe", anime: "Steins;Gate", archetype: "espirito", archetypeLabel: "O Viajante Que Carrega Tudo", age: "18 anos", ability: "Reading Steiner — único que mantém memórias ao mudar linha do tempo", traits: ["Teatral", "Ansioso por dentro", "Genialmente louco", "Carrega sacrifícios", "Vive entre linhas do tempo"], quote: "Sou um cientista louco! El Psy Kongroo.", description: "Faz pose de vilão para esconder que é o homem mais sensível do universo. Viu quem ama morrer centenas de vezes e continuou tentando.", fameLevel: "known", image: "📡", similarTo: ["Senku (Dr. Stone)", "Dazai (BSD)"] },
  { id: "ginko", name: "Ginko", anime: "Mushishi", archetype: "espirito", archetypeLabel: "O Observador Eterno", age: "Adulto", ability: "Sentido especial para Mushi — criaturas entre vida e energia que ninguém mais vê", traits: ["Calmo absoluto", "Sem apego", "Observador", "Sábio sem arrogância", "Caminha entre mundos"], quote: "Os Mushi existem simplesmente para existir. Como todos nós.", description: "Não luta. Não grita. Não tem objetivo grandioso. Apenas caminha, observa e ajuda. O mais zen da animação japonesa.", fameLevel: "obscure", image: "🌿", similarTo: ["Spike Spiegel (Cowboy Bebop)", "Holo (Spice and Wolf)"] },

  // ── CONEXÃO ──
  { id: "violet", name: "Violet Evergarden", anime: "Violet Evergarden", archetype: "conexao", archetypeLabel: "A Que Aprendeu a Sentir", age: "14 → 18 anos", ability: "Digitadora Auto-Memory Doll — escreve cartas que capturam emoções com perfeição", traits: ["Aprende a sentir", "Literalmente fria no início", "Cartas que mudam vidas", "Amor como missão", "Crescimento lento e belo"], quote: "Quero entender o significado das palavras 'eu te amo'.", description: "Criada como arma. Aprendeu que a palavra mais poderosa que existe é 'eu te amo'. Humanidade aprendida através das emoções dos outros.", fameLevel: "known", image: "💌", similarTo: ["Tohru Honda (Fruits Basket)", "Naho (Orange)"] },
  { id: "gon", name: "Gon Freecss", anime: "Hunter x Hunter", archetype: "conexao", archetypeLabel: "O Puro Que Vê Todos", age: "12 anos", ability: "Nen de Reforço — poder de vida concentrado, a forma mais pura de Nen", traits: ["Puro", "Intuitivo", "Caça amizades", "Surpreendente", "Lado sombrio ativado pela perda"], quote: "Se você decidiu ser meu amigo, é para sempre.", description: "A pureza de Gon faz todos ao redor quererem protegê-lo. Quando ele quebra — quando perde quem ama — você entende que pureza sem limites também pode aterrorizar.", fameLevel: "known", image: "🎣", similarTo: ["Naruto", "Luffy"] },
  { id: "mob", name: "Mob / Shigeo Kageyama", anime: "Mob Psycho 100", archetype: "conexao", archetypeLabel: "O Poder Contido Pela Gentileza", age: "14 anos", ability: "Poder psíquico ilimitado — suprime porque acredita que sentimentos valem mais", traits: ["Poder absurdo", "Autocontrole extremo", "Humildade genuína", "Emoções como explosões", "Só quer ser normal"], quote: "Não quero usar meus poderes para resolver tudo. Quero crescer como pessoa.", description: "Tem poder suficiente para destruir o planeta. Escolhe usá-lo o mínimo possível porque acredita que emoções e conexões são mais valiosas que força.", fameLevel: "known", image: "💫", similarTo: ["Saitama (One Punch Man)", "Tanjiro"] },
  { id: "tohru", name: "Tohru Honda", anime: "Fruits Basket", archetype: "conexao", archetypeLabel: "A Que Cura Só Existindo", age: "16 anos", ability: "Empatia absoluta — vê o bem em qualquer pessoa mesmo nas mais quebradas", traits: ["Bondade sem limites", "Nunca guarda rancor", "Cura traumas", "Força silenciosa", "Amor incondicional"], quote: "Só de você existir, minha vida fica cheia.", description: "Não tem poder de luta. Não tem planos grandiosos. Cura as pessoas simplesmente sendo quem é. Uma família inteira de pessoas quebradas encontrou forma humana através dela.", fameLevel: "obscure", image: "🌸", similarTo: ["Violet Evergarden", "Hinata (Naruto)"] },
];

export const SHADOW_MAP: Record<Archetype, Archetype> = {
  coracao: "mente",
  mente: "coracao",
  forca: "conexao",
  conexao: "forca",
  espirito: "espirito",
};

export const DNA_MAP: Record<Archetype, AnimeDNA> = {
  coracao:  { action: 85, adventure: 80, drama: 60, romance: 30, fantasy: 55, comedy: 45, psychological: 20, mystery: 25, sliceOfLife: 25, sciFi: 15 },
  mente:    { psychological: 90, mystery: 85, drama: 65, action: 45, fantasy: 40, adventure: 40, romance: 25, comedy: 20, sliceOfLife: 15, sciFi: 55 },
  forca:    { action: 90, adventure: 80, drama: 55, fantasy: 65, comedy: 30, romance: 25, psychological: 40, mystery: 35, sliceOfLife: 15, sciFi: 30 },
  espirito: { mystery: 80, fantasy: 85, sciFi: 80, drama: 65, psychological: 75, adventure: 55, action: 30, romance: 40, comedy: 20, sliceOfLife: 45 },
  conexao:  { romance: 85, drama: 80, sliceOfLife: 80, comedy: 65, adventure: 45, action: 25, fantasy: 55, psychological: 50, mystery: 35, sciFi: 20 },
};

export function calculateDNA(scores: ArchetypeScore): AnimeDNA {
  const total = Object.values(scores).reduce((a, b) => a + b, 0) || 1;
  const result: AnimeDNA = { action: 0, romance: 0, mystery: 0, comedy: 0, fantasy: 0, drama: 0, psychological: 0, adventure: 0, sliceOfLife: 0, sciFi: 0 };
  for (const [arch, score] of Object.entries(scores) as [Archetype, number][]) {
    const weight = score / total;
    const dna = DNA_MAP[arch];
    for (const key of Object.keys(result) as (keyof AnimeDNA)[]) {
      result[key] = Math.round(result[key] + dna[key] * weight);
    }
  }
  return result;
}

export type ArchetypeScore = Record<Archetype, number>;

export interface TestQuestion {
  id: string;
  question: string;
  emoji: string;
  options: { label: string; scores: Partial<ArchetypeScore> }[];
}

export const TEST_QUESTIONS: TestQuestion[] = [
  { id: "motivation", question: "O que te move acima de tudo?", emoji: "🔥", options: [
    { label: "Proteger quem amo, custe o que custar", scores: { coracao: 3, conexao: 1 } },
    { label: "Alcançar meu objetivo com precisão total", scores: { mente: 3, forca: 1 } },
    { label: "Ser o melhor na minha arte, sem exceção", scores: { forca: 3, mente: 1 } },
    { label: "Entender o porquê de tudo existir", scores: { espirito: 3, mente: 1 } },
  ]},
  { id: "problem", question: "Como você resolve um problema difícil?", emoji: "🧩", options: [
    { label: "Enfrento de frente com tudo que tenho", scores: { coracao: 2, forca: 1 } },
    { label: "Planejo cada detalhe antes de agir", scores: { mente: 3 } },
    { label: "Treino até dominar a situação", scores: { forca: 2, coracao: 1 } },
    { label: "Observo e entendo antes de qualquer coisa", scores: { espirito: 2, mente: 1 } },
  ]},
  { id: "group", question: "Em grupo, você costuma:", emoji: "👥", options: [
    { label: "Liderar pelo exemplo e energia", scores: { coracao: 2, conexao: 1 } },
    { label: "Planejar nos bastidores silenciosamente", scores: { mente: 2, espirito: 1 } },
    { label: "Executar com excelência técnica", scores: { forca: 2 } },
    { label: "Conectar as pessoas e resolver conflitos", scores: { conexao: 3 } },
  ]},
  { id: "defeat", question: "Quando você perde, sua reação é:", emoji: "💢", options: [
    { label: "Fico mais determinado. Ninguém vai me deter", scores: { coracao: 3 } },
    { label: "Analiso o erro e refaço o plano completo", scores: { mente: 2, espirito: 1 } },
    { label: "Processo em silêncio e volto mais forte", scores: { forca: 2, mente: 1 } },
    { label: "Busco apoio e supero junto com alguém", scores: { conexao: 3 } },
  ]},
  { id: "strength", question: "Sua maior força segundo você mesmo:", emoji: "💪", options: [
    { label: "Minha vontade nunca quebra", scores: { coracao: 3 } },
    { label: "Minha inteligência estratégica", scores: { mente: 3 } },
    { label: "Minha disciplina e domínio técnico", scores: { forca: 3 } },
    { label: "Minha capacidade de entender as pessoas", scores: { conexao: 2, espirito: 1 } },
  ]},
  { id: "rules", question: "Sobre regras e sistemas:", emoji: "⚖️", options: [
    { label: "Sigo meu código. Regras externas são secundárias", scores: { coracao: 2, espirito: 1 } },
    { label: "Uso as regras quando me convém — são ferramentas", scores: { mente: 3 } },
    { label: "Respeito a estrutura — ela existe por razão", scores: { forca: 2, mente: 1 } },
    { label: "Conexões humanas vêm antes das regras", scores: { conexao: 2, coracao: 1 } },
  ]},
  { id: "scenario", question: "Qual cenário te representa melhor?", emoji: "🌌", options: [
    { label: "Superar o impossível sozinho pelo que acredito", scores: { coracao: 2, forca: 1 } },
    { label: "Mover as peças do tabuleiro enquanto ninguém percebe", scores: { mente: 3 } },
    { label: "Descobrir verdades escondidas sobre a existência", scores: { espirito: 3 } },
    { label: "Ser a razão pela qual alguém não desistiu", scores: { conexao: 3 } },
  ]},
  { id: "fear", question: "O que mais te assusta no fundo?", emoji: "😨", options: [
    { label: "Não conseguir proteger quem amo", scores: { coracao: 2, conexao: 1 } },
    { label: "Perder o controle e cometer um erro irreparável", scores: { mente: 2, forca: 1 } },
    { label: "Não ser suficientemente forte quando precisar", scores: { forca: 2, coracao: 1 } },
    { label: "Nunca encontrar o verdadeiro propósito", scores: { espirito: 2, conexao: 1 } },
  ]},
];

export function getCharacterResult(scores: ArchetypeScore): {
  primary: AnimeCharacter; medium: AnimeCharacter; hidden: AnimeCharacter;
  rival: AnimeCharacter; shadow: AnimeCharacter;
  archetype: Archetype; archetypeLabel: string; dna: AnimeDNA;
} {
  const sorted = (Object.entries(scores) as [Archetype, number][]).sort((a, b) => b[1] - a[1]);
  const topArchetype = sorted[0][0];
  const secondArchetype = sorted[1][0];
  const shadowArchetype = SHADOW_MAP[topArchetype];

  const pool = CHARACTERS.filter((c) => c.archetype === topArchetype);
  const primary = pool.find((c) => c.fameLevel === "iconic") ?? pool[0];
  const medium = pool.find((c) => c.fameLevel === "known") ?? pool[1] ?? primary;
  const hidden = pool.find((c) => c.fameLevel === "obscure") ?? pool[2] ?? medium;

  const rivalPool = CHARACTERS.filter((c) => c.archetype === secondArchetype);
  const rival = rivalPool.find((c) => c.fameLevel === "iconic") ?? rivalPool[0] ?? primary;

  const shadowPool = CHARACTERS.filter((c) => c.archetype === shadowArchetype);
  const shadow = shadowPool.find((c) => c.fameLevel === "known") ?? shadowPool[0] ?? medium;

  const archetypeLabels: Record<Archetype, string> = {
    coracao: "Coração — O Herói que Sente",
    mente: "Mente — O Estrategista Calculista",
    forca: "Força — O Guerreiro Disciplinado",
    espirito: "Espírito — O Observador Curioso",
    conexao: "Conexão — O Que Une as Pessoas",
  };

  const dna = calculateDNA(scores);

  return { primary, medium, hidden, rival, shadow, archetype: topArchetype, archetypeLabel: archetypeLabels[topArchetype], dna };
}
