export interface Guide {
  slug: string;
  title: string;
  description: string;
  icon: string;
  category: "iniciante" | "franquia" | "genero" | "lista";
  readTime: number;
  content: string;
  tags: string[];
}

export const GUIDES: Guide[] = [
  {
    slug: "melhores-animes-para-iniciantes",
    title: "Melhores Animes para Iniciantes",
    description: "Não sabe por onde começar? Esta lista tem os animes perfeitos para quem ainda não assistiu nada — ou quase nada.",
    icon: "🌟",
    category: "iniciante",
    readTime: 5,
    tags: ["iniciante", "top", "classicos"],
    content: `## Por que começar com os certos?

Começar com o anime errado pode afastar qualquer um do hobby. Por isso, selecionamos títulos que são acessíveis, envolventes e não exigem conhecimento prévio do gênero.

### 1. Fullmetal Alchemist: Brotherhood (2009)

Considerado por muitos o melhor anime de todos os tempos, FMA:B tem uma história completa, bem estruturada, com personagens memoráveis e um ritmo que prende do início ao fim.

- **Episódios**: 64
- **Gênero**: Ação, Aventura, Drama
- **Por que assistir**: História completa, personagens inesquecíveis, sem enrolação

### 2. Death Note (2006)

Um thriller psicológico sobre um estudante genial que encontra um caderno sobrenatural capaz de matar qualquer pessoa. Extremamente acessível para não-otakus.

- **Episódios**: 37
- **Gênero**: Thriller, Suspense, Psicológico
- **Por que assistir**: Série curta, história tensa e sem necessidade de contexto anterior

### 3. Sword Art Online (2012)

Jogadores ficam presos num RPG virtual e precisam completar o jogo para sobreviver. Conceito fácil de entender, ação constante.

- **Episódios**: 25 (1ª temporada)
- **Gênero**: Ação, Fantasia, Romance
- **Por que assistir**: Premissa moderna e acessível

### 4. Demon Slayer (2019)

Um dos animes mais bonitos já produzidos. A história de Tanjiro, um jovem que busca salvar sua irmã transformada em demônio, com animação espetacular.

- **Episódios**: 26 (1ª temporada)
- **Gênero**: Ação, Sobrenatural
- **Por que assistir**: Animação impressionante, história envolvente

### 5. One Punch Man (2015)

Um herói tão poderoso que derrota qualquer inimigo com um único soco — e está entediado com isso. Uma paródia inteligente e hilária do gênero de super-heróis.

- **Episódios**: 12 (1ª temporada)
- **Gênero**: Ação, Comédia
- **Por que assistir**: Curto, engraçado e com ação espetacular

## Dica extra

Evite começar com animes muito longos como Naruto ou One Piece (500+ episódios) antes de ter certeza que você gosta do formato. Comece com séries completas e curtas!`,
  },
  {
    slug: "ordem-para-assistir-naruto",
    title: "Ordem Certa para Assistir Naruto",
    description: "Guia completo da ordem cronológica de Naruto, incluindo Shippuden, filmes e Boruto, sem spoilers.",
    icon: "🍥",
    category: "franquia",
    readTime: 8,
    tags: ["naruto", "ordem", "shippuden", "boruto"],
    content: `## Naruto: A Ordem Correta

A franquia Naruto é uma das maiores do mundo dos animes. Com centenas de episódios e vários filmes, saber a ordem certa é essencial.

### Ordem Recomendada

#### 1. Naruto Clássico (2002–2007)
- **Episódios**: 220 (com fillers)
- **Essenciais**: 1-5, 19-23, 29-58, 67-96, 107-135, 143-220
- **Fillers para pular**: 136-142, 162-196

#### 2. Naruto: Shippuden (2007–2017)
- **Episódios**: 500 (com fillers)
- **Essenciais**: Segue o arco principal
- **Fillers para pular**: Episódios 57-71, 91-112, 144-151, 170-171, 176-196...

#### Filmes (assistir quando indicado)
1. Naruto Clássico — Filmes 1-3 (opcionais, não são canon)
2. Shippuden — Filme 4: "The Lost Tower" (após episódio 175)
3. Shippuden — Filme 6: "Road to Ninja" (após episódio 311) ⭐ Recomendado
4. "The Last: Naruto the Movie" (após o episódio 479) ⭐ Canon!

#### 3. Boruto: Naruto Next Generations
- Continuação com o filho de Naruto
- Assista somente após terminar Shippuden

## Sobre os Fillers

Filler é conteúdo não baseado no mangá original. São episódios opcionais que não avançam a história principal. Você pode pular sem perder nada essencial.

## Dica Importante

Se quiser a experiência completa sem fillers, use a lista no site naruto-original.com (externo).`,
  },
  {
    slug: "ordem-para-assistir-demon-slayer",
    title: "Ordem para Assistir Demon Slayer",
    description: "A ordem correta para assistir Kimetsu no Yaiba sem se perder entre temporadas e filmes.",
    icon: "⚔️",
    category: "franquia",
    readTime: 4,
    tags: ["demon slayer", "kimetsu no yaiba", "ordem", "filme"],
    content: `## Demon Slayer: Ordem Simples

Demon Slayer é uma franquia pequena e bem organizada. Não tem fillers nem confusão de timeline.

### Ordem Cronológica

1. **Temporada 1** — Demon Slayer: Kimetsu no Yaiba (26 eps, 2019)
2. **Filme** — Mugen Train (2020) ⭐ Obrigatório! É continuação direta da T1
3. **Temporada 2** — Entertainment District Arc (11 eps, 2021/2022)
   - Os primeiros 7 eps são uma versão estendida do filme Mugen Train
   - Você pode pular os 7 primeiros se já assistiu o filme
4. **Temporada 3** — Swordsmith Village Arc (11 eps, 2023)
5. **Temporada 4** — Hashira Training Arc (8 eps, 2024)

### Preciso assistir o filme no cinema?

Não. O filme está disponível em plataformas de streaming. Mas é altamente recomendado — é um dos maiores filmes de anime da história.

### Tem filler?

Não! Toda Demon Slayer é baseada diretamente no mangá. Sem episódios de enrolação.`,
  },
  {
    slug: "o-que-e-isekai",
    title: "O que é Isekai? Guia Completo",
    description: "Entenda o gênero isekai, como surgiu, por que faz tanto sucesso e quais são os melhores títulos.",
    icon: "🌍",
    category: "genero",
    readTime: 6,
    tags: ["isekai", "genero", "explicacao"],
    content: `## O que é Isekai?

**Isekai** (異世界) significa literalmente "outro mundo" em japonês. É um gênero de anime onde o protagonista é transportado, reencarnado ou preso em outro mundo — geralmente um mundo de fantasia tipo RPG.

### Como funciona?

O herói normalmente sai do mundo real (geralmente Japão contemporâneo) e acaba em um mundo medieval com magia, monstros e sistemas de nível como nos videogames.

### Por que faz tanto sucesso?

- **Fantasia de escapismo**: O espectador se projeta facilmente no protagonista
- **Mecânicas de RPG**: Sistemas de nível, habilidades e inventário agradam fãs de games
- **Mundo novo para explorar**: Permite worldbuilding criativo

### Tipos de Isekai

- **Reencarnação**: Protagonista morre e renasce no outro mundo (Re:Zero, Mushoku Tensei)
- **Invocação**: Protagonista é chamado por habitants do outro mundo (Overlord, Shield Hero)
- **Transferência**: Protagonista é sugado para dentro de um jogo/livro (SAO, Konosuba)

### Melhores Isekai para Começar

1. **Re:Zero** — Drama intenso, protagonista não-invencível
2. **Mushoku Tensei** — Melhor worldbuilding do gênero
3. **KonoSuba** — Paródia hilária e perfeita
4. **Overlord** — Protagonista é o vilão (invertido!)
5. **That Time I Got Reincarnated as a Slime** — Leve e divertido`,
  },
  {
    slug: "o-que-e-shounen",
    title: "O que é Shounen? Os Melhores Títulos",
    description: "Entenda o gênero shounen — o mais popular do mundo dos animes — e descubra os títulos obrigatórios.",
    icon: "💥",
    category: "genero",
    readTime: 5,
    tags: ["shounen", "genero", "naruto", "dragon ball"],
    content: `## O que é Shounen?

**Shounen** (少年) significa "jovem" ou "menino" em japonês. É a categoria demográfica de mangá/anime voltada para o público masculino jovem (12-18 anos), embora seja adorada por pessoas de todas as idades.

### Características do Shounen

- **Protagonista determinado**: O herói nunca desiste, mesmo diante do impossível
- **Poder da amizade**: Laços entre personagens são centrais para a trama
- **Progressão de poder**: O protagonista fica mais forte ao longo da história
- **Batalhas épicas**: Confrontos intensos são marca registrada
- **Humor equilibrado**: A leveza alivia momentos tensos

### O Trio Clássico (Os "Big Three")

1. **Naruto** — Ninja que sonha em se tornar o líder da sua aldeia
2. **Bleach** — Adolescente que vira um ceifador de almas
3. **One Piece** — Pirata em busca do maior tesouro do mundo

### Shounen Modernos Obrigatórios

- **Demon Slayer**: Animação incrível, história emocionante
- **My Hero Academia**: Super-heróis num mundo onde poderes são comuns
- **Jujutsu Kaisen**: Batalhas contra maldições usando energia amaldiçoada
- **Attack on Titan**: Drama sombrio e reviravoltas constantes (mais seinen na proposta)

### Shounen vs. Seinen vs. Shoujo

- **Shounen**: Para jovens, ação e amizade
- **Seinen**: Para adultos, mais complexo e sombrio
- **Shoujo**: Para meninas jovens, mais romance e emoção`,
  },
  {
    slug: "animes-curtos-para-maratonar",
    title: "Animes Curtos para Maratonar no Final de Semana",
    description: "Lista com animes de 12 a 26 episódios que você consegue terminar num fim de semana.",
    icon: "⚡",
    category: "lista",
    readTime: 4,
    tags: ["curto", "maratona", "lista"],
    content: `## Maratona Garantida

Esses animes têm entre 12 e 26 episódios — o tamanho perfeito para maratonar num fim de semana.

### 12-13 Episódios (1 dia)

- **One Punch Man** — Herói invencível existencialmente entediado. Ação + comédia perfeita
- **Spy x Family** — Espião monta família falsa com telepatia e assassina. Adorável
- **Cyberpunk: Edgerunners** — Drama cyberpunk visceral (relacionado ao game)
- **Violet Evergarden** — Obra-prima sobre emoções humanas, animação linda

### 24-26 Episódios (fim de semana)

- **Fullmetal Alchemist: Brotherhood** — Considerado o melhor anime de todos os tempos
- **Death Note** — Thriller psicológico eletrizante
- **Steins;Gate** — Ficção científica sobre viagem no tempo
- **Code Geass** — Estratégia e poder em anime político épico
- **Neon Genesis Evangelion** — O anime que redefiniu o gênero mecha

### Filmes (uma tarde)

- **Your Name** (1h52min) — Romance + fantasia, um dos maiores da história
- **Spirited Away** (2h5min) — Obra-prima do Studio Ghibli
- **A Silent Voice** (2h10min) — Drama sobre bullying, muito emocionante`,
  },
  {
    slug: "o-que-e-seinen",
    title: "O que é Seinen? Os Melhores Títulos para Adultos",
    description: "Entenda o gênero seinen e descubra os animes mais maduros e complexos para o público adulto.",
    icon: "🎭",
    category: "genero",
    readTime: 5,
    tags: ["seinen", "genero", "adultos", "maduro"],
    content: `## O que é Seinen?

**Seinen** (青年) significa "jovem adulto" em japonês. É a categoria de mangá/anime voltada para o público masculino adulto (18+). Os temas são mais complexos, sombrios e maduros do que o shounen.

### Diferenças do Shounen

| Característica | Shounen | Seinen |
|---|---|---|
| Público-alvo | 12-18 anos | 18+ anos |
| Temas | Amizade, superação | Política, filosofia, trauma |
| Protagonista | Determinado, otimista | Complexo, questionável |
| Violência | Moderada | Pode ser intensa |
| Final | Geralmente positivo | Variado, pode ser trágico |

### Seinen Essenciais

1. **Berserk** — Dark fantasy brutal sobre um mercenário em busca de vingança
2. **Vinland Saga** — Guerra, filosofia e redenção na era Viking
3. **Vagabond** — Jornada do samurai Miyamoto Musashi em busca de si mesmo
4. **Monster** — Suspense sobre um médico que salva um assassino em série
5. **Parasyte** — Ficção científica sobre parasitas alienígenas e humanidade
6. **Hellsing Ultimate** — Vampiros e horror com estética sombria`,
  },
  {
    slug: "animes-para-assistir-com-filhos",
    title: "Animes para Assistir com seus Filhos",
    description: "Lista segura e divertida de animes apropriados para crianças e para assistir em família.",
    icon: "👨‍👧",
    category: "lista",
    readTime: 4,
    tags: ["familia", "criancas", "seguro", "studio ghibli"],
    content: `## Anime em Família

O anime não é só para adultos! Muitos títulos são perfeitos para crianças e para assistir junto com a família.

### Filmes do Studio Ghibli (Recomendados para Todas as Idades)

- **My Neighbor Totoro** — Duas irmãs fazem amizade com uma criatura mágica da floresta
- **Spirited Away** — Uma menina precisa resgatar seus pais num mundo espiritual
- **Kiki's Delivery Service** — Uma jovem bruxa começa sua vida independente
- **Castle in the Sky** — Aventura épica de dois jovens e uma ilha voadora
- **Howl's Moving Castle** — Magia, guerra e um castelo que caminha

### Séries Apropriadas para Crianças

- **Pokémon** — Clássico atemporal sobre batalhas e amizades com criaturas
- **Doraemon** — Robô gato do futuro com gadgets mágicos
- **Chi's Sweet Home** — A vida adorável de uma gatinha
- **Yotsuba&!** — Slice of life sobre uma criança curiosa descobrindo o mundo

### Para Crianças Mais Velhas (10+)

- **Fullmetal Alchemist: Brotherhood** — Aventura com lições sobre consequências e sacrifício
- **Spy x Family** — Família falsa muito fofa com humor para todas as idades
- **Violet Evergarden** — Emocionante, com temas de perda e crescimento pessoal`,
  },
  {
    slug: "ordem-para-assistir-dragon-ball",
    title: "Ordem Certa para Assistir Dragon Ball Completo",
    description: "Do clássico ao Super: a ordem cronológica correta para assistir toda a franquia Dragon Ball sem se perder.",
    icon: "⚡",
    category: "franquia",
    readTime: 7,
    tags: ["dragon ball", "ordem", "super", "z"],
    content: `## Dragon Ball: A Franquia Completa em Ordem

Dragon Ball é uma das franquias mais longas e complexas do mundo dos animes. Veja a ordem correta:

### Ordem Cronológica Recomendada

#### 1. Dragon Ball (1986–1989)
- 153 episódios
- A infância de Goku, o encontro com Bulma e a busca pelas esferas
- **Pode pular?** Sim, se quiser ir direto para a ação — mas recomendamos assistir

#### 2. Dragon Ball Z (1989–1996)
- 291 episódios (com fillers) / ~200 sem fillers
- A história principal: Saiyajins, Freeza, Cell, Majin Boo
- **Essencial!** A espinha dorsal da franquia

#### 3. Dragon Ball Z Kai (2009–2015)
- Versão remasterizada de DBZ sem fillers
- **Alternativa ao DBZ original** — mais curto e com melhor ritmo

#### 4. Dragon Ball GT (1996–1997)
- 64 episódios
- Não é canon — história original, não baseada no mangá
- **Opinião dividida:** muitos fãs pulam

#### 5. Dragon Ball Super (2015–2018)
- 131 episódios
- Canon! Escrito pelo Toriyama. Arcos: Battle of Gods, Frieza, Universe 6, Black Goku, Tournament of Power
- **Obrigatório para fãs modernos**

#### 6. Dragon Ball Super: Broly (2018) — Filme
- Canon! Apresenta o novo Broly
- Assista após o episódio 131 do Super

#### 7. Dragon Ball Super: Super Hero (2022) — Filme
- Canon! Foco em Gohan e Piccolo
- O filme mais recente da franquia

### Filmes Não-Canon (Opcionais)
- DBZ tem 13 filmes clássicos — não são canon mas são divertidos
- Broly Lendário (1993), Fusion (1995) e Battle of Gods (2013) são os mais populares

### Qual ordem para iniciantes?
**Caminho mais fácil:** Dragon Ball Z Kai → Dragon Ball Super → filmes canon`,
  },
  {
    slug: "ordem-para-assistir-attack-on-titan",
    title: "Ordem para Assistir Attack on Titan (Shingeki no Kyojin)",
    description: "A ordem correta para assistir Attack on Titan sem spoilers, incluindo todas as temporadas e o final.",
    icon: "👾",
    category: "franquia",
    readTime: 5,
    tags: ["attack on titan", "shingeki no kyojin", "ordem", "final"],
    content: `## Attack on Titan: Ordem Simples e Sem Spoiler

Attack on Titan (SnK) é linear e sem fillers. Simples de acompanhar:

### Ordem de Exibição

1. **Temporada 1** — 25 episódios (2013) — Apresentação do mundo, os titãs e Eren
2. **Temporada 2** — 12 episódios (2017) — Revelações e traições
3. **Temporada 3 Parte 1** — 12 episódios (2018) — Conspiração política
4. **Temporada 3 Parte 2** — 10 episódios (2019) — O porão e as revelações épicas
5. **Temporada 4 Parte 1** — 16 episódios (2020/2021) — Salto temporal, Marley
6. **Temporada 4 Parte 2** — 12 episódios (2022) — Rumbling começa
7. **Temporada 4 Parte 3** — 2 episódios especiais (2023) — Final da série

### Total: ~87 episódios + 2 especiais finais

### Tem OVAs?
Sim! Os OVAs são opcionais mas recomendados:
- **No Regrets** — Origem do Capitão Levi ⭐ Recomendado
- **Lost Girls** — História de Mikasa e Annie (assista após T2)

### Devo assistir em ordem de lançamento?
**Sim, absolutamente.** Attack on Titan tem uma narrativa construída com cuidado e cada temporada depende da anterior. Nunca pule episódios.

### Aviso de conteúdo
Attack on Titan tem conteúdo pesado: violência gráfica, morte de personagens importantes e temas sombrios. Não recomendado para menores de 14 anos.`,
  },
  {
    slug: "ordem-para-assistir-jujutsu-kaisen",
    title: "Ordem para Assistir Jujutsu Kaisen",
    description: "A ordem correta para assistir Jujutsu Kaisen incluindo o filme Jujutsu Kaisen 0 e todas as temporadas.",
    icon: "👁️",
    category: "franquia",
    readTime: 4,
    tags: ["jujutsu kaisen", "jjk", "ordem", "filme"],
    content: `## Jujutsu Kaisen: Ordem Correta

Jujutsu Kaisen tem uma ordem simples, mas tem um filme que confunde muita gente:

### Ordem Recomendada

1. **Temporada 1** — 24 episódios (2020/2021)
   - Apresenta Yuji Itadori e o mundo das maldições
   - Obrigatório como primeiro passo

2. **Jujutsu Kaisen 0: O Filme** (2021)
   - Prequel — acontece ANTES da T1 cronologicamente
   - Mas recomendamos assistir DEPOIS da T1 para curtir melhor
   - Apresenta Yuta Okkotsu, personagem importante na T2

3. **Temporada 2** — 23 episódios (2023)
   - Arco Passado de Gojo + Shibuya Incident
   - Considerada uma das melhores temporadas de anime recentes

### Posso assistir o filme antes da T1?
Cronologicamente sim, mas o impacto é maior após a T1. Recomendamos T1 → Filme → T2.

### Devo ler o mangá?
O mangá está adiantado e o anime está em produção. Se quiser continuar após a T2, o mangá é o caminho.

### Sobre a T2 — Shibuya Incident
A T2 é intensa e tem mortes importantes. Se você se apegou aos personagens, separe lencinhos.`,
  },
  {
    slug: "melhores-animes-de-acao",
    title: "20 Melhores Animes de Ação de Todos os Tempos",
    description: "Lista definitiva dos melhores animes de ação — de clássicos a lançamentos recentes, com notas e onde assistir.",
    icon: "⚔️",
    category: "lista",
    readTime: 8,
    tags: ["acao", "top", "lista", "melhores"],
    content: `## Os 20 Melhores Animes de Ação

### Top 5 — Absolutos
1. **Fullmetal Alchemist: Brotherhood** ★ 9.1 — O melhor anime de ação da história
2. **Attack on Titan** ★ 9.0 — Revolução no gênero. Imperdível
3. **Demon Slayer** ★ 8.7 — Animação mais linda já feita
4. **Jujutsu Kaisen** ★ 8.6 — O anime de ação mais popular da atualidade
5. **Hunter x Hunter (2011)** ★ 9.0 — Subverte todos os tropos do gênero

### Top 6–10 — Clássicos Obrigatórios
6. **Naruto Shippuden** ★ 8.6 — A jornada ninja mais emocionante
7. **One Piece** ★ 8.9 — A maior aventura de todos os tempos
8. **Dragon Ball Z** ★ 8.0 — O pai de todos os animes de ação
9. **Bleach: TYBW** ★ 8.9 — O retorno épico de Bleach
10. **My Hero Academia** ★ 8.5 — Super-heróis no estilo anime

### Top 11–20 — Para Não Parar de Assistir
11. **Vinland Saga** ★ 8.8 — Vikings com profundidade filosófica
12. **Black Clover** ★ 8.2 — O Naruto da geração atual
13. **Sword Art Online** ★ 7.7 — Isekai de ação, muito popular
14. **Solo Leveling** ★ 8.5 — O protagonista mais overpowered do gênero
15. **Chainsaw Man** ★ 8.5 — Bizarro, violento e brilhante
16. **Mob Psycho 100** ★ 8.8 — Poderes psiônicos e crescimento pessoal
17. **Samurai Champloo** ★ 8.5 — Samurai com trilha sonora de hip-hop
18. **Gurren Lagann** ★ 8.7 — O anime mais épico sobre nunca desistir
19. **Noragami** ★ 8.3 — Deuses japoneses em aventuras modernas
20. **Re:Zero** ★ 8.3 — Isekai com consequências reais

### Dica de Ordem para Iniciantes em Ação
Comece por: Demon Slayer → Fullmetal Alchemist: Brotherhood → Jujutsu Kaisen`,
  },
  {
    slug: "melhores-animes-de-romance",
    title: "15 Melhores Animes de Romance para se Apaixonar",
    description: "Os animes de romance mais emocionantes e bem avaliados — para chorar, sorrir e se apaixonar junto com os personagens.",
    icon: "💕",
    category: "lista",
    readTime: 6,
    tags: ["romance", "lista", "drama", "top"],
    content: `## Os Melhores Animes de Romance

### Para Chorar (Aviso: tenha lenços)
1. **Violet Evergarden** ★ 8.9 — Obra-prima sobre amor, perda e emoções humanas
2. **Clannad: After Story** ★ 9.1 — O anime mais emocionante já feito (prepare-se)
3. **Your Lie in April** ★ 8.7 — Música, amor e tragédia em doses certas
4. **A Silent Voice** ★ 8.9 — Bullying, redenção e amor (filme)
5. **Anohana** ★ 8.5 — Amigos de infância e uma perda irreparável

### Para Sorrir e Se Sentir Bem
6. **Toradora** ★ 8.4 — O tsundere mais famoso do anime
7. **Horimiya** ★ 8.3 — Romance maduro e realista entre opostos
8. **Kaguya-sama: Love is War** ★ 8.5 — Batalha de egos disfarçada de romance
9. **Spy x Family** ★ 8.7 — Não é romance puro, mas o casal é irresistível
10. **My Dress-Up Darling** ★ 8.3 — Cosplay e romance gentil

### Filmes de Romance Obrigatórios
11. **Your Name (Kimi no Na wa)** ★ 9.0 — O maior filme de anime de todos os tempos
12. **Weathering With You** ★ 8.5 — Do mesmo diretor de Your Name
13. **The Girl Who Leapt Through Time** ★ 8.2 — Viagem no tempo e consequências do amor
14. **5 Centimeters Per Second** ★ 7.9 — Distância e saudade em poesia visual
15. **I Want to Eat Your Pancreas** ★ 8.5 — Título estranho, história devastadora`,
  },
  {
    slug: "melhores-animes-isekai",
    title: "Os 15 Melhores Animes Isekai — Guia Completo",
    description: "Lista dos melhores animes isekai de todos os tempos: de clássicos a lançamentos recentes, com sinopse e avaliação.",
    icon: "🌍",
    category: "lista",
    readTime: 7,
    tags: ["isekai", "lista", "top", "recomendacao"],
    content: `## Os Melhores Animes Isekai

### O que é Isekai?
Isekai (異世界 = "outro mundo") são animes onde o protagonista é transportado para um mundo diferente, geralmente de fantasia com elementos de RPG.

### Top 5 Essenciais
1. **Re:Zero** ★ 8.3 — O isekai mais inteligente. Protagonista não é overpowered, morre e revive com consequências reais
2. **Mushoku Tensei** ★ 8.5 — O melhor worldbuilding do gênero. Reencarnação com sistema de magia detalhado
3. **That Time I Got Reincarnated as a Slime** ★ 8.1 — Leve, divertido. Protagonista reencarna como slime mas é absurdamente poderoso
4. **KonoSuba** ★ 8.2 — Paródia perfeita do gênero. Os personagens são incompetentes e hilários
5. **Overlord** ★ 7.9 — O protagonista é o vilão. Perspectiva invertida e fascinante

### Para Fãs de Ação
6. **Sword Art Online** ★ 7.7 — O mais famoso. Preso num RPG virtual
7. **Log Horizon** ★ 7.8 — Foco na política e estratégia, não só em batalhas
8. **The Rising of the Shield Hero** ★ 7.9 — Tom mais sombrio, protagonista injustiçado

### Mais Recentes e Populares
9. **Solo Leveling** ★ 8.5 — Manhwa coreano adaptado. Visual espetacular
10. **Frieren: Beyond Journey's End** ★ 9.2 — Elfa imortal reflete sobre amizades perdidas
11. **Dungeon Meshi** ★ 8.7 — Aventureiros que cozinham monstros. Único no gênero

### Mais Leves / Slice of Life Isekai
12. **The Saint's Magic Power is Omnipotent** ★ 7.5 — Romance isekai para quem quer algo relaxante
13. **In Another World With My Smartphone** ★ 6.5 — Batata frita do gênero — simples e descompromissado
14. **Ascendance of a Bookworm** ★ 8.3 — Isekai focado em conhecimento e livros
15. **Reincarnated as a Sword** ★ 7.2 — Perspectiva da espada`,
  },
  {
    slug: "melhores-animes-psicologicos",
    title: "10 Melhores Animes Psicológicos que Vão Mexer com sua Cabeça",
    description: "Os animes psicológicos mais perturbadores e fascinantes — para quem quer ser desafiado e questionar a realidade.",
    icon: "🧠",
    category: "lista",
    readTime: 6,
    tags: ["psicologico", "thriller", "lista", "mentes"],
    content: `## Animes que Vão Mexer com Sua Cabeça

### O que é anime psicológico?
Animes que exploram a mente humana, realidades alternativas, dilemas morais e questionamentos filosóficos. Geralmente têm reviravoltas inesperadas e personagens complexos.

### Top 10 Psicológicos

1. **Death Note** ★ 8.6 — Gênio cria deus da morte. Batalha intelectual épica entre Light e L
2. **Neon Genesis Evangelion** ★ 8.5 — Trauma, identidade e o que significa ser humano. O mais influente do gênero
3. **Monster** ★ 8.7 — Médico caça o monstro que criou. Thriller lento e brilhante
4. **Steins;Gate** ★ 9.1 — Viagem no tempo e suas consequências psicológicas devastadoras
5. **Paranoia Agent** ★ 8.2 — Satoshi Kon. Sociedade japonesa em colapso mental
6. **Serial Experiments Lain** ★ 8.1 — Identidade na era digital. Perturbador e visionário
7. **Promised Neverland** ★ 8.5 — Crianças que descobrem a verdade sombria sobre sua existência
8. **Made in Abyss** ★ 8.8 — Exploration anime que vira pesadelo existencial
9. **Psycho-Pass** ★ 8.4 — Sociedade que detecta criminalidade antes do crime. Orwell em anime
10. **Higurashi: When They Cry** ★ 8.0 — Horror e loops temporais em cidade idílica

### Para Iniciantes no Gênero
Comece com **Death Note** — é acessível e viciante. Depois vá para **Steins;Gate**.`,
  },
  {
    slug: "animes-completos-para-maratonar",
    title: "Animes 100% Completos para Maratonar Sem Parar",
    description: "Lista de animes já finalizados que você pode maratonar do início ao fim sem esperar novos episódios.",
    icon: "📺",
    category: "lista",
    readTime: 5,
    tags: ["completo", "maratona", "finalizado", "lista"],
    content: `## Animes Completos — Sem Espera!

Nada pior que se apaixonar por um anime e descobrir que está incompleto. Esses você pode maratonar agora mesmo:

### Curtos (1 fim de semana)
- **Death Note** — 37 eps — Thriller perfeito
- **Code Geass** — 50 eps — Estratégia e poder
- **Steins;Gate** — 24 eps — Ficção científica emocionante
- **No Game No Life** — 12 eps — Gênios em mundo de jogos
- **Gurren Lagann** — 27 eps — Epicidade pura

### Médios (1-2 semanas)
- **Fullmetal Alchemist: Brotherhood** — 64 eps — O melhor anime
- **Hunter x Hunter (2011)** — 148 eps — Aventura sem igual
- **Clannad + After Story** — 49 eps — Drama máximo
- **Cowboy Bebop** — 26 eps — Clássico atemporal
- **Samurai Champloo** — 26 eps — Estilo único

### Longos (para os dedicados)
- **Gintama** — 367 eps — A melhor comédia de anime
- **Fairy Tail** — 328 eps — Aventura de magos
- **Inuyasha** — 193 eps — Clássico do início dos anos 2000
- **Yu Yu Hakusho** — 112 eps — Shounen dos anos 90

### Filmes para Uma Tarde
- **Your Name** — 1h52 — Romance/fantasia perfeito
- **Spirited Away** — 2h5 — Obra-prima do Ghibli
- **Akira** — 2h4 — O pai do anime moderno`,
  },
  {
    slug: "melhores-animes-2024-2025",
    title: "Melhores Animes de 2024 e 2025",
    description: "Os animes mais elogiados e assistidos dos anos 2024 e 2025. Novidades imperdíveis da temporada.",
    icon: "🆕",
    category: "lista",
    readTime: 5,
    tags: ["2024", "2025", "novidades", "lancamentos"],
    content: `## Os Melhores Animes de 2024 e 2025

### Destaques de 2024

#### Primavera 2024
- **Dungeon Meshi (Delicious in Dungeon)** ★ 8.7 — Aventureiros que cozinham monstros. O anime mais criativo do ano
- **Frieren: Beyond Journey's End** (continuação) ★ 9.2 — Concluiu em 2024. Masterpiece
- **Solo Leveling** ★ 8.5 — Adaptação do manhwa mais esperada dos últimos anos

#### Verão/Outono 2024
- **Bleach: TYBW Parte 3** ★ 8.9 — A saga final de Bleach com qualidade absurda
- **Dandadan** ★ 8.5 — Aliens, fantasmas e romance bizarro. Revelação do ano
- **Demon Slayer: Hashira Training Arc** ★ 8.4 — Preparação para o arco final

### Destaques de 2025

- **Demon Slayer: Infinity Castle Arc** — O arco final mais aguardado
- **Bleach: Final Arc** — Conclusão do Thousand-Year Blood War
- **Solo Leveling Temporada 2** — Sung Jin-Woo mais poderoso que nunca
- **Dragon Ball Daima** — Nova série do Toriyama

### Como acompanhar lançamentos?
Acesse nosso **Calendário da Temporada** para ver todos os animes em exibição agora com datas de episódios.`,
  },
  {
    slug: "melhores-animes-dublados-portugues",
    title: "Melhores Animes Dublados em Português",
    description: "Lista dos melhores animes com dublagem em português brasileiro — para quem prefere assistir sem legendas.",
    icon: "🇧🇷",
    category: "lista",
    readTime: 5,
    tags: ["dublado", "portugues", "brasil", "lista"],
    content: `## Melhores Animes Dublados em Português Brasileiro

### Por que dublado?
Muitos brasileiros preferem assistir sem legendas, especialmente crianças e quem está começando. A dublagem brasileira de anime tem alto nível técnico!

### Clássicos com Ótima Dublagem
- **Dragon Ball Z** — A dublagem lendária que criou gerações de fãs no Brasil
- **Naruto** — Dublagem nostálgica muito amada
- **Pokémon** — Clássico que muitos conheceram dublado
- **Cavaleiros do Zodíaco** — Uma das dublagens mais icônicas da TV brasileira
- **Yu-Gi-Oh!** — Outra geração inteira cresceu com esta dublagem

### Modernos Bem Dublados
- **Demon Slayer** — Dublagem excelente disponível na Crunchyroll
- **My Hero Academia** — Dub BR de alta qualidade
- **Attack on Titan** — Dublagem dramática e precisa
- **One Piece** — Longa e boa dublagem BR
- **Jujutsu Kaisen** — Disponível dublado na Crunchyroll BR

### Onde assistir dublado?
- **Crunchyroll** — Maior catálogo de dub BR para animes novos
- **Netflix** — Vários animes populares com dublagem
- **Amazon Prime Video** — Seleção menor mas de qualidade

### Dica
Mesmo amando dublagem, vale experimentar o original em japonês com legenda em português — a performance dos seiyuu (dubladores japoneses) é parte da experiência!`,
  },
  {
    slug: "o-que-e-slice-of-life",
    title: "O que é Slice of Life? Os Melhores Títulos",
    description: "Entenda o gênero slice of life e descubra os animes mais relaxantes e emocionantes sobre a vida cotidiana.",
    icon: "🌸",
    category: "genero",
    readTime: 5,
    tags: ["slice of life", "genero", "cotidiano", "relaxante"],
    content: `## O que é Slice of Life?

**Slice of Life** (fatia de vida) é um gênero que retrata situações cotidianas — escola, amizades, família, trabalho — sem grandes aventuras ou batalhas épicas.

### Por que assistir?
- Relaxante e reconfortante
- Personagens muito bem desenvolvidos
- Emoções autênticas e humanas
- Ótimo para descansar de animes intensos

### Os Melhores Slice of Life

#### Comédia + Escola
- **Nichijou** — O cotidiano mais absurdo e hilário já animado
- **Azumanga Daioh** — O clássico do gênero. Grupo de amigas do colégio
- **K-On!** — Meninas formam uma banda de rock. Extremamente fofo

#### Drama + Emoção
- **Clannad** — Família, amizade e amor. Faz todo mundo chorar
- **Anohana** — Saudade de infância e luto. Devastador
- **March Comes in Like a Lion** — Shogi e solidão

#### Adulto + Trabalho
- **Shirobako** — Bastidores de uma produtora de anime. Brilhante
- **Barakamon** — Calígrafo vai para ilha remota. Lindo e tranquilo
- **Yotsuba&!** — Não é anime, mas o mangá é o melhor slice of life já feito

#### Moderno e Popular
- **Spy x Family** — Família falsa com comédia e coração
- **Komi Can't Communicate** — Garota com dificuldade social quer 100 amigos`,
  },
  {
    slug: "o-que-e-mecha",
    title: "O que é Mecha? Os Melhores Animes de Robôs Gigantes",
    description: "Entenda o gênero mecha e descubra os melhores animes com robôs gigantes, desde os clássicos ao modernos.",
    icon: "🤖",
    category: "genero",
    readTime: 5,
    tags: ["mecha", "robos", "genero", "evangelion"],
    content: `## O que é Mecha?

**Mecha** (メカ) vem de "mechanical" — são animes com robôs gigantes pilotados por humanos. Um dos gêneros mais tradicionais do anime.

### Tipos de Mecha

- **Super Robot** — Robôs com poderes mágicos/absurdos (Gurren Lagann, Mazinger Z)
- **Real Robot** — Robôs com física mais realista, foco em guerra e política (Gundam)
- **Eva-type** — Mecha com temas psicológicos profundos (Evangelion)

### Os Melhores Mecha de Todos os Tempos

#### Clássicos Obrigatórios
1. **Neon Genesis Evangelion** ★ 8.5 — Redefiniu o gênero. Psicológico e filosófico
2. **Mobile Suit Gundam (original)** — O pai do real robot mecha
3. **Tengen Toppa Gurren Lagann** ★ 8.7 — O mais épico já feito. "Nunca desista"
4. **Code Geass** ★ 8.7 — Mecha + estratégia política. Brilhante

#### Modernos Imperdíveis
5. **Darling in the FranXX** ★ 7.3 — Visual lindo, pilotagem a dois
6. **86: Eighty Six** ★ 8.3 — Mecha mais emocionante dos últimos anos
7. **Aldnoah.Zero** ★ 7.5 — Terra vs Marte em guerra de mechas

#### Para Iniciantes
Comece com **Gurren Lagann** — é o mais acessível e emocionante para quem nunca assistiu mecha.`,
  },
  {
    slug: "animes-baseados-em-jogos",
    title: "Melhores Animes Baseados em Jogos e Games",
    description: "Animes inspirados em videogames, de Pokémon a Cyberpunk — lista dos melhores e onde assistir.",
    icon: "🎮",
    category: "lista",
    readTime: 5,
    tags: ["games", "jogos", "videogame", "lista"],
    content: `## Animes Baseados em Games

### Adaptações Icônicas

#### Franquias Clássicas
- **Pokémon** — O maior fenômeno de anime baseado em game da história
- **Digimon** — Rival eterno do Pokémon, com história mais profunda
- **Persona 4 / Persona 5** — Excelentes adaptações dos RPGs da Atlus
- **Tales of Zestiria** — Adaptação do RPG da Bandai Namco

#### Recentes e Elogiados
- **Cyberpunk: Edgerunners** ★ 8.7 — Baseado no game Cyberpunk 2077. Absoluta obra-prima. 10 episódios
- **Arcane** (não é anime, mas vale) — Baseado em League of Legends. Emmy award
- **Castlevania** ★ 8.4 — Baseado nos games da Konami. Violento e brilhante
- **The Witcher: Nightmare of the Wolf** — Prequel animado do game

#### Animes com Estética de Game (não baseados, mas com RPG)
- **Sword Art Online** — Presos num RPG virtual
- **Log Horizon** — Presos num MMO
- **KonoSuba** — Isekai com mecânicas de RPG`,
  },
  {
    slug: "melhores-animes-curtos-12-episodios",
    title: "Melhores Animes Curtos: 12 Episódios para Assistir Hoje",
    description: "Lista dos melhores animes com apenas 12 episódios — completos, rápidos e impactantes. Perfeitos para maratonar em um dia.",
    icon: "⚡",
    category: "lista",
    readTime: 4,
    tags: ["curto", "12 episodios", "rapido", "maratona"],
    content: `## Animes de 12 Episódios: Qualidade Máxima em Pouco Tempo

12 episódios = aproximadamente 4-5 horas de conteúdo. Você consegue terminar em um dia!

### Os Melhores de 12 Episódios

#### Para Rir
- **KonoSuba** — Grupo de incompetentes em mundo de fantasia. Hilário
- **Daily Lives of High School Boys** — Comédia absurda do cotidiano masculino
- **Sabagebu!** — Meninas em clube de airsoft. Comédia violenta e bizarra

#### Para Chorar
- **Violet Evergarden: Gaiden** — Filme spin-off emocionante
- **Anohana** — 11 episódios de pura emoção sobre amigos de infância

#### Para se Empolgar
- **One Punch Man T1** ★ 8.7 — O herói invencível mais divertido do anime
- **Mob Psycho 100 T1** ★ 8.7 — Do criador de OPM. Ainda melhor
- **Demon Slayer T1** — Os primeiros 13 episódios que mudaram a indústria

#### Para Pensar
- **Erased** ★ 8.3 — Viagem ao passado para salvar uma criança
- **The Promised Neverland T1** ★ 8.5 — Órfãos que descobrem a verdade
- **Terror in Resonance** ★ 8.0 — Dois terroristas e seus motivos

#### Sci-Fi e Cyberpunk
- **Cyberpunk: Edgerunners** ★ 8.7 — 10 episódios. O mais impactante da lista`,
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
