import { Link } from "@tanstack/react-router";
import { Heart, Star, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { discountPct, formatINR, type Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { has, toggle } = useWishlist();
  const wished = has(product.id);
  const off = discountPct(product);

  return (
    <div className="group relative flex flex-col rounded-lg border border-border bg-card p-3 transition-shadow hover:shadow-lg">
      <button
        type="button"
        aria-label="Toggle wishlist"
        onClick={() => toggle(product.id)}
        className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-card/90 shadow-sm transition-colors hover:bg-muted"
      >
        <Heart className={`h-4 w-4 ${wished ? "fill-destructive text-destructive" : "text-muted-foreground"}`} />
      </button>

      <Link to="/product/$id" params={{ id: product.id }} className="block">
        <div className="relative aspect-square overflow-hidden rounded-md bg-muted">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {product.isNew && (
            <span className="absolute left-2 top-2 rounded bg-brand-blue px-1.5 py-0.5 text-[10px] font-bold uppercase text-primary-foreground">
              New
            </span>
          )}
        </div>
        <h3 className="mt-3 line-clamp-2 text-sm font-medium text-foreground">{product.name}</h3>
        <p className="mt-0.5 text-xs text-muted-foreground">{product.brand}</p>

        <div className="mt-1.5 flex items-center gap-1.5">
          <span className="flex items-center gap-0.5 rounded bg-success px-1.5 py-0.5 text-[11px] font-bold text-primary-foreground">
            {product.rating} <Star className="h-2.5 w-2.5 fill-current" />
          </span>
          <span className="text-xs text-muted-foreground">({product.ratingCount.toLocaleString("en-IN")})</span>
        </div>

        <div className="mt-2 flex flex-wrap items-baseline gap-1.5">
          <span className="text-base font-bold text-foreground">{formatINR(product.price)}</span>
          <span className="text-xs text-muted-foreground line-through">{formatINR(product.originalPrice)}</span>
          <span className="text-xs font-semibold text-success">{off}% off</span>
        </div>

        <p className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground">
          <Truck className="h-3 w-3" /> Free delivery
        </p>
      </Link>

      <button
        type="button"
        onClick={() => addToCart(product.id)}
        className="mt-3 h-9 rounded-md bg-accent text-sm font-semibold text-accent-foreground transition-colors hover:brightness-95"
      >
        Add to Cart
      </button>
    </div>
  );
}
