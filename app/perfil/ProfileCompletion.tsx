"use client";

interface Step {
  id: string;
  label: string;
  description: string;
  done: boolean;
  points: number;
  tab: string;
  actionLabel: string;
  emoji: string;
}

interface Props {
  name: boolean;
  username: boolean;
  bio: boolean;
  avatar: boolean;
  testDone: boolean;
  favoriteAnime: boolean;
  slotFilled: boolean;
  onGoToTab: (tab: string) => void;
}

export default function ProfileCompletion({
  name, username, bio, avatar, testDone, favoriteAnime, slotFilled, onGoToTab,
}: Props) {
  const steps: Step[] = [
    { id: "name", label: "Nome de exibição", description: "Como outros usuários vão te ver.", done: name, points: 10, tab: "edit", actionLabel: "Adicionar nome", emoji: "👤" },
    { id: "avatar", label: "Avatar personalizado", description: "Emoji ou foto que representa você.", done: avatar, points: 15, tab: "edit", actionLabel: "Escolher avatar", emoji: "🎨" },
    { id: "username", label: "Username único (@)", description: "Seu endereço público no AnimeInfoBR.", done: username, points: 15, tab: "edit", actionLabel: "Criar username", emoji: "🔗" },
    { id: "bio", label: "Biografia", description: "Fale sobre você em poucas palavras.", done: bio, points: 20, tab: "edit", actionLabel: "Escrever bio", emoji: "✍️" },
    { id: "favorite", label: "Anime favorito", description: "Qual anime marcou sua vida?", done: favoriteAnime, points: 10, tab: "edit", actionLabel: "Adicionar favorito", emoji: "🎌" },
    { id: "test", label: "Teste de Personagem", description: "Descubra qual personagem você é.", done: testDone, points: 25, tab: "dna", actionLabel: "Fazer o teste", emoji: "🧬" },
    { id: "team", label: "Time de Personagens", description: "Monte seu time com seus favoritos.", done: slotFilled, points: 5, tab: "team", actionLabel: "Montar time", emoji: "🎭" },
  ];

  const earned = steps.filter(s => s.done).reduce((a, s) => a + s.points, 0);
  const total = steps.reduce((a, s) => a + s.points, 0);
  const pct = Math.round((earned / total) * 100);
  const doneCount = steps.filter(s => s.done).length;

  const nextStep = steps.find(s => !s.done);
  const completedSteps = steps.filter(s => s.done);
  const remainingSteps = steps.filter(s => !s.done);

  if (pct === 100) {
    return (
      <div className="bg-[#0d1424] rounded-2xl border border-emerald-500/30 p-5 text-center">
        <div className="text-4xl mb-2">🏆</div>
        <h3 className="text-white font-bold text-lg mb-1">Perfil completo!</h3>
        <p className="text-slate-400 text-sm">Você desbloqueou todas as conquistas do perfil.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#0d1424] rounded-2xl border border-white/8 overflow-hidden">
      {/* Header com progresso */}
      <div className="p-5 border-b border-white/8">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-white font-bold">Configure seu perfil</h3>
            <p className="text-slate-500 text-xs mt-0.5">{doneCount} de {steps.length} etapas completas</p>
          </div>
          <span className="text-2xl font-black text-violet-400">{pct}%</span>
        </div>
        <div className="h-2 bg-white/8 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-violet-600 to-cyan-500 rounded-full transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Próxima etapa em destaque */}
      {nextStep && (
        <div className="p-5 border-b border-white/8 bg-violet-500/5">
          <p className="text-violet-400 text-[10px] font-bold uppercase tracking-widest mb-3">Próxima etapa</p>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-xl shrink-0">
              {nextStep.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-sm">{nextStep.label}</p>
              <p className="text-slate-400 text-xs mt-0.5">{nextStep.description}</p>
            </div>
            <span className="text-violet-400 text-xs font-bold shrink-0">+{nextStep.points}%</span>
          </div>
          <button
            onClick={() => onGoToTab(nextStep.tab)}
            className="mt-3 w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-bold transition-colors"
          >
            {nextStep.actionLabel} →
          </button>
        </div>
      )}

      {/* Etapas restantes (exceto a próxima) */}
      {remainingSteps.length > 1 && (
        <div className="p-5 space-y-2">
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-2">Próximas etapas</p>
          {remainingSteps.slice(1).map((step) => (
            <button
              key={step.id}
              onClick={() => onGoToTab(step.tab)}
              className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/6 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all text-left"
            >
              <span className="text-lg opacity-50">{step.emoji}</span>
              <span className="text-slate-400 text-xs flex-1">{step.label}</span>
              <span className="text-slate-600 text-xs font-bold">+{step.points}%</span>
            </button>
          ))}
        </div>
      )}

      {/* Etapas completas (colapsadas) */}
      {completedSteps.length > 0 && (
        <div className="px-5 pb-4">
          <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest mb-2">Concluídas</p>
          <div className="space-y-1">
            {completedSteps.map((step) => (
              <div key={step.id} className="flex items-center gap-2 text-xs">
                <span className="text-emerald-500 text-sm">✓</span>
                <span className="text-slate-600 line-through">{step.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
