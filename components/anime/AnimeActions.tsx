"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth/AuthContext";
import { Heart, Clock, ThumbsUp } from "lucide-react";
import AuthModal from "@/components/auth/AuthModal";

interface AnimeActionsProps {
  animeId: number;
  slug: string;
  title: string;
  cover?: string | null;
}

export default function AnimeActions({ animeId, slug, title, cover }: AnimeActionsProps) {
  const { user: session, loading: loadingAuth } = useAuth();
  const status = loadingAuth ? "loading" : session ? "authenticated" : "unauthenticated";
  const [favorited, setFavorited] = useState(false);
  const [watchLater, setWatchLater] = useState(false);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);
  const [authOpen, setAuthOpen] = useState(false);

  useEffect(() => {
    if (loadingAuth || !session) return;
    fetch(`/api/user/status?animeId=${animeId}`)
      .then(r => r.json())
      .then(d => {
        setFavorited(d.favorited);
        setWatchLater(d.watchLater);
        setLiked(d.liked);
      })
      .catch(() => {});
  }, [session, loadingAuth, animeId]);

  async function toggle(type: "favorite" | "watch-later" | "like") {
    if (!session) { setAuthOpen(true); return; }
    setLoading(type);
    try {
      const body =
        type === "like"
          ? { animeId }
          : { animeId, slug, title, cover: cover ?? null };

      const res = await fetch(`/api/user/${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (type === "favorite") setFavorited(data.favorited);
      if (type === "watch-later") setWatchLater(data.saved);
      if (type === "like") setLiked(data.liked);
    } catch {
      // ignore
    } finally {
      setLoading(null);
    }
  }

  const BTNS = [
    {
      id: "favorite" as const,
      icon: Heart,
      label: favorited ? "Favoritado" : "Favoritar",
      active: favorited,
      activeClass: "bg-rose-500/20 border-rose-500/40 text-rose-400",
      inactiveClass: "bg-white/5 border-white/12 text-slate-400 hover:border-rose-500/30 hover:text-rose-400",
      emoji: "❤️",
    },
    {
      id: "watch-later" as const,
      icon: Clock,
      label: watchLater ? "Na lista" : "Assistir depois",
      active: watchLater,
      activeClass: "bg-violet-500/20 border-violet-500/40 text-violet-400",
      inactiveClass: "bg-white/5 border-white/12 text-slate-400 hover:border-violet-500/30 hover:text-violet-400",
      emoji: "🕐",
    },
    {
      id: "like" as const,
      icon: ThumbsUp,
      label: liked ? "Curtido" : "Curtir",
      active: liked,
      activeClass: "bg-cyan-500/20 border-cyan-500/40 text-cyan-400",
      inactiveClass: "bg-white/5 border-white/12 text-slate-400 hover:border-cyan-500/30 hover:text-cyan-400",
      emoji: "👍",
    },
  ];

  if (status === "loading") {
    return <div className="flex gap-2">
      {[1,2,3].map(i => <div key={i} className="h-9 w-32 rounded-xl bg-white/5 animate-pulse" />)}
    </div>;
  }

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {BTNS.map((btn) => {
          const Icon = btn.icon;
          return (
            <button
              key={btn.id}
              onClick={() => toggle(btn.id)}
              disabled={loading === btn.id}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl border text-sm font-medium transition-all disabled:opacity-60 ${btn.active ? btn.activeClass : btn.inactiveClass}`}
              title={!session ? "Faça login para usar esta função" : btn.label}
            >
              <Icon size={15} className={btn.active ? "" : "opacity-70"} />
              {loading === btn.id ? "..." : btn.label}
              {btn.active && <span className="text-xs">{btn.emoji}</span>}
            </button>
          );
        })}
        {!session && (
          <span className="text-slate-600 text-xs self-center">
            <button onClick={() => setAuthOpen(true)} className="text-violet-400 hover:text-violet-300 underline">
              Entrar
            </button>{" "}para usar
          </span>
        )}
      </div>
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
