import { Minus, Plus } from "lucide-react";

export function QuantitySelector({
  qty,
  onChange,
  size = "md",
}: {
  qty: number;
  onChange: (qty: number) => void;
  size?: "sm" | "md";
}) {
  const btn =
    size === "sm"
      ? "h-7 w-7"
      : "h-9 w-9";
  return (
    <div className="inline-flex items-center rounded-md border border-border bg-card">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(1, qty - 1))}
        className={`${btn} flex items-center justify-center text-foreground transition-colors hover:bg-muted disabled:opacity-40`}
        disabled={qty <= 1}
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="min-w-9 text-center text-sm font-semibold tabular-nums">{qty}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(qty + 1)}
        className={`${btn} flex items-center justify-center text-foreground transition-colors hover:bg-muted`}
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
