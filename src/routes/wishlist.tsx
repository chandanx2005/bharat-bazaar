import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Trash2, Star } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { formatINR, discountPct } from "@/data/products";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Your Wishlist — ShopEase India" }] }),
  component: WishlistPage,
});

function WishlistPage() {
  const { items, remove } = useWishlist();
  const { addToCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center px-4 py-20 text-center">
        <Heart className="h-16 w-16 text-muted-foreground" />
        <h1 className="mt-4 text-xl font-bold text-foreground">Your wishlist is empty</h1>
        <p className="mt-1 text-sm text-muted-foreground">Save products you love to buy them later.</p>
        <Link to="/products" className="mt-6 rounded-md bg-brand-blue px-6 py-2.5 text-sm font-bold text-primary-foreground hover:bg-brand-blue-dark">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="mb-4 text-xl font-bold text-foreground">My Wishlist ({items.length})</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <div key={p.id} className="flex gap-3 rounded-lg border border-border bg-card p-3">
            <Link to="/product/$id" params={{ id: p.id }} className="shrink-0">
              <img src={p.image} alt={p.name} className="h-28 w-28 rounded-md object-cover" />
            </Link>
            <div className="flex flex-1 flex-col">
              <Link to="/product/$id" params={{ id: p.id }} className="line-clamp-2 text-sm font-medium hover:text-brand-blue">
                {p.name}
              </Link>
              <div className="mt-1 flex items-center gap-1">
                <span className="flex items-center gap-0.5 rounded bg-success px-1.5 py-0.5 text-[11px] font-bold text-primary-foreground">
                  {p.rating} <Star className="h-2.5 w-2.5 fill-current" />
                </span>
              </div>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-base font-bold">{formatINR(p.price)}</span>
                <span className="text-xs text-muted-foreground line-through">{formatINR(p.originalPrice)}</span>
                <span className="text-xs font-semibold text-success">{discountPct(p)}% off</span>
              </div>
              <div className="mt-auto flex gap-2 pt-2">
                <button
                  onClick={() => {
                    addToCart(p.id);
                    remove(p.id);
                  }}
                  className="flex-1 rounded-md bg-accent py-2 text-xs font-bold text-accent-foreground hover:brightness-95"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => remove(p.id)}
                  aria-label="Remove"
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-destructive hover:bg-muted"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
