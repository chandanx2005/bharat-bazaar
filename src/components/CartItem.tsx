import { Link } from "@tanstack/react-router";
import { Trash2, Bookmark } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { QuantitySelector } from "./QuantitySelector";
import { discountPct, formatINR, type Product } from "@/data/products";

export function CartItem({ product, qty }: { product: Product; qty: number }) {
  const { setQty, removeFromCart, saveForLater } = useCart();

  return (
    <div className="flex gap-3 rounded-lg border border-border bg-card p-3 sm:gap-4 sm:p-4">
      <Link to="/product/$id" params={{ id: product.id }} className="shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="h-24 w-24 rounded-md object-cover sm:h-28 sm:w-28"
        />
      </Link>

      <div className="flex flex-1 flex-col">
        <Link to="/product/$id" params={{ id: product.id }} className="line-clamp-2 text-sm font-medium text-foreground hover:text-brand-blue">
          {product.name}
        </Link>
        <p className="text-xs text-muted-foreground">{product.brand}</p>

        <div className="mt-1.5 flex flex-wrap items-baseline gap-2">
          <span className="text-base font-bold text-foreground">{formatINR(product.price)}</span>
          <span className="text-xs text-muted-foreground line-through">{formatINR(product.originalPrice)}</span>
          <span className="text-xs font-semibold text-success">{discountPct(product)}% off</span>
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-3">
          <QuantitySelector qty={qty} onChange={(q) => setQty(product.id, q)} size="sm" />
          <button
            type="button"
            onClick={() => saveForLater(product.id)}
            className="flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground"
          >
            <Bookmark className="h-3.5 w-3.5" /> Save for later
          </button>
          <button
            type="button"
            onClick={() => removeFromCart(product.id)}
            className="flex items-center gap-1 text-xs font-semibold text-destructive hover:underline"
          >
            <Trash2 className="h-3.5 w-3.5" /> Remove
          </button>
        </div>
      </div>
    </div>
  );
}
