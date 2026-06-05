import type { Metadata } from "next";
import AmigosClient from "./AmigosClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Amigos | AnimeInfoBR",
  description: "Encontre otakus, envie pedidos de amizade e veja sua lista de amigos.",
};

export default function AmigosPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] hero-bg">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🤝</div>
          <h1 className="text-3xl font-black font-display text-white mb-2">Amigos</h1>
          <p className="text-slate-400">Encontre otakus pelo username ou nome de exibição.</p>
        </div>
        <AmigosClient />
      </div>
    </div>
  );
}
