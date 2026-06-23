export function Loader() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-primary" />
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="rounded-lg border border-border bg-card p-3">
      <div className="aspect-square w-full animate-pulse rounded-md bg-muted" />
      <div className="mt-3 h-4 w-3/4 animate-pulse rounded bg-muted" />
      <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-muted" />
      <div className="mt-3 h-5 w-2/3 animate-pulse rounded bg-muted" />
      <div className="mt-3 h-9 w-full animate-pulse rounded bg-muted" />
    </div>
  );
}
