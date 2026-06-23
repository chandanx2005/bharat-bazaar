import { CATEGORIES } from "@/data/products";

export interface Filters {
  category: string;
  maxPrice: number;
  minRating: number;
  minDiscount: number;
  inStockOnly: boolean;
}

export const defaultFilters: Filters = {
  category: "All",
  maxPrice: 50000,
  minRating: 0,
  minDiscount: 0,
  inStockOnly: false,
};

export function ProductFilters({
  filters,
  onChange,
}: {
  filters: Filters;
  onChange: (f: Filters) => void;
}) {
  const set = (patch: Partial<Filters>) => onChange({ ...filters, ...patch });

  return (
    <aside className="space-y-6 rounded-lg border border-border bg-card p-4 text-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-foreground">Filters</h2>
        <button
          type="button"
          onClick={() => onChange(defaultFilters)}
          className="text-xs font-semibold text-brand-blue hover:underline"
        >
          Clear All
        </button>
      </div>

      <div>
        <p className="mb-2 font-semibold text-foreground">Category</p>
        <select
          value={filters.category}
          onChange={(e) => set({ category: e.target.value })}
          className="h-9 w-full rounded-md border border-border bg-background px-2 text-sm"
        >
          <option value="All">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div>
        <p className="mb-1 font-semibold text-foreground">Max Price: ₹{filters.maxPrice.toLocaleString("en-IN")}</p>
        <input
          type="range"
          min={199}
          max={50000}
          step={100}
          value={filters.maxPrice}
          onChange={(e) => set({ maxPrice: Number(e.target.value) })}
          className="w-full accent-brand-blue"
        />
      </div>

      <div>
        <p className="mb-2 font-semibold text-foreground">Customer Rating</p>
        <div className="space-y-1.5">
          {[4, 3, 2, 0].map((r) => (
            <label key={r} className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="rating"
                checked={filters.minRating === r}
                onChange={() => set({ minRating: r })}
                className="accent-brand-blue"
              />
              <span>{r === 0 ? "All ratings" : `${r}★ & above`}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 font-semibold text-foreground">Discount</p>
        <div className="space-y-1.5">
          {[0, 30, 50, 60].map((d) => (
            <label key={d} className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="discount"
                checked={filters.minDiscount === d}
                onChange={() => set({ minDiscount: d })}
                className="accent-brand-blue"
              />
              <span>{d === 0 ? "All discounts" : `${d}% or more`}</span>
            </label>
          ))}
        </div>
      </div>

      <label className="flex cursor-pointer items-center gap-2 font-semibold text-foreground">
        <input
          type="checkbox"
          checked={filters.inStockOnly}
          onChange={(e) => set({ inStockOnly: e.target.checked })}
          className="accent-brand-blue"
        />
        In stock only
      </label>
    </aside>
  );
}
