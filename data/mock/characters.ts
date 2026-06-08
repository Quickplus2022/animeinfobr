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
  {
    id: "naruto", name: "Naruto Uzumaki", anime: "Naruto / Shippuden", archetype: "coracao",
    archetypeLabel: "O Herói Inabalável", age: "17 anos",
    ability: "Modo Sábio + Modo Kyuubi — poder colosseiro criado pela vontade pura",
    traits: ["Determinado", "Leal", "Emotivo", "Nunca desiste", "Inspira todos"],
    quote: "Eu nunca vou voltar atrás! Esse é meu caminho ninja!",
    description: "Cresceu sozinho, rejeitado por todos. Sua força não vem de talento, mas da recusa absoluta de desistir.",
    fameLevel: "iconic", image: "🍥", similarTo: ["Luffy (One Piece)", "Deku (MHA)"],
  },
  {
    id: "luffy", name: "Monkey D. Luffy", anime: "One Piece", archetype: "coracao",
    archetypeLabel: "O Rei Que Não Quer Poder, Só Liberdade", age: "17 anos",
    ability: "Gomu Gomu no Mi + Haki — borracha que sente o coração de todos ao redor",
    traits: ["Liberdade absoluta", "Não raciocina por cálculo", "Amigos antes de tudo", "Nunca abandona ninguém", "Muda quem encontra"],
    quote: "Não me importa ser o mais forte. Quero ser o homem mais livre!",
    description: "Nunca planejou ser o Rei dos Piratas por poder. Queria navegar com quem ama para onde quiser. Cada pessoa que o encontra sai diferente.",
    fameLevel: "iconic", image: "🏴‍☠️", similarTo: ["Naruto", "Simon (Gurren Lagann)"],
  },
  {
    id: "tanjiro", name: "Tanjiro Kamado", anime: "Demon Slayer", archetype: "coracao",
    archetypeLabel: "O Guerreiro de Coração Gentil", age: "15 anos",
    ability: "Respiração da Água + Dança do Fogo — técnicas aperfeiçoadas pela empatia",
    traits: ["Gentileza extrema", "Disciplina feroz", "Amor pela família", "Chora na batalha", "Resolve tudo com esforço"],
    quote: "Não importa quantas vezes eu caia, vou me levantar e continuar.",
    description: "Um dos raros heróis que chora diante dos inimigos e ainda assim os derrota. Gentileza e força como sinônimos.",
    fameLevel: "known", image: "🌊", similarTo: ["Naruto", "Deku (MHA)"],
  },
  {
    id: "deku", name: "Izuku Midoriya", anime: "My Hero Academia", archetype: "coracao",
    archetypeLabel: "O Herói Que Cresceu na Frente de Todos", age: "16 anos",
    ability: "One For All — poder de gerações acumulado por quem mais merecia receber",
    traits: ["Análise obsessiva", "Coração imenso", "Chora fácil", "Supera o próprio limite", "Inspiração andante"],
    quote: "Mesmo com zero por cento de chance, não posso parar de correr.",
    description: "Não nasceu com quirk. Escolheu ser herói mesmo assim. Ver ele crescer é como ver alguém aprender a acreditar em si mesmo em tempo real.",
    fameLevel: "known", image: "🌿", similarTo: ["Naruto", "Tanjiro"],
  },
  {
    id: "hinata", name: "Hinata Shoyo", anime: "Haikyuu!!", archetype: "coracao",
    archetypeLabel: "O Menor Que Alcança o Topo", age: "16 anos",
    ability: "Velocidade explosiva e pulos absurdos para alguém de baixa estatura",
    traits: ["Energia pura", "Supera limites físicos", "Inspira pelo exemplo", "Otimismo inabalável", "Faz os outros acreditarem"],
    quote: "Eu posso sempre saltar!",
    description: "Sem talento natural óbvio. Compensa com trabalho, vontade e uma alegria que contagia todo o time.",
    fameLevel: "known", image: "🏐", similarTo: ["Naruto", "Deku (MHA)"],
  },
  {
    id: "asta", name: "Asta", anime: "Black Clover", archetype: "coracao",
    archetypeLabel: "O Que Grita Até o Impossível Ser Real", age: "15 anos",
    ability: "Anti-magia — anula qualquer feitiço com espadas que só ele pode carregar",
    traits: ["Zero mana", "Volume máximo", "Determinação inegociável", "Nunca aceita limitações", "Força pela recusa de aceitar derrota"],
    quote: "Não tenho magia. Então vou superar com músculos e espírito!",
    description: "Nasceu sem uma única gota de mana num mundo que funciona 100% com magia. Compensou gritando mais alto e trabalhando mais que todo mundo.",
    fameLevel: "known", image: "⚫", similarTo: ["Naruto", "Rock Lee"],
  },
  {
    id: "simon", name: "Simon", anime: "Gurren Lagann", archetype: "coracao",
    archetypeLabel: "O Que Perfura o Impossível", age: "14 → 21 anos",
    ability: "Core Drill — perfura realidade com força de vontade pura",
    traits: ["Humilde no início", "Transição épica", "Amor como força", "Supera o mestre", "Escala infinita"],
    quote: "Quem você acha que eu sou? Eu sou Simon — eu perfuro o impossível!",
    description: "O personagem com o arco de crescimento mais épico do anime. Começa como o garoto mais medroso, termina como o ser que perfurou o espaço-tempo.",
    fameLevel: "obscure", image: "🌀", similarTo: ["Naruto", "Deku"],
  },
  {
    id: "rock_lee", name: "Rock Lee", anime: "Naruto", archetype: "coracao",
    archetypeLabel: "O Que Só Tem Suor e Coração", age: "13 anos",
    ability: "Taijutsu puro — sem ninjutsu, sem genjutsu, só físico levado ao extremo absoluto",
    traits: ["Esforço puro", "Nenhum talento natural", "Superação impossível", "Entusiasmo que constrange", "Prova viva de que vontade é suficiente"],
    quote: "Se não posso usar magia, vou ser o mais forte só com este corpo!",
    description: "Incapaz de usar as habilidades básicas do mundo ninja. Decidiu que seria o melhor do mundo no único jeito que podia. Conseguiu.",
    fameLevel: "obscure", image: "💪", similarTo: ["Hinata (Haikyuu)", "Asta"],
  },

  // ── MENTE ──
  {
    id: "light", name: "Light Yagami", anime: "Death Note", archetype: "mente",
    archetypeLabel: "O Gênio Que Se Perdeu", age: "17 → 23 anos",
    ability: "Death Note + mente que pensa 14 movimentos à frente",
    traits: ["Genial", "Vaidoso", "Manipulador", "Idealista corrompido", "Perigoso"],
    quote: "Sou Kira. Sou o deus do novo mundo.",
    description: "Queria um mundo melhor. Ficou tão fascinado com o poder que se tornou o que queria destruir.",
    fameLevel: "iconic", image: "📓", similarTo: ["Lelouch (Code Geass)", "L"],
  },
  {
    id: "l", name: "L Lawliet", anime: "Death Note", archetype: "mente",
    archetypeLabel: "O Detetive Que Pensa de Cabeça Para Baixo", age: "24 anos",
    ability: "Dedução absurda — nenhum crime no mundo sabia que ele existia antes de ser resolvido",
    traits: ["Posição estranha", "Doce como combustível", "Anonimato absoluto", "Lógica pura", "Rival à altura de qualquer gênio"],
    quote: "Kira é criança. E crianças agem por emoção. Aí está o erro.",
    description: "Resolveu todos os casos do mundo usando apenas o cérebro e açúcar. Quando apareceu, foi para acabar com o único adversário que o igualava.",
    fameLevel: "iconic", image: "🍬", similarTo: ["Light Yagami", "Ayanokoji"],
  },
  {
    id: "lelouch", name: "Lelouch vi Britannia", anime: "Code Geass", archetype: "mente",
    archetypeLabel: "O Estrategista Sacrificial", age: "17 anos",
    ability: "Geass — força qualquer pessoa a obedecer uma ordem absoluta",
    traits: ["Estratégico", "Carismático", "Sacrificial", "Orgulhoso", "Amor escondido"],
    quote: "Eu destruirei o mundo e o reconstruirei.",
    description: "Usa xadrez com vidas humanas, mas carrega o peso de cada peça. O vilão mais nobre e o herói mais trágico.",
    fameLevel: "known", image: "♟️", similarTo: ["Light Yagami", "L"],
  },
  {
    id: "shikamaru", name: "Shikamaru Nara", anime: "Naruto", archetype: "mente",
    archetypeLabel: "O Gênio Que Só Age Quando Vale a Pena", age: "12 → 16 anos",
    ability: "Sombra Paralela — imobiliza qualquer inimigo, então vence sem precisar de força",
    traits: ["IQ 200+", "Preguiça como filosofia", "Estratégia perfeita", "Leal ao clã", "Cresce quando perde alguém"],
    quote: "Que aborrecimento. Mas não posso falhar agora.",
    description: "O único ninja que o mundo sabe que é gênio e que ele mesmo finge não ser. Quando alguém que ama morre, algo nele muda para sempre.",
    fameLevel: "known", image: "☁️", similarTo: ["Ayanokoji", "L"],
  },
  {
    id: "conan", name: "Conan Edogawa", anime: "Detective Conan", archetype: "mente",
    archetypeLabel: "A Mente Que Nunca Para de Resolver", age: "7 anos (17 por dentro)",
    ability: "Cérebro de detetive adulto num corpo de criança — resolve qualquer crime em 45 minutos",
    traits: ["Observação perfeita", "Dedução imediata", "Identidade dupla", "Nunca desiste de um caso", "Cuida de todos em silêncio"],
    quote: "Há sempre uma verdade por trás de tudo. Só preciso encontrá-la.",
    description: "Tem 17 anos de mente presa num corpo de 7. Já resolveu mais de mil casos enquanto finge ser uma criança normal. O maior caso da sua vida ainda é o mais pessoal.",
    fameLevel: "known", image: "🔍", similarTo: ["L", "Shikamaru"],
  },
  {
    id: "ayanokoji", name: "Ayanokoji Kiyotaka", anime: "Classroom of the Elite", archetype: "mente",
    archetypeLabel: "O Gênio Invisível", age: "16 anos",
    ability: "Inteligência oculta absoluta — parece mediano por escolha própria",
    traits: ["Calculista", "Inexpressivo", "Manipulação silenciosa", "Observador total", "Sem ego aparente"],
    quote: "Não existe ato completamente altruísta. Tudo tem uma motivação.",
    description: "Não quer ser o número um. Quer ser o jogador invisível que move todos os outros sem que percebam.",
    fameLevel: "obscure", image: "🎯", similarTo: ["Light Yagami", "Shikamaru"],
  },
  {
    id: "near", name: "Near", anime: "Death Note", archetype: "mente",
    archetypeLabel: "O Sucessor Que Superou o Impossível", age: "15 anos",
    ability: "Análise sistêmica fria — organiza o mundo como bonecos numa guerra de tabuleiro",
    traits: ["Frio e calculista", "Brinca com bonecos enquanto pensa", "Sem emoções aparentes", "Nunca subestima ninguém", "Herdeiro do impossível"],
    quote: "L era incompleto. Combinei Mello e eu para completar o que faltava.",
    description: "Cresceu na sombra de um lendário que nunca derrotou Kira. Calmo onde L era intenso. Usou exatamente esse contraste para vencer.",
    fameLevel: "obscure", image: "🎎", similarTo: ["L", "Ayanokoji"],
  },
  {
    id: "gojo", name: "Gojo Satoru", anime: "Jujutsu Kaisen", archetype: "mente",
    archetypeLabel: "O Gênio Que Sabe Que É Gênio", age: "28 anos",
    ability: "Infinito + Domínio Ilimitado — literalmente o ser mais poderoso do universo mágico",
    traits: ["Confiança absoluta", "Humor constante", "Genialmente perigoso", "Protege os fracos", "Desafia sistemas"],
    quote: "Quer dizer que você é o mais forte? Ah, que difícil ser eu.",
    description: "Único personagem do gênero que sabe exatamente quão poderoso é e usa isso para proteger, não oprimir.",
    fameLevel: "obscure", image: "👁️", similarTo: ["Lelouch", "L"],
  },

  // ── FORÇA ──
  {
    id: "levi", name: "Levi Ackerman", anime: "Attack on Titan", archetype: "forca",
    archetypeLabel: "O Guerreiro Sem Igual", age: "30+ anos",
    ability: "Poder Ackerman — reflexos e força sobre-humanos + maestria de espadas duplas",
    traits: ["Frio", "Disciplinado", "Leal até a morte", "Carrega os mortos", "Curto e direto"],
    quote: "Não tenha arrependimentos. Qualquer escolha que você fizer, jure até o fim.",
    description: "Cresceu nas profundezas do submundo. Aprendeu que sobrevivência exige perfeição absoluta.",
    fameLevel: "iconic", image: "⚔️", similarTo: ["Zoro (One Piece)", "Mikasa"],
  },
  {
    id: "zoro", name: "Roronoa Zoro", anime: "One Piece", archetype: "forca",
    archetypeLabel: "O Único Destino É Ser o Melhor Espadachim", age: "19 anos",
    ability: "Estilo Três Espadas — terceira espada na boca, dois braços, um único objetivo",
    traits: ["Determinação lendária", "Orgulho inabalável", "Nunca pede socorro", "Carrega dor sem reclamar", "Lealdade absoluta ao capitão"],
    quote: "Não vou morrer aqui. E nunca mais perderei novamente.",
    description: "Prometeu ao único rival que morreu antes deles lutarem que seria o melhor do mundo. Todo corte, toda derrota, toda cicatriz é pra honrar isso.",
    fameLevel: "iconic", image: "🗡️", similarTo: ["Levi (AoT)", "Escanor"],
  },
  {
    id: "mikasa", name: "Mikasa Ackerman", anime: "Attack on Titan", archetype: "forca",
    archetypeLabel: "A Força Que Existe Para Proteger", age: "15 → 19 anos",
    ability: "Poder Ackerman ativo + maestria absoluta de lâminas — a maior soldado humana da era",
    traits: ["Proteção como razão de existir", "Controle emocional absoluto", "Mais forte que todos", "Amor não expresso mas total", "Carrega perdas em silêncio"],
    quote: "Esse mundo é cruel. E por isso, também é muito belo.",
    description: "Nasceu para proteger uma única pessoa. Tornou-se a soldado mais poderosa da humanidade como consequência, não como objetivo.",
    fameLevel: "known", image: "🌸", similarTo: ["Levi (AoT)", "Killua"],
  },
  {
    id: "killua", name: "Killua Zoldyck", anime: "Hunter x Hunter", archetype: "forca",
    archetypeLabel: "O Assassino Que Escolheu Ser Mais", age: "12 anos",
    ability: "Nen de Transmutação — converte energia vital em eletricidade pura",
    traits: ["Instinto assassino", "Leal ao amigo", "Autocrítico extremo", "Humor seco", "Evolução constante"],
    quote: "A velocidade que supera os reflexos não pode ser esquivada.",
    description: "Nasceu para matar. Escolheu sentir. Cada capítulo com Gon é alguém treinado para não ter sentimentos descobrindo o que é ter um amigo.",
    fameLevel: "known", image: "⚡", similarTo: ["Levi (AoT)", "Mikasa"],
  },
  {
    id: "inosuke", name: "Inosuke Hashibira", anime: "Demon Slayer", archetype: "forca",
    archetypeLabel: "A Besta Que Aprende a Ser Mais", age: "15 anos",
    ability: "Respiração da Besta — instinto puro transformado em técnica única criada por ele mesmo",
    traits: ["Selvagem por natureza", "Criado por javalis", "Orgulho absurdo", "Crescimento inesperado", "No fundo só quer se sentir forte"],
    quote: "Eu, Inosuke Hashibira, nunca vou perder!",
    description: "Cresceu literalmente na floresta com javalis. Não sabia o que é família até encontrar uma sem querer. O personagem mais selvagem com o arco interno mais surpreendente.",
    fameLevel: "known", image: "🐗", similarTo: ["Asta (Black Clover)", "Naruto"],
  },
  {
    id: "eren", name: "Eren Yeager", anime: "Attack on Titan", archetype: "forca",
    archetypeLabel: "O Que Nunca Parou de Correr", age: "15 → 19 anos",
    ability: "Titã Fundador + Titã de Ataque — poder sobre todos os Titãs",
    traits: ["Intensidade extrema", "Liberdade acima de tudo", "Rupturas morais", "Evolução perturbadora", "Contradição viva"],
    quote: "Eu não paro de correr. Continuo avançando.",
    description: "O personagem mais divisivo da geração. Começa como herói arquetípico e termina como algo que você precisará de semanas para processar.",
    fameLevel: "known", image: "🔥", similarTo: ["Naruto (fase sombria)", "Simon"],
  },
  {
    id: "escanor", name: "Escanor", anime: "Seven Deadly Sins", archetype: "forca",
    archetypeLabel: "O Poderoso Que Carrega Solidão", age: "40 anos",
    ability: "Sunshine — ao meio-dia é literalmente o ser mais poderoso do mundo",
    traits: ["Humilde à noite", "Arrogante ao meio-dia", "Amor não correspondido", "Força que isola", "Tragicamente belo"],
    quote: "Quem decidiu que eu não posso ganhar? Sou eu quem decide isso.",
    description: "De dia: o ser mais poderoso do universo. À noite: um homem envergonhado que nunca se achou digno de amor.",
    fameLevel: "obscure", image: "☀️", similarTo: ["Zoro (One Piece)", "Saitama"],
  },
  {
    id: "saitama", name: "Saitama", anime: "One Punch Man", archetype: "forca",
    archetypeLabel: "O Mais Forte Que Perdeu o Propósito", age: "25 anos",
    ability: "Poder absoluto — nenhum inimigo sobrevive a um único soco",
    traits: ["Força além de qualquer escala", "Tédio existencial", "Simplicidade radical", "Imune a drama", "Procura um rival que aguente mais que um round"],
    quote: "Fui herói por hobby. Mas deixou de ser divertido.",
    description: "Treinou tanto que perdeu o cabelo e também o único motivo para lutar: a emoção de uma batalha real. Tem poder ilimitado e o vazio de não ter mais nada a superar.",
    fameLevel: "obscure", image: "👊", similarTo: ["Escanor", "Mob (Mob Psycho 100)"],
  },

  // ── ESPÍRITO ──
  {
    id: "edward", name: "Edward Elric", anime: "Fullmetal Alchemist: Brotherhood", archetype: "espirito",
    archetypeLabel: "O Alquimista Que Quebrou as Leis Para Consertar o Erro", age: "15 → 16 anos",
    ability: "Alquimia sem círculo — transmuta sem traçado porque pagou o preço máximo pela sabedoria",
    traits: ["Inteligência raivosa", "Culpa como motor", "Ciência e magia como uma coisa só", "Arrogância com coração", "Cresce mais que qualquer outro"],
    quote: "A humanidade não pode ganhar nada sem primeiro dar algo em troca.",
    description: "Cometeu o erro mais proibido da alquimia por amor ao irmão. Perdeu um braço e uma perna. Passou anos viajando não por glória, mas para consertar o que quebrou.",
    fameLevel: "iconic", image: "⚗️", similarTo: ["Senku (Dr. Stone)", "Okabe (Steins;Gate)"],
  },
  {
    id: "senku", name: "Senku Ishigami", anime: "Dr. Stone", archetype: "espirito",
    archetypeLabel: "O Cientista Que Reconstrói o Mundo", age: "15 anos",
    ability: "Gênio científico com memória de todo conhecimento humano",
    traits: ["Lógico", "Excêntrico", "Entusiasmado", "Ciência como magia", "Nunca para de planejar"],
    quote: "Dez bilhões por cento seguro!",
    description: "Para Senku toda pergunta tem resposta e toda resposta leva a uma nova pergunta. O entusiasmo sobre reações químicas é mais contagiante que qualquer emoção.",
    fameLevel: "known", image: "🧪", similarTo: ["Edward Elric (FMA)", "Okabe (Steins;Gate)"],
  },
  {
    id: "frieren", name: "Frieren", anime: "Frieren: Beyond Journey's End", archetype: "espirito",
    archetypeLabel: "A Que Aprendeu a Sentir o Tempo", age: "Mais de 1000 anos",
    ability: "Magia acumulada por milênios — poder de quem aprendeu enquanto todos ao redor envelheciam",
    traits: ["Aparência etérea", "Introspecção profunda", "Tempo diferente", "Aprendendo tardio sobre humanidade", "Saudade como motor"],
    quote: "Eu simplesmente não conseguia entender os humanos. Agora quero.",
    description: "Viu seus companheiros envelhecerem e morrerem enquanto ela permanecia a mesma. Seu arco é sobre aprender a sentir antes que seja tarde demais.",
    fameLevel: "known", image: "🌸", similarTo: ["Ginko (Mushishi)", "Violet Evergarden"],
  },
  {
    id: "natsume", name: "Natsume Takashi", anime: "Natsume Yuujinchou", archetype: "espirito",
    archetypeLabel: "O Que Vive Entre Dois Mundos", age: "15 anos",
    ability: "Herdar o Livro de Amigos — ver e devolver nomes de espíritos que a avó capturou",
    traits: ["Solidão antiga", "Gentileza involuntária", "Cresceu sem pertencer", "Cria laços com o invisível", "Encontrou família no impossível"],
    quote: "Passei a vida evitando tudo. Agora não quero mais fazer isso.",
    description: "Passou a infância vendo criaturas que ninguém acredita existirem. Aprendeu a se isolar para não machucar ninguém. Então o livro da avó chegou e mudou tudo.",
    fameLevel: "known", image: "🌙", similarTo: ["Ginko (Mushishi)", "Frieren"],
  },
  {
    id: "okabe", name: "Rintarou Okabe", anime: "Steins;Gate", archetype: "espirito",
    archetypeLabel: "O Viajante Que Carrega Tudo", age: "18 anos",
    ability: "Reading Steiner — único que mantém memórias ao mudar linha do tempo",
    traits: ["Teatral", "Ansioso por dentro", "Genialmente louco", "Carrega sacrifícios", "Vive entre linhas do tempo"],
    quote: "Sou um cientista louco! El Psy Kongroo.",
    description: "Faz pose de vilão para esconder que é o homem mais sensível do universo. Viu quem ama morrer centenas de vezes e continuou tentando.",
    fameLevel: "known", image: "📡", similarTo: ["Senku (Dr. Stone)", "Edward Elric"],
  },
  {
    id: "oreki", name: "Houtarou Oreki", anime: "Hyouka", archetype: "espirito",
    archetypeLabel: "O Gênio Que Prefere a Sombra", age: "16 anos",
    ability: "Dedução intuitiva — resolve qualquer mistério sem querer, por pura lógica involuntária",
    traits: ["Conservação de energia como filosofia", "Analisa tudo sem esforço", "Descobre mais do que quer", "Muda lentamente mas para sempre", "Curiosidade relutante"],
    quote: "Se não for necessário fazer, não faço. Se precisar, faço rápido.",
    description: "Decidiu gastar o mínimo de energia possível em tudo. Então entrou no clube de literatura e uma garota fez perguntas impossíveis que ele não conseguiu não responder.",
    fameLevel: "obscure", image: "🌹", similarTo: ["Shikamaru (Naruto)", "Ayanokoji"],
  },
  {
    id: "ginko", name: "Ginko", anime: "Mushishi", archetype: "espirito",
    archetypeLabel: "O Observador Eterno", age: "Adulto",
    ability: "Sentido especial para Mushi — criaturas entre vida e energia que ninguém mais vê",
    traits: ["Calmo absoluto", "Sem apego", "Observador", "Sábio sem arrogância", "Caminha entre mundos"],
    quote: "Os Mushi existem simplesmente para existir. Como todos nós.",
    description: "Não luta. Não grita. Não tem objetivo grandioso. Apenas caminha, observa e ajuda. O mais zen da animação japonesa.",
    fameLevel: "obscure", image: "🌿", similarTo: ["Natsume Takashi", "Frieren"],
  },
  {
    id: "lain", name: "Lain Iwakura", anime: "Serial Experiments Lain", archetype: "espirito",
    archetypeLabel: "A Que Existe Entre o Digital e o Real", age: "14 anos",
    ability: "Ser da Wired — existe em múltiplas camadas de realidade simultaneamente",
    traits: ["Identidade fragmentada", "Existe onde a rede existe", "Questiona o que é real", "Consciência como código", "Além da compreensão convencional"],
    quote: "Não importa onde você esteja. Todo mundo está conectado.",
    description: "Não sabe se é humana ou dado. Habita o espaço entre o mundo físico e a rede digital. Seus pensamentos sobre identidade anteciparam a era das redes sociais em décadas.",
    fameLevel: "obscure", image: "🖥️", similarTo: ["Ginko (Mushishi)", "Frieren"],
  },

  // ── CONEXÃO ──
  {
    id: "violet", name: "Violet Evergarden", anime: "Violet Evergarden", archetype: "conexao",
    archetypeLabel: "A Que Aprendeu a Sentir", age: "14 → 18 anos",
    ability: "Digitadora Auto-Memory Doll — escreve cartas que capturam emoções com perfeição",
    traits: ["Aprende a sentir", "Literalmente fria no início", "Cartas que mudam vidas", "Amor como missão", "Crescimento lento e belo"],
    quote: "Quero entender o significado das palavras 'eu te amo'.",
    description: "Criada como arma. Aprendeu que a palavra mais poderosa que existe é 'eu te amo'. Humanidade aprendida através das emoções dos outros.",
    fameLevel: "known", image: "💌", similarTo: ["Tohru Honda (Fruits Basket)", "Shouko Nishimiya"],
  },
  {
    id: "shouko", name: "Shouko Nishimiya", anime: "A Silent Voice", archetype: "conexao",
    archetypeLabel: "A Que Sobreviveu e Ainda Assim Escolheu Amor", age: "16 anos",
    ability: "Linguagem de sinais — comunicação que ensina ao mundo a ouvir o que não faz barulho",
    traits: ["Surdez como perspectiva única", "Perdão que dói mais que ódio", "Sobreviveu ao que destrói maiores", "Gentileza que constrange", "Amor que não pede nada de volta"],
    quote: "Obrigada por existir.",
    description: "Sobreviveu a bullying extremo. O que mais impressiona não é a dor, mas que ainda escolheu amar as pessoas com toda a força que tinha.",
    fameLevel: "known", image: "🤟", similarTo: ["Tohru Honda (Fruits Basket)", "Violet Evergarden"],
  },
  {
    id: "gon", name: "Gon Freecss", anime: "Hunter x Hunter", archetype: "conexao",
    archetypeLabel: "O Puro Que Vê Todos", age: "12 anos",
    ability: "Nen de Reforço — poder de vida concentrado, a forma mais pura de Nen",
    traits: ["Puro", "Intuitivo", "Caça amizades", "Surpreendente", "Lado sombrio ativado pela perda"],
    quote: "Se você decidiu ser meu amigo, é para sempre.",
    description: "A pureza de Gon faz todos ao redor quererem protegê-lo. Quando ele quebra — quando perde quem ama — você entende que pureza sem limites também pode aterrorizar.",
    fameLevel: "known", image: "🎣", similarTo: ["Naruto", "Luffy"],
  },
  {
    id: "emilia", name: "Emilia", anime: "Re:Zero", archetype: "conexao",
    archetypeLabel: "A Que Continua Mesmo Sem Ser Acreditada", age: "≈115 anos (aparência jovem)",
    ability: "Magia de gelo + capacidade de se reconstruir cada vez que o mundo derruba",
    traits: ["Ingenuidade como escolha", "Perseverança sem reconhecimento", "Amor sem condição", "Supera o passado aos poucos", "Força suave que surpreende"],
    quote: "Mesmo que ninguém acredite em mim, vou continuar acreditando em mim mesma.",
    description: "O mundo inteiro a rejeita. Ela continua. Não por teimosia, mas porque acredita que pessoas podem ser melhores — inclusive ela mesma.",
    fameLevel: "known", image: "❄️", similarTo: ["Tohru Honda", "Violet Evergarden"],
  },
  {
    id: "mob", name: "Mob / Shigeo Kageyama", anime: "Mob Psycho 100", archetype: "conexao",
    archetypeLabel: "O Poder Contido Pela Gentileza", age: "14 anos",
    ability: "Poder psíquico ilimitado — suprime porque acredita que sentimentos valem mais",
    traits: ["Poder absurdo", "Autocontrole extremo", "Humildade genuína", "Emoções como explosões", "Só quer ser normal"],
    quote: "Não quero usar meus poderes para resolver tudo. Quero crescer como pessoa.",
    description: "Tem poder suficiente para destruir o planeta. Escolhe usá-lo o mínimo possível porque acredita que emoções e conexões são mais valiosas que força.",
    fameLevel: "known", image: "💫", similarTo: ["Saitama (One Punch Man)", "Tanjiro"],
  },
  {
    id: "tsuyu", name: "Tsuyu Asui", anime: "My Hero Academia", archetype: "conexao",
    archetypeLabel: "A Que Diz o Que Ninguém Tem Coragem de Falar", age: "15 anos",
    ability: "Quirk Sapo — reflexos, língua, agilidade e camuflagem. Perfeito para salvar todos sem fazer barulho",
    traits: ["Honestidade radical", "Calma que estabiliza", "Nunca deixa ninguém para trás", "Diz a verdade com cuidado", "Irmã de todos"],
    quote: "Quero ser heroína de resgate. Salvar vidas sem que ninguém se machuque.",
    description: "Num mundo de personalidades explosivas, ela é a constante. Quando todo mundo está em pânico, Tsuyu já está resolvendo. E quando precisa falar uma verdade difícil, ela fala com gentileza.",
    fameLevel: "known", image: "🐸", similarTo: ["Gon (HxH)", "Mob"],
  },
  {
    id: "tohru", name: "Tohru Honda", anime: "Fruits Basket", archetype: "conexao",
    archetypeLabel: "A Que Cura Só Existindo", age: "16 anos",
    ability: "Empatia absoluta — vê o bem em qualquer pessoa mesmo nas mais quebradas",
    traits: ["Bondade sem limites", "Nunca guarda rancor", "Cura traumas", "Força silenciosa", "Amor incondicional"],
    quote: "Só de você existir, minha vida fica cheia.",
    description: "Não tem poder de luta. Cura as pessoas simplesmente sendo quem é. Uma família inteira de pessoas quebradas encontrou forma humana através dela.",
    fameLevel: "obscure", image: "🌸", similarTo: ["Violet Evergarden", "Shouko Nishimiya"],
  },
  {
    id: "winry", name: "Winry Rockbell", anime: "Fullmetal Alchemist: Brotherhood", archetype: "conexao",
    archetypeLabel: "A Ancora Que Mantém os Heróis no Chão", age: "15 → 16 anos",
    ability: "Automail — cria e repara membros mecânicos com precisão que nenhum outro engenheiro tem",
    traits: ["Suporte como superpoder", "Força sem precisar lutar", "Amor que espera sem exigir", "Raiva honesta", "Cresce enquanto espera"],
    quote: "Posso não lutar como você. Mas posso consertar você toda vez que cair.",
    description: "Não vai ao campo de batalha. Fica em casa e faz o herói poder continuar existindo. O tipo de personagem que a maioria subestima até entender que ninguém sobreviveria sem ela.",
    fameLevel: "obscure", image: "🔧", similarTo: ["Tohru Honda", "Emilia (Re:Zero)"],
  },
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
  // ── Motivação e Propósito ──
  {
    id: "motivation", question: "O que te move acima de tudo?", emoji: "🔥",
    options: [
      { label: "Proteger quem amo, custe o que custar", scores: { coracao: 3, conexao: 1 } },
      { label: "Alcançar meu objetivo com precisão total", scores: { mente: 3, forca: 1 } },
      { label: "Ser o melhor na minha arte, sem exceção", scores: { forca: 3, mente: 1 } },
      { label: "Entender o porquê de tudo existir", scores: { espirito: 3, mente: 1 } },
    ],
  },
  {
    id: "scenario", question: "Qual cenário te representa melhor?", emoji: "🌌",
    options: [
      { label: "Superar o impossível sozinho pelo que acredito", scores: { coracao: 2, forca: 1 } },
      { label: "Mover as peças do tabuleiro enquanto ninguém percebe", scores: { mente: 3 } },
      { label: "Descobrir verdades escondidas sobre a existência", scores: { espirito: 3 } },
      { label: "Ser a razão pela qual alguém não desistiu", scores: { conexao: 3 } },
    ],
  },
  {
    id: "legacy", question: "O que você quer deixar para o mundo?", emoji: "🌟",
    options: [
      { label: "A prova de que perseverança supera tudo", scores: { coracao: 2, forca: 1 } },
      { label: "Um sistema melhor do que o que encontrei", scores: { mente: 3 } },
      { label: "A memória de quem foi verdadeiro consigo mesmo", scores: { espirito: 2, conexao: 1 } },
      { label: "A sensação em alguém de que foi amado de verdade", scores: { conexao: 2, coracao: 1 } },
    ],
  },

  // ── Comportamento e Método ──
  {
    id: "problem", question: "Como você resolve um problema difícil?", emoji: "🧩",
    options: [
      { label: "Enfrento de frente com tudo que tenho", scores: { coracao: 2, forca: 1 } },
      { label: "Planejo cada detalhe antes de agir", scores: { mente: 3 } },
      { label: "Treino até dominar a situação", scores: { forca: 2, coracao: 1 } },
      { label: "Observo e entendo antes de qualquer coisa", scores: { espirito: 2, mente: 1 } },
    ],
  },
  {
    id: "pressure", question: "Sob pressão extrema, você:", emoji: "⚡",
    options: [
      { label: "Fica mais focado — a adrenalina me ajuda", scores: { forca: 2, coracao: 1 } },
      { label: "Analisa frio, sem deixar a emoção interferir", scores: { mente: 3 } },
      { label: "Recorre a quem ama para não cair", scores: { conexao: 2, coracao: 1 } },
      { label: "Desacelera e busca entender o padrão oculto", scores: { espirito: 3 } },
    ],
  },
  {
    id: "rules", question: "Sobre regras e sistemas:", emoji: "⚖️",
    options: [
      { label: "Sigo meu código. Regras externas são secundárias", scores: { coracao: 2, espirito: 1 } },
      { label: "Uso as regras quando me convém — são ferramentas", scores: { mente: 3 } },
      { label: "Respeito a estrutura — ela existe por razão", scores: { forca: 2, mente: 1 } },
      { label: "Conexões humanas vêm antes das regras", scores: { conexao: 2, coracao: 1 } },
    ],
  },

  // ── Em Grupo e Relacionamentos ──
  {
    id: "group", question: "Em grupo, você costuma:", emoji: "👥",
    options: [
      { label: "Liderar pelo exemplo e pela energia que trago", scores: { coracao: 2, conexao: 1 } },
      { label: "Planejar nos bastidores silenciosamente", scores: { mente: 2, espirito: 1 } },
      { label: "Executar com excelência técnica", scores: { forca: 2 } },
      { label: "Conectar as pessoas e resolver conflitos", scores: { conexao: 3 } },
    ],
  },
  {
    id: "communication", question: "Como você costuma se expressar?", emoji: "💬",
    options: [
      { label: "Com intensidade — digo tudo na hora que sinto", scores: { coracao: 3 } },
      { label: "Com precisão — escolho cada palavra com cuidado", scores: { mente: 3 } },
      { label: "Pela ação — mostro mais do que falo", scores: { forca: 2, mente: 1 } },
      { label: "Ouvindo muito antes de falar", scores: { espirito: 2, conexao: 1 } },
    ],
  },
  {
    id: "bonds", question: "Para você, uma amizade profunda significa:", emoji: "🤝",
    options: [
      { label: "Alguém pelo qual você daria a vida sem pensar", scores: { coracao: 3 } },
      { label: "Alguém que te desafia e te faz crescer", scores: { mente: 2, forca: 1 } },
      { label: "Alguém que te conhece mas não depende de você", scores: { espirito: 2 } },
      { label: "Alguém com quem você é completamente você mesmo", scores: { conexao: 3 } },
    ],
  },

  // ── Autoconhecimento ──
  {
    id: "strength", question: "Sua maior força segundo você mesmo:", emoji: "💪",
    options: [
      { label: "Minha vontade nunca quebra", scores: { coracao: 3 } },
      { label: "Minha inteligência estratégica", scores: { mente: 3 } },
      { label: "Minha disciplina e domínio técnico", scores: { forca: 3 } },
      { label: "Minha capacidade de entender as pessoas", scores: { conexao: 2, espirito: 1 } },
    ],
  },
  {
    id: "defeat", question: "Quando você perde, sua reação é:", emoji: "💢",
    options: [
      { label: "Fico mais determinado. Ninguém vai me deter", scores: { coracao: 3 } },
      { label: "Analiso o erro e refaço o plano completo", scores: { mente: 2, espirito: 1 } },
      { label: "Processo em silêncio e volto mais forte", scores: { forca: 2, mente: 1 } },
      { label: "Busco apoio e supero junto com alguém", scores: { conexao: 3 } },
    ],
  },
  {
    id: "flaw", question: "Seu lado mais sombrio seria:", emoji: "🌑",
    options: [
      { label: "Teimosia que vira obstinação cega", scores: { coracao: 3 } },
      { label: "Frieza que os outros interpretam como arrogância", scores: { mente: 2, espirito: 1 } },
      { label: "Obsessão com performance que ignora sentimentos alheios", scores: { forca: 2, mente: 1 } },
      { label: "Dependência emocional que me paralisa quando perco alguém", scores: { conexao: 3 } },
    ],
  },
  {
    id: "fear", question: "O que mais te assusta no fundo?", emoji: "😨",
    options: [
      { label: "Não conseguir proteger quem amo", scores: { coracao: 2, conexao: 1 } },
      { label: "Perder o controle e cometer um erro irreparável", scores: { mente: 2, forca: 1 } },
      { label: "Não ser suficientemente forte quando precisar", scores: { forca: 2, coracao: 1 } },
      { label: "Nunca encontrar o verdadeiro propósito", scores: { espirito: 2, conexao: 1 } },
    ],
  },

  // ── Visão de Mundo ──
  {
    id: "power", question: "Se pudesse ter qualquer habilidade, escolheria:", emoji: "✨",
    options: [
      { label: "Sentir o que todos sentem — empatia e intuição totais", scores: { conexao: 3 } },
      { label: "Prever o futuro e calcular qualquer resultado", scores: { mente: 3 } },
      { label: "Força física perfeita e reflexos ilimitados", scores: { forca: 3 } },
      { label: "Entender a origem e o significado de tudo que existe", scores: { espirito: 3 } },
    ],
  },
  {
    id: "ideal", question: "Seu mundo ideal seria:", emoji: "🌍",
    options: [
      { label: "Um lugar onde lutar pelo que acredita tem sentido real", scores: { coracao: 2, forca: 1 } },
      { label: "Uma sociedade regida pela lógica, mérito e ordem", scores: { mente: 2, espirito: 1 } },
      { label: "Um mundo onde conexões duram para sempre", scores: { conexao: 2, coracao: 1 } },
      { label: "Um universo com mistérios infinitos para explorar", scores: { espirito: 2, mente: 1 } },
    ],
  },
];

