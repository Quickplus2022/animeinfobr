"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useAuth } from "@/components/auth/AuthContext";

interface UserCard {
  id: string;
  name: string | null;
  username: string | null;
  avatarEmoji: string | null;
  avatarColor: string | null;
}

interface SearchResult extends UserCard {
  isFriend?: boolean;
  requestPending?: boolean;
}

interface PendingRequest {
  id: string;
  user: UserCard;
  createdAt: string;
}

interface FriendsList {
  friends: UserCard[];
  incoming: PendingRequest[];
  outgoing: PendingRequest[];
}

type Tab = "amigos" | "pendentes" | "buscar";

export default function AmigosClient() {
  const { user, loading: authLoading } = useAuth();
  const [tab, setTab] = useState<Tab>("amigos");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [data, setData] = useState<FriendsList>({ friends: [], incoming: [], outgoing: [] });
  const [searching, setSearching] = useState(false);
  const [acting, setActing] = useState<Record<string, boolean>>({});

  const loadData = useCallback(async () => {
    const res = await fetch("/api/friends/list");
    if (res.ok) setData(await res.json());
  }, []);

  useEffect(() => { if (!authLoading && user) loadData(); }, [authLoading, user, loadData]);

  useEffect(() => {
    if (query.length < 2) { setResults([]); return; }
    const t = setTimeout(async () => {
      setSearching(true);
      const res = await fetch(`/api/friends/search?q=${encodeURIComponent(query)}`);
      if (res.ok) setResults(await res.json());
      setSearching(false);
    }, 400);
    return () => clearTimeout(t);
  }, [query]);

  async function sendRequest(userId: string) {
    setActing(p => ({ ...p, [userId]: true }));
    await fetch("/api/friends/request", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ receiverId: userId }) });
    setResults(prev => prev.map(u => u.id === userId ? { ...u, requestPending: true } : u));
    setActing(p => ({ ...p, [userId]: false }));
  }

  async function respond(requestId: string, action: "accept" | "decline") {
    setActing(p => ({ ...p, [requestId]: true }));
    await fetch("/api/friends/respond", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ requestId, action }) });
    await loadData();
    setActing(p => ({ ...p, [requestId]: false }));
  }

  async function removeFriend(friendId: string) {
    setActing(p => ({ ...p, [friendId]: true }));
    await fetch("/api/friends/list", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ friendId }) });
    setData(prev => ({ ...prev, friends: prev.friends.filter(f => f.id !== friendId) }));
    setActing(p => ({ ...p, [friendId]: false }));
  }

  if (authLoading) return <div className="text-center text-slate-500 py-12">Carregando...</div>;

  if (!user) {
    return (
      <div className="text-center py-16 text-slate-400">
        <p className="mb-4">Faça login para ver e adicionar amigos.</p>
        <Link href="/login" className="text-violet-400 hover:text-violet-300 font-bold">Entrar</Link>
      </div>
    );
  }

  const pendingCount = data.incoming.length;

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-700 pb-0">
        {([
          { id: "amigos", label: `Amigos (${data.friends.length})` },
          { id: "pendentes", label: `Pendentes${pendingCount > 0 ? ` (${pendingCount})` : ""}` },
          { id: "buscar", label: "Buscar" },
        ] as { id: Tab; label: string }[]).map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
              tab === t.id ? "border-violet-500 text-violet-400" : "border-transparent text-slate-400 hover:text-white"
            }${t.id === "pendentes" && pendingCount > 0 ? " text-amber-400" : ""}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab: Amigos */}
      {tab === "amigos" && (
        <div>
          {data.friends.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-3">🤝</div>
              <p className="text-slate-400 mb-4">Ainda sem amigos. Busque otakus!</p>
              <button onClick={() => setTab("buscar")} className="text-sm text-violet-400 hover:text-violet-300">
                Buscar agora →
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {data.friends.map(f => (
                <div key={f.id} className="flex items-center justify-between bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{f.avatarEmoji ?? "🙂"}</span>
                    <div>
                      <div className="font-bold text-white text-sm">{f.name ?? f.username}</div>
                      {f.username && <div className="text-xs text-slate-400">@{f.username}</div>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {f.username && (
                      <Link href={`/u/${f.username}`} className="text-xs text-violet-400 hover:text-violet-300 px-2 py-1 rounded-lg hover:bg-violet-500/10 transition-colors">
                        Perfil
                      </Link>
                    )}
                    <button
                      onClick={() => removeFriend(f.id)}
                      disabled={acting[f.id]}
                      className="text-xs text-slate-500 hover:text-red-400 px-2 py-1 rounded-lg hover:bg-red-500/10 transition-colors disabled:opacity-40"
                    >
                      {acting[f.id] ? "..." : "Remover"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab: Pendentes */}
      {tab === "pendentes" && (
        <div className="space-y-6">
          {/* Recebidos */}
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
              Recebidos ({data.incoming.length})
            </h3>
            {data.incoming.length === 0 ? (
              <p className="text-slate-500 text-sm">Nenhuma solicitação recebida.</p>
            ) : (
              <div className="space-y-2">
                {data.incoming.map(req => (
                  <div key={req.id} className="flex items-center justify-between bg-slate-800/60 border border-amber-700/40 rounded-xl px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{req.user.avatarEmoji ?? "🙂"}</span>
                      <div>
                        <div className="font-bold text-white text-sm">{req.user.name ?? req.user.username}</div>
                        {req.user.username && <div className="text-xs text-slate-400">@{req.user.username}</div>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => respond(req.id, "accept")}
                        disabled={acting[req.id]}
                        className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg transition-colors disabled:opacity-40"
                      >
                        {acting[req.id] ? "..." : "Aceitar"}
                      </button>
                      <button
                        onClick={() => respond(req.id, "decline")}
                        disabled={acting[req.id]}
                        className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-40"
                      >
                        Recusar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Enviados */}
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
              Enviados ({data.outgoing.length})
            </h3>
            {data.outgoing.length === 0 ? (
              <p className="text-slate-500 text-sm">Nenhuma solicitação enviada.</p>
            ) : (
              <div className="space-y-2">
                {data.outgoing.map(req => (
                  <div key={req.id} className="flex items-center justify-between bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{req.user.avatarEmoji ?? "🙂"}</span>
                      <div>
                        <div className="font-bold text-white text-sm">{req.user.name ?? req.user.username}</div>
                        {req.user.username && <div className="text-xs text-slate-400">@{req.user.username}</div>}
                      </div>
                    </div>
                    <span className="text-xs text-slate-500">Aguardando...</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab: Buscar */}
      {tab === "buscar" && (
        <div>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Username ou nome do otaku..."
            autoFocus
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors mb-3"
          />

          {searching && <p className="text-slate-500 text-sm">Buscando...</p>}

          {results.length === 0 && query.length >= 2 && !searching && (
            <p className="text-slate-500 text-sm">Nenhum usuário encontrado.</p>
          )}

          {results.length > 0 && (
            <div className="space-y-2">
              {results.map(u => (
                <div key={u.id} className="flex items-center justify-between bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{u.avatarEmoji ?? "🙂"}</span>
                    <div>
                      <div className="font-bold text-white text-sm">{u.name ?? u.username}</div>
                      {u.username && <div className="text-xs text-slate-400">@{u.username}</div>}
                    </div>
                  </div>
                  {u.isFriend ? (
                    <span className="text-xs text-emerald-400 font-bold">✓ Amigos</span>
                  ) : u.requestPending ? (
                    <span className="text-xs text-slate-400">Pedido enviado</span>
                  ) : (
                    <button
                      onClick={() => sendRequest(u.id)}
                      disabled={acting[u.id]}
                      className="text-xs bg-violet-600 hover:bg-violet-500 text-white px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                    >
                      {acting[u.id] ? "..." : "+ Adicionar"}
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
