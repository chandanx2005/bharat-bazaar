import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { ProductCardSkeleton } from "@/components/Loader";
import { ProductFilters, defaultFilters, type Filters } from "@/components/ProductFilters";
import { products, discountPct } from "@/data/products";

interface ProductSearch {
  q?: string;
  category?: string;
  sort?: string;
}

export const Route = createFileRoute("/products")({
  validateSearch: (search: Record<string, unknown>): ProductSearch => ({
    q: typeof search.q === "string" ? search.q : undefined,
    category: typeof search.category === "string" ? search.category : undefined,
    sort: typeof search.sort === "string" ? search.sort : undefined,
  }),
  head: () => ({
    meta: [
      { title: "All Products — ShopEase India" },
      { name: "description", content: "Browse and filter all products on ShopEase India. Sort by price, rating and best discounts." },
    ],
  }),
  component: ProductsPage,
});

const SORTS = [
  { value: "relevance", label: "Relevance" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "new", label: "New Arrivals" },
  { value: "discount", label: "Best Discount" },
];

const PAGE_SIZE = 12;

function ProductsPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<Filters>({
    ...defaultFilters,
    category: search.category ?? "All",
  });
  const [sort, setSort] = useState(search.sort ?? "relevance");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setFilters((f) => ({ ...f, category: search.category ?? "All" }));
    if (search.sort) setSort(search.sort);
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, [search.category, search.sort, search.q]);

  const result = useMemo(() => {
    let list = products.slice();
    const q = (search.q ?? "").toLowerCase().trim();
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q),
      );
    }
    if (filters.category !== "All") list = list.filter((p) => p.category === filters.category);
    list = list.filter((p) => p.price <= filters.maxPrice);
    if (filters.minRating) list = list.filter((p) => p.rating >= filters.minRating);
    if (filters.minDiscount) list = list.filter((p) => discountPct(p) >= filters.minDiscount);
    if (filters.inStockOnly) list = list.filter((p) => p.stock > 0);

    switch (sort) {
      case "price_asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "new":
        list.sort((a, b) => Number(b.isNew) - Number(a.isNew));
        break;
      case "discount":
        list.sort((a, b) => discountPct(b) - discountPct(a));
        break;
    }
    return list;
  }, [search.q, filters, sort]);

  useEffect(() => setVisible(PAGE_SIZE), [result.length]);

  const shown = result.slice(0, visible);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-foreground">
            {search.q ? `Results for "${search.q}"` : filters.category === "All" ? "All Products" : filters.category}
          </h1>
          <p className="text-sm text-muted-foreground">{result.length} products found</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowFilters((s) => !s)}
            className="flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-2 text-sm font-semibold lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </button>
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              navigate({ to: "/products", search: { ...search, sort: e.target.value } });
            }}
            className="h-10 rounded-md border border-border bg-card px-3 text-sm font-medium"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                Sort: {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <div className={`${showFilters ? "block" : "hidden"} lg:block`}>
          <ProductFilters filters={filters} onChange={setFilters} />
        </div>

        <div>
          {loading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : result.length === 0 ? (
            <div className="rounded-lg border border-border bg-card py-20 text-center">
              <p className="text-lg font-semibold text-foreground">No products found</p>
              <p className="mt-1 text-sm text-muted-foreground">Try adjusting filters or search terms.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {shown.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
              {visible < result.length && (
                <div className="mt-8 text-center">
                  <button
                    type="button"
                    onClick={() => setVisible((v) => v + PAGE_SIZE)}
                    className="rounded-md bg-brand-blue px-8 py-2.5 text-sm font-bold text-primary-foreground hover:bg-brand-blue-dark"
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