export function getCharacterResult(scores: ArchetypeScore): {
  primary: AnimeCharacter;
  medium: AnimeCharacter;
  hidden: AnimeCharacter;
  ally: AnimeCharacter;
  rival: AnimeCharacter;
  shadow: AnimeCharacter;
  wild: AnimeCharacter;
  archetype: Archetype;
  archetypeLabel: string;
  dna: AnimeDNA;
} {
  const sorted = (Object.entries(scores) as [Archetype, number][]).sort((a, b) => b[1] - a[1]);
  const topArchetype = sorted[0][0];
  const secondArchetype = sorted[1][0];
  const thirdArchetype = sorted[2][0];
  const fourthArchetype = sorted[3][0];
  const shadowArchetype = SHADOW_MAP[topArchetype];

  const pool = CHARACTERS.filter((c) => c.archetype === topArchetype);
  const primary = pool.find((c) => c.fameLevel === "iconic") ?? pool[0];
  const medium = pool.find((c) => c.fameLevel === "known") ?? pool[1] ?? primary;
  const hidden = pool.find((c) => c.fameLevel === "obscure") ?? pool[2] ?? medium;

  const rivalPool = CHARACTERS.filter((c) => c.archetype === secondArchetype);
  const rival = rivalPool.find((c) => c.fameLevel === "iconic") ?? rivalPool.find((c) => c.fameLevel === "known") ?? rivalPool[0] ?? primary;

  const allyPool = CHARACTERS.filter((c) => c.archetype === thirdArchetype);
  const ally = allyPool.find((c) => c.fameLevel === "known") ?? allyPool.find((c) => c.fameLevel === "iconic") ?? allyPool[0] ?? medium;

  const shadowPool = CHARACTERS.filter((c) => c.archetype === shadowArchetype);
  const shadow = shadowPool.find((c) => c.fameLevel === "known") ?? shadowPool[0] ?? medium;

  const wildPool = CHARACTERS.filter((c) => c.archetype === fourthArchetype);
  const wild = wildPool.find((c) => c.fameLevel === "obscure") ?? wildPool[wildPool.length - 1] ?? hidden;

  const archetypeLabels: Record<Archetype, string> = {
    coracao: "Coração — O Herói que Sente",
    mente: "Mente — O Estrategista Calculista",
    forca: "Força — O Guerreiro Disciplinado",
    espirito: "Espírito — O Observador Curioso",
    conexao: "Conexão — O Que Une as Pessoas",
  };

  const dna = calculateDNA(scores);

  return { primary, medium, hidden, ally, rival, shadow, wild, archetype: topArchetype, archetypeLabel: archetypeLabels[topArchetype], dna };
}
