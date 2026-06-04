import { cn } from "@/lib/utils";

const GENRE_COLORS: Record<string, string> = {
  Action: "bg-red-900/40 text-red-300 border-red-800/50",
  Adventure: "bg-orange-900/40 text-orange-300 border-orange-800/50",
  Comedy: "bg-yellow-900/40 text-yellow-300 border-yellow-800/50",
  Drama: "bg-blue-900/40 text-blue-300 border-blue-800/50",
  Fantasy: "bg-violet-900/40 text-violet-300 border-violet-800/50",
  Horror: "bg-gray-900/60 text-gray-300 border-gray-700/50",
  Mystery: "bg-indigo-900/40 text-indigo-300 border-indigo-800/50",
  Romance: "bg-pink-900/40 text-pink-300 border-pink-800/50",
  "Sci-Fi": "bg-cyan-900/40 text-cyan-300 border-cyan-800/50",
  Sports: "bg-green-900/40 text-green-300 border-green-800/50",
  "Slice of Life": "bg-emerald-900/40 text-emerald-300 border-emerald-800/50",
  Supernatural: "bg-purple-900/40 text-purple-300 border-purple-800/50",
  Thriller: "bg-rose-900/40 text-rose-300 border-rose-800/50",
  Music: "bg-fuchsia-900/40 text-fuchsia-300 border-fuchsia-800/50",
  Psychological: "bg-slate-900/60 text-slate-300 border-slate-700/50",
  Ecchi: "bg-rose-900/40 text-rose-400 border-rose-800/50",
  Mecha: "bg-sky-900/40 text-sky-300 border-sky-800/50",
  Harem: "bg-pink-900/30 text-pink-400 border-pink-800/40",
};

interface BadgeProps {
  children: React.ReactNode;
  genre?: boolean;
  className?: string;
  variant?: "default" | "outline" | "solid";
}

export default function Badge({ children, genre = false, className, variant = "default" }: BadgeProps) {
  const genreStyle = genre
    ? (GENRE_COLORS[String(children)] ?? "bg-violet-900/40 text-violet-300 border-violet-800/50")
    : "";

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border",
        variant === "default" && !genre && "bg-white/10 text-slate-300 border-white/10",
        variant === "outline" && "bg-transparent text-slate-400 border-white/20",
        variant === "solid" && "bg-violet-600 text-white border-transparent",
        genre && genreStyle,
        className
      )}
    >
      {children}
    </span>
  );
}
