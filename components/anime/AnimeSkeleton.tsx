export function AnimeCardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden bg-[#0d1424] border border-white/8">
      <div className="aspect-[2/3] skeleton" />
      <div className="p-3 space-y-2">
        <div className="h-4 skeleton rounded-md w-3/4" />
        <div className="h-3 skeleton rounded-md w-1/2" />
        <div className="flex gap-1">
          <div className="h-4 w-14 skeleton rounded-full" />
          <div className="h-4 w-16 skeleton rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function AnimeGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <AnimeCardSkeleton key={i} />
      ))}
    </div>
  );
}
