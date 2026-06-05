"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/components/auth/AuthContext";
import { Trash2, Send, MessageCircle } from "lucide-react";
import AuthModal from "@/components/auth/AuthModal";

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  userName: string;
  userId: string;
}

interface Props {
  animeId: number;
  animeTitle: string;
}

function timeAgo(date: string): string {
  const diff = Date.now() - new Date(date).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "agora mesmo";
  if (m < 60) return `há ${m} min`;
  const h = Math.floor(m / 60);
  if (h < 24) return `há ${h}h`;
  const d = Math.floor(h / 24);
  return `há ${d}d`;
}

export default function AnimeComments({ animeId, animeTitle }: Props) {
  const { user: session } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [authOpen, setAuthOpen] = useState(false);
  const [fetching, setFetching] = useState(true);

  const load = useCallback(async () => {
    setFetching(true);
    const res = await fetch(`/api/anime/comments?animeId=${animeId}`);
    const data = await res.json();
    setComments(data);
    setFetching(false);
  }, [animeId]);

  useEffect(() => { load(); }, [load]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!session?.id) { setAuthOpen(true); return; }
    if (!text.trim()) return;
    setLoading(true); setError("");
    const res = await fetch("/api/anime/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ animeId, content: text }),
    });
    const data = await res.json();
    if (!res.ok) { setError(data.error); setLoading(false); return; }
    setComments(prev => [data, ...prev]);
    setText("");
    setLoading(false);
  }

  async function deleteComment(id: string) {
    await fetch(`/api/anime/comments?id=${id}`, { method: "DELETE" });
    setComments(prev => prev.filter(c => c.id !== id));
  }

  return (
    <div>
      <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <MessageCircle size={20} className="text-violet-400" />
        Comentários
        {comments.length > 0 && (
          <span className="text-xs font-normal text-slate-500">({comments.length})</span>
        )}
      </h2>

      {/* Form */}
      <div className="mb-6">
        {session ? (
          <form onSubmit={submit} className="flex flex-col gap-2">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-indigo-700 flex items-center justify-center text-white text-xs font-bold shrink-0 mt-1">
                {(session?.name || session?.email || "U")[0].toUpperCase()}
              </div>
              <textarea
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder={`O que você achou de ${animeTitle}? Compartilhe sem spoilers...`}
                maxLength={500}
                rows={3}
                className="flex-1 px-4 py-3 bg-[#0d1424] border border-white/10 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500 transition-colors resize-none"
              />
            </div>
            <div className="flex items-center justify-between ml-11">
              <span className="text-slate-600 text-xs">{text.length}/500</span>
              <div className="flex items-center gap-2">
                {error && <span className="text-red-400 text-xs">{error}</span>}
                <button type="submit" disabled={loading || !text.trim()}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-colors disabled:opacity-50">
                  <Send size={14} />
                  {loading ? "Enviando..." : "Comentar"}
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-[#0d1424] border border-white/8">
            <span className="text-slate-400 text-sm">
              <button onClick={() => setAuthOpen(true)} className="text-violet-400 hover:text-violet-300 font-medium">
                Faça login
              </button>{" "}para comentar sobre {animeTitle}.
            </span>
          </div>
        )}
      </div>

      {/* List */}
      {fetching ? (
        <div className="space-y-3">
          {[1,2,3].map(i => (
            <div key={i} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-white/8 animate-pulse shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-white/8 rounded animate-pulse w-24" />
                <div className="h-12 bg-white/5 rounded-xl animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-10 text-slate-600">
          <MessageCircle size={32} className="mx-auto mb-2 opacity-30" />
          <p className="text-sm">Nenhum comentário ainda. Seja o primeiro!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map(comment => (
            <div key={comment.id} className="flex gap-3 group">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-white text-xs font-bold shrink-0">
                {comment.userName[0].toUpperCase()}
              </div>
              <div className="flex-1 bg-[#0d1424] border border-white/8 rounded-xl px-4 py-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-white text-xs font-semibold">{comment.userName}</span>
                    <span className="text-slate-600 text-xs">{timeAgo(comment.createdAt)}</span>
                  </div>
                  {session?.id === comment.userId && (
                    <button onClick={() => deleteComment(comment.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded text-slate-600 hover:text-red-400 transition-all">
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
}
