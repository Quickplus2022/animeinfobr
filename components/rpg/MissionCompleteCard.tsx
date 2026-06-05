"use client";

interface MissionCompleteCardProps {
  missionTitle: string;
  missionEmoji: string;
  partyName: string;
  playerNames: string[];
  xpReward: number;
  badgeName?: string;
  onClose: () => void;
}

export function MissionCompleteCard({ missionTitle, missionEmoji, partyName, playerNames, xpReward, badgeName, onClose }: MissionCompleteCardProps) {
  const shareText = `🏆 Minha guilda "${partyName}" concluiu a missão "${missionTitle}" no AnimeInfoBR Guilds!\n\n⚔️ Jogadores: ${playerNames.join(", ")}\n✨ +${xpReward} XP conquistados${badgeName ? `\n🏅 Badge: ${badgeName}` : ""}\n\nMonte sua guilda também → animeinfobr.com.br/guilds`;

  function shareWhatsApp() {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank");
  }

  function copyLink() {
    navigator.clipboard.writeText(shareText);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-sm bg-[#0d1424] border border-violet-500/40 rounded-2xl overflow-hidden shadow-2xl shadow-violet-900/40">
        {/* Banner */}
        <div className="bg-gradient-to-br from-violet-700 to-fuchsia-800 p-6 text-center">
          <div className="text-5xl mb-2">{missionEmoji}</div>
          <div className="text-xs text-violet-200 uppercase tracking-widest font-bold mb-1">Missão Concluída!</div>
          <div className="text-xl font-black text-white">{missionTitle}</div>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          <div className="text-center">
            <div className="text-xs text-slate-500 mb-1">Guilda</div>
            <div className="font-bold text-white text-lg">{partyName}</div>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {playerNames.map((n, i) => (
              <span key={i} className="bg-slate-800 border border-slate-700 text-slate-300 text-xs px-2.5 py-1 rounded-full">
                {n}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-center gap-6">
            <div className="text-center">
              <div className="text-2xl font-black text-emerald-400">+{xpReward}</div>
              <div className="text-xs text-slate-500">XP</div>
            </div>
            {badgeName && (
              <div className="text-center">
                <div className="text-2xl">🏅</div>
                <div className="text-xs text-amber-400 font-bold">{badgeName}</div>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="space-y-2 pt-2">
            <button onClick={shareWhatsApp}
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-3 rounded-xl transition-colors text-sm">
              📲 Compartilhar no WhatsApp
            </button>
            <button onClick={copyLink}
              className="w-full flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-bold px-4 py-3 rounded-xl transition-colors text-sm">
              📋 Copiar resultado
            </button>
            <button onClick={onClose}
              className="w-full text-slate-500 hover:text-white text-sm py-2 transition-colors">
              Fechar
            </button>
          </div>
        </div>

        <div className="pb-4 text-center text-xs text-slate-700">
          animeinfobr.com.br/guilds
        </div>
      </div>
    </div>
  );
}
