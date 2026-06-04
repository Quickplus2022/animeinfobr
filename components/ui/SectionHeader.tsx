import Link from "next/link";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  className?: string;
  titleClassName?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  viewAllHref,
  viewAllLabel = "Ver todos",
  className,
  titleClassName,
}: SectionHeaderProps) {
  return (
    <div className={cn("flex items-end justify-between mb-6", className)}>
      <div>
        <h2 className={cn("text-xl md:text-2xl font-bold text-white font-display", titleClassName)}>
          {title}
        </h2>
        {subtitle && <p className="text-slate-400 text-sm mt-1">{subtitle}</p>}
      </div>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="text-sm text-violet-400 hover:text-violet-300 transition-colors font-medium shrink-0"
        >
          {viewAllLabel} →
        </Link>
      )}
    </div>
  );
}
