import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ShoppingCart, Tag } from "lucide-react";
import { toast } from "sonner";
import { CartItem } from "@/components/CartItem";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/data/products";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Cart — ShopEase India" }] }),
  component: CartPage,
});

const DELIVERY_FREE_ABOVE = 500;
const PLATFORM_FEE = 5;

function CartPage() {
  const { items, savedItems, moveToCart, removeFromCart } = useCart();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState(false);

  const totalMRP = items.reduce((s, i) => s + i.product.originalPrice * i.qty, 0);
  const totalPrice = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const productDiscount = totalMRP - totalPrice;
  const delivery = totalPrice >= DELIVERY_FREE_ABOVE || totalPrice === 0 ? 0 : 49;
  const couponDiscount = applied ? Math.round(totalPrice * 0.1) : 0;
  const platformFee = items.length ? PLATFORM_FEE : 0;
  const finalTotal = totalPrice - couponDiscount + delivery + platformFee;
  const totalSavings = productDiscount + couponDiscount + (delivery === 0 && totalPrice > 0 ? 49 : 0);

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "SAVE10") {
      setApplied(true);
      toast.success("Coupon SAVE10 applied — 10% off!");
    } else {
      toast.error("Invalid coupon code");
    }
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center px-4 py-20 text-center">
        <ShoppingCart className="h-16 w-16 text-muted-foreground" />
        <h1 className="mt-4 text-xl font-bold text-foreground">Your cart is empty</h1>
        <p className="mt-1 text-sm text-muted-foreground">Add some products to get started.</p>
        <Link to="/products" className="mt-6 rounded-md bg-brand-blue px-6 py-2.5 text-sm font-bold text-primary-foreground hover:bg-brand-blue-dark">
          Continue Shopping
        </Link>

        {savedItems.length > 0 && <SavedSection items={savedItems} moveToCart={moveToCart} removeFromCart={removeFromCart} />}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="mb-4 text-xl font-bold text-foreground">My Cart ({items.length})</h1>
      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-3">
          {items.map((i) => (
            <CartItem key={i.product.id} product={i.product} qty={i.qty} />
          ))}
          {savedItems.length > 0 && <SavedSection items={savedItems} moveToCart={moveToCart} removeFromCart={removeFromCart} />}
        </div>

        <div className="h-fit space-y-4 lg:sticky lg:top-32">
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Enter coupon (try SAVE10)"
                  className="h-10 w-full rounded-md border border-border bg-background pl-9 pr-3 text-sm"
                />
              </div>
              <button onClick={applyCoupon} className="rounded-md bg-brand-blue px-4 text-sm font-bold text-primary-foreground hover:bg-brand-blue-dark">
                Apply
              </button>
            </div>
            {applied && <p className="mt-2 text-xs font-semibold text-success">SAVE10 applied successfully!</p>}
          </div>

          <div className="rounded-lg border border-border bg-card p-4">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted-foreground">Price Details</h2>
            <Row label={`Total MRP`} value={formatINR(totalMRP)} />
            <Row label="Discount on MRP" value={`- ${formatINR(productDiscount)}`} positive />
            {applied && <Row label="Coupon (SAVE10)" value={`- ${formatINR(couponDiscount)}`} positive />}
            <Row label="Delivery Charges" value={delivery === 0 ? "FREE" : formatINR(delivery)} positive={delivery === 0} />
            <Row label="Platform Fee" value={formatINR(platformFee)} />
            <div className="my-2 border-t border-border" />
            <Row label="Total Amount" value={formatINR(finalTotal)} bold />
            {totalSavings > 0 && (
              <p className="mt-2 rounded bg-success/10 px-2 py-1.5 text-xs font-bold text-success">
                You will save {formatINR(totalSavings)} on this order
              </p>
            )}
            <button
              onClick={() => navigate({ to: "/checkout" })}
              className="mt-4 h-11 w-full rounded-md bg-accent text-sm font-bold text-accent-foreground hover:brightness-95"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, positive, bold }: { label: string; value: string; positive?: boolean; bold?: boolean }) {
  return (
    <div className={`flex justify-between py-1 text-sm ${bold ? "font-bold text-foreground" : "text-muted-foreground"}`}>
      <span>{label}</span>
      <span className={positive ? "text-success" : bold ? "text-foreground" : "text-foreground"}>{value}</span>
    </div>
  );
}

function SavedSection({
  items,
  moveToCart,
  removeFromCart,
}: {
  items: { product: import("@/data/products").Product; qty: number }[];
  moveToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
}) {
  return (
    <div className="mt-4 w-full">
      <h2 className="mb-2 text-left text-sm font-bold text-foreground">Saved for Later ({items.length})</h2>
      <div className="space-y-3">
        {items.map((i) => (
          <div key={i.product.id} className="flex gap-3 rounded-lg border border-border bg-card p-3 text-left">
            <img src={i.product.image} alt={i.product.name} className="h-20 w-20 rounded-md object-cover" />
            <div className="flex flex-1 flex-col">
              <Link to="/product/$id" params={{ id: i.product.id }} className="line-clamp-2 text-sm font-medium hover:text-brand-blue">
                {i.product.name}
              </Link>
              <span className="text-sm font-bold">{formatINR(i.product.price)}</span>
              <div className="mt-auto flex gap-3 pt-2 text-xs font-semibold">
                <button onClick={() => moveToCart(i.product.id)} className="text-brand-blue hover:underline">
                  Move to Cart
                </button>
                <button onClick={() => removeFromCart(i.product.id)} className="text-destructive hover:underline">
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
