"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, XCircle, RotateCcw, Trophy } from "lucide-react";

const QUESTIONS = [
  {
    hint: "Um estudante genial encontra um caderno sobrenatural que pode matar qualquer pessoa escrevendo um nome. Ele decide usá-lo para criar um mundo sem crime.",
    options: ["Death Note", "Code Geass", "Parasyte", "Monster"],
    answer: 0,
    cover: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx1535-lawCwhzEoSBt.jpg",
    slug: "1535-death-note",
  },
  {
    hint: "Dois irmãos alquimistas partem em busca da Pedra Filosofal para recuperar seus corpos após uma transmutação proibida.",
    options: ["Naruto", "Fullmetal Alchemist", "Hunter x Hunter", "Bleach"],
    answer: 1,
    cover: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx5114-KJTQz9AIm6Wk.jpg",
    slug: "5114-fullmetal-alchemist-brotherhood",
  },
  {
    hint: "A humanidade sobrevive dentro de imensos muros para se proteger de gigantes devoradores de humanos. Um jovem jura eliminar todos eles após ver sua mãe ser comida.",
    options: ["Tokyo Ghoul", "Sword Art Online", "Attack on Titan", "Goblin Slayer"],
    answer: 2,
    cover: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx16498-73IhOXpJZiMF.jpg",
    slug: "16498-shingeki-no-kyojin",
  },
  {
    hint: "Um jovem sonha em se tornar o maior ninja da aldeia, mas carrega o segredo de ser o recipiente de uma raposa de nove caudas.",
    options: ["Bleach", "Naruto", "One Piece", "Dragon Ball"],
    answer: 1,
    cover: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx20-zvKFcpMQhIhK.jpg",
    slug: "20-naruto",
  },
  {
    hint: "Um adolescente sem superpoderes sonha em ser herói em um mundo onde 80% das pessoas nascem com poderes especiais chamados Quirks.",
    options: ["Demon Slayer", "Jujutsu Kaisen", "Bleach", "My Hero Academia"],
    answer: 3,
    cover: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx99262-qVFY5BzdIeD0.jpg",
    slug: "99262-boku-no-hero-academia",
  },
  {
    hint: "Um jovem vende sua alma a um demônio e se torna mágico de elite para vingar sua família. O demônio promete ajudá-lo a chegar ao topo.",
    options: ["Blue Exorcist", "Black Clover", "Fairy Tail", "D.Gray-man"],
    answer: 1,
    cover: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx97940-WtzMIxL31QFR.jpg",
    slug: "97940-black-clover-tv",
  },
  {
    hint: "Um rapaz que perdeu o sentido de viver encontra uma garota doente que ama tocar piano. Ela muda sua vida pela última vez.",
    options: ["Clannad", "Anohana", "Your Lie in April", "Angel Beats"],
    answer: 2,
    cover: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx20665-nHfyL0OKn0z1.jpg",
    slug: "20665-shigatsu-wa-kimi-no-uso",
  },
  {
    hint: "Jogadores ficam presos em um jogo de RPG virtual online. Morrer no jogo significa morrer na vida real.",
    options: ["Sword Art Online", ".hack//Sign", "Log Horizon", "No Game No Life"],
    answer: 0,
    cover: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx11757-HtUlrCDHN5Wb.jpg",
    slug: "11757-sword-art-online",
  },
  {
    hint: "Um jovem que quer se tornar o rei dos piratas come uma fruta do diabo que lhe dá um corpo de borracha, mas tira sua capacidade de nadar.",
    options: ["Dragon Ball Z", "One Piece", "Fairy Tail", "Rave Master"],
    answer: 1,
    cover: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21-jlAVTgFOzBN3.jpg",
    slug: "21-one-piece",
  },
  {
    hint: "Estudantes de uma escola para exorcistas aprendem a combater maldições usando energia amaldiçoada. O professor mais poderoso do mundo é a maior ameaça.",
    options: ["Bleach", "Yu Yu Hakusho", "Soul Eater", "Jujutsu Kaisen"],
    answer: 3,
    cover: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx113415-979R8ItZ0kDQ.jpg",
    slug: "113415-jujutsu-kaisen",
  },
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function GameClient() {
  const [questions] = useState(() => shuffle(QUESTIONS).slice(0, 7));
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const q = questions[current];

  function choose(idx: number) {
    if (selected !== null) return;
    setSelected(idx);
    const correct = idx === q.answer;
    if (correct) setScore(s => s + 1);
    setAnswers(a => [...a, correct]);
    setTimeout(() => {
      if (current + 1 >= questions.length) {
        setFinished(true);
      } else {
        setCurrent(c => c + 1);
        setSelected(null);
      }
    }, 1200);
  }

  const restart = useCallback(() => {
    setCurrent(0); setSelected(null); setScore(0); setFinished(false); setAnswers([]);
  }, []);

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    const msg =
      pct === 100 ? "Perfeito! Você é um verdadeiro otaku! 🏆" :
      pct >= 70 ? "Muito bem! Você conhece bastante sobre anime! 🎌" :
      pct >= 40 ? "Bom começo! Continue assistindo mais animes! 📺" :
      "Que tal assistir mais animes? 😅 Volte depois de estudar!";

    return (
      <div className="text-center">
        <div className="text-6xl mb-4">
          {pct === 100 ? "🏆" : pct >= 70 ? "🎌" : pct >= 40 ? "📺" : "😅"}
        </div>
        <h2 className="text-2xl font-black text-white mb-2">Fim de jogo!</h2>
        <p className="text-5xl font-black text-violet-400 mb-1">{score}/{questions.length}</p>
        <p className="text-slate-400 mb-2">{pct}% de acertos</p>
        <p className="text-white font-medium mb-6">{msg}</p>

        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {answers.map((a, i) => (
            <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${a ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>
              {a ? "✓" : "✗"}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <button onClick={restart}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-colors">
            <RotateCcw size={16} /> Jogar novamente
          </button>
          <Link href="/quiz" className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/15 text-white hover:bg-white/5 transition-colors">
            <Trophy size={16} /> Fazer o Quiz
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Progress */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-slate-500 text-sm">{current + 1}/{questions.length}</span>
        <div className="flex-1 h-2 bg-white/8 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-violet-600 to-cyan-500 transition-all duration-500"
            style={{ width: `${((current) / questions.length) * 100}%` }}
          />
        </div>
        <span className="text-violet-400 font-bold text-sm">{score} pts</span>
      </div>

      {/* Question */}
      <div className="bg-[#0d1424] border border-white/8 rounded-2xl p-6 mb-4">
        <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">De qual anime é essa sinopse?</p>
        <p className="text-white text-base leading-relaxed">{q.hint}</p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {q.options.map((opt, i) => {
          const isSelected = selected === i;
          const isCorrect = i === q.answer;
          const revealed = selected !== null;

          let cls = "p-4 rounded-xl border text-sm font-medium text-left transition-all ";
          if (!revealed) {
            cls += "bg-[#0d1424] border-white/10 text-slate-300 hover:border-violet-500/40 hover:text-white cursor-pointer";
          } else if (isCorrect) {
            cls += "bg-emerald-500/15 border-emerald-500/50 text-emerald-300";
          } else if (isSelected && !isCorrect) {
            cls += "bg-red-500/15 border-red-500/50 text-red-300";
          } else {
            cls += "bg-white/4 border-white/6 text-slate-500 opacity-60";
          }

          return (
            <button key={i} className={cls} onClick={() => choose(i)} disabled={revealed}>
              <div className="flex items-center gap-2">
                {revealed && isCorrect && <CheckCircle size={16} className="text-emerald-400 shrink-0" />}
                {revealed && isSelected && !isCorrect && <XCircle size={16} className="text-red-400 shrink-0" />}
                <span>{opt}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Reveal cover */}
      {selected !== null && (
        <div className="flex items-center gap-4 p-4 rounded-xl bg-[#0d1424] border border-white/8 animate-fade-in">
          <div className="relative w-16 h-20 rounded-lg overflow-hidden shrink-0">
            <Image src={q.cover} alt="capa" fill className="object-cover" sizes="64px" />
          </div>
          <div>
            <p className="text-white font-bold">{q.options[q.answer]}</p>
            <Link href={`/anime/${q.slug}`} className="text-violet-400 hover:text-violet-300 text-xs mt-1 inline-block">
              Ver página do anime →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
