import type { Metadata } from "next";
import QuizClient from "./QuizClient";

export const metadata: Metadata = {
  title: "Qual Anime é Para Mim? | AnimeInfoBR",
  description: "Responda 5 perguntas rápidas e descubra qual anime combina com seu humor, tempo e gosto hoje. Sem cadastro.",
};

export default function QuizPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] hero-bg">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🎌</div>
          <h1 className="text-3xl md:text-4xl font-black font-display text-white mb-3">
            Qual Anime é Para Mim?
          </h1>
          <p className="text-slate-400 text-lg">
            Responda 5 perguntas e receba recomendações personalizadas. Sem cadastro, sem spoilers.
          </p>
        </div>
        <QuizClient />
      </div>
    </div>
  );
}
