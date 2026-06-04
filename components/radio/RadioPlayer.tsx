"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Radio, ChevronDown, ChevronUp } from "lucide-react";

const STATIONS = [
  {
    name: "Anison.fm",
    desc: "Músicas de anime 24h",
    emoji: "🎌",
    url: "https://anison.fm/anison.m3u8",
    fallback: "https://streams.radiomast.io/anison-fm",
  },
  {
    name: "J-Pop Sakura",
    desc: "J-Pop e anime music",
    emoji: "🌸",
    url: "https://jenny.torontocast.com:8116/stream",
    fallback: "https://jenny.torontocast.com:8116/stream",
  },
  {
    name: "K-Pop Radio",
    desc: "K-Pop e K-Drama OSTs",
    emoji: "🇰🇷",
    url: "https://kpop.radioca.st/stream",
    fallback: "https://kpop.radioca.st/stream",
  },
  {
    name: "Anime OST",
    desc: "Trilhas sonoras de anime",
    emoji: "🎵",
    url: "https://radio.plaza.one/mp3",
    fallback: "https://radio.plaza.one/mp3",
  },
];

export default function RadioPlayer() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [stationIdx, setStationIdx] = useState(0);
  const [error, setError] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const station = STATIONS[stationIdx];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    audio.muted = muted;
  }, [volume, muted]);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      setError(false);
      audio.src = station.url;
      audio.load();
      audio.play().catch(() => {
        // try fallback
        audio.src = station.fallback;
        audio.load();
        audio.play().catch(() => setError(true));
      });
      setPlaying(true);
    }
  }

  function changeStation(idx: number) {
    const audio = audioRef.current;
    if (audio) { audio.pause(); audio.src = ""; }
    setStationIdx(idx);
    setPlaying(false);
    setError(false);
  }

  if (!visible) {
    return (
      <button
        onClick={() => setVisible(true)}
        className="fixed bottom-4 right-4 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold shadow-lg shadow-violet-900/50 transition-all hover:scale-105"
        title="Abrir rádio anime"
      >
        <Radio size={16} />
        <span className="hidden sm:block">Rádio Anime</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-40 w-72 rounded-2xl bg-[#0d1424] border border-violet-500/30 shadow-2xl shadow-violet-900/40 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-violet-900/60 to-indigo-900/60 border-b border-white/8">
        <div className="flex items-center gap-2">
          <Radio size={15} className="text-violet-400" />
          <span className="text-white text-sm font-bold">Rádio Anime</span>
          {playing && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setExpanded(!expanded)} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/8 transition-colors">
            {expanded ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
          </button>
          <button onClick={() => { setVisible(false); if (audioRef.current) { audioRef.current.pause(); setPlaying(false); } }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/8 transition-colors text-xs">
            ✕
          </button>
        </div>
      </div>

      {/* Current station */}
      <div className="px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{station.emoji}</span>
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-sm truncate">{station.name}</p>
            <p className="text-slate-400 text-xs">{station.desc}</p>
          </div>
          <button onClick={togglePlay}
            className="w-9 h-9 rounded-full bg-violet-600 hover:bg-violet-500 flex items-center justify-center text-white transition-all hover:scale-105 shrink-0">
            {playing ? <Pause size={16} /> : <Play size={16} />}
          </button>
        </div>

        {error && (
          <p className="text-red-400 text-xs mt-2 text-center">
            Erro ao conectar. Tente outra estação.
          </p>
        )}

        {/* Volume */}
        <div className="flex items-center gap-2 mt-3">
          <button onClick={() => setMuted(!muted)} className="text-slate-400 hover:text-white transition-colors shrink-0">
            {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
          <input type="range" min={0} max={1} step={0.05} value={muted ? 0 : volume}
            onChange={e => { setVolume(Number(e.target.value)); setMuted(false); }}
            className="flex-1 h-1 accent-violet-500 cursor-pointer"
          />
        </div>
      </div>

      {/* Station list */}
      {expanded && (
        <div className="border-t border-white/8 px-2 pb-2">
          <p className="text-slate-500 text-[10px] px-2 py-1.5 uppercase tracking-wider">Estações</p>
          {STATIONS.map((s, i) => (
            <button key={s.name} onClick={() => changeStation(i)}
              className={`w-full flex items-center gap-2.5 px-2 py-2 rounded-xl text-left transition-all ${i === stationIdx ? "bg-violet-500/20 border border-violet-500/30" : "hover:bg-white/5"}`}>
              <span className="text-lg shrink-0">{s.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-semibold truncate ${i === stationIdx ? "text-violet-300" : "text-white"}`}>{s.name}</p>
                <p className="text-slate-500 text-[10px] truncate">{s.desc}</p>
              </div>
              {i === stationIdx && playing && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />}
            </button>
          ))}
        </div>
      )}

      <audio ref={audioRef} onError={() => setError(true)} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
    </div>
  );
}
