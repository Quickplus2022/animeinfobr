"use client";

interface Step { label: string; done: boolean; points: number; }

interface Props {
  name: boolean; username: boolean; bio: boolean;
  avatar: boolean; testDone: boolean; favoriteAnime: boolean; slotFilled: boolean;
}

export default function ProfileCompletion({ name, username, bio, avatar, testDone, favoriteAnime, slotFilled }: Props) {
  const steps: Step[] = [
    { label: "Nome de exibição", done: name, points: 10 },
    { label: "Username único (@)", done: username, points: 15 },
    { label: "Biografia", done: bio, points: 20 },
    { label: "Avatar personalizado", done: avatar, points: 15 },
    { label: "Teste de personagem", done: testDone, points: 25 },
    { label: "Anime favorito", done: favoriteAnime, points: 10 },
    { label: "Time de personagens", done: slotFilled, points: 5 },
  ];

  const earned = steps.filter(s => s.done).reduce((a, s) => a + s.points, 0);
  const total = steps.reduce((a, s) => a + s.points, 0);
  const pct = Math.round((earned / total) * 100);

  const emoji = pct === 100 ? "🏆" : pct >= 70 ? "🎌" : pct >= 40 ? "🌱" : "📋";

  return (
    <div className="bg-[#0d1424] rounded-2xl border border-white/8 p-5">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg">{emoji}</span>
        <h3 className="text-white font-bold">Perfil {pct}% completo</h3>
      </div>
      <div className="h-2 bg-white/8 rounded-full overflow-hidden mb-4">
        <div className="h-full bg-gradient-to-r from-violet-600 to-cyan-500 rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
      </div>
      <div className="space-y-1.5">
        {steps.map((step) => (
          <div key={step.label} className="flex items-center gap-2 text-xs">
            <span className={step.done ? "text-emerald-400" : "text-slate-600"}>
              {step.done ? "✓" : "○"}
            </span>
            <span className={step.done ? "text-slate-400 line-through" : "text-slate-300"}>{step.label}</span>
            {!step.done && <span className="ml-auto text-violet-500 font-bold">+{step.points}%</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
