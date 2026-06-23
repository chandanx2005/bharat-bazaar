import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { products, type Product } from "@/data/products";

export interface CartLine {
  id: string;
  qty: number;
  savedForLater?: boolean;
}

interface CartContextValue {
  lines: CartLine[];
  items: { product: Product; qty: number }[];
  savedItems: { product: Product; qty: number }[];
  count: number;
  addToCart: (id: string, qty?: number) => void;
  removeFromCart: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  saveForLater: (id: string) => void;
  moveToCart: (id: string) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "shopease_cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines]);

  const hydrate = (ls: CartLine[]) =>
    ls
      .map((l) => ({ product: products.find((p) => p.id === l.id)!, qty: l.qty, saved: l.savedForLater }))
      .filter((x) => x.product);

  const items = hydrate(lines).filter((x) => !x.saved).map(({ product, qty }) => ({ product, qty }));
  const savedItems = hydrate(lines).filter((x) => x.saved).map(({ product, qty }) => ({ product, qty }));

  const addToCart = (id: string, qty = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.id === id);
      if (existing) {
        return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + qty, savedForLater: false } : l));
      }
      return [...prev, { id, qty }];
    });
    toast.success("Added to cart");
  };

  const removeFromCart = (id: string) => {
    setLines((prev) => prev.filter((l) => l.id !== id));
    toast("Removed from cart");
  };

  const setQty = (id: string, qty: number) => {
    if (qty < 1) return;
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, qty } : l)));
  };

  const saveForLater = (id: string) =>
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, savedForLater: true } : l)));

  const moveToCart = (id: string) =>
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, savedForLater: false } : l)));

  const clearCart = () => setLines([]);

  const isInCart = (id: string) => lines.some((l) => l.id === id && !l.savedForLater);

  const count = items.reduce((s, i) => s + i.qty, 0);

  return (
    <CartContext.Provider
      value={{ lines, items, savedItems, count, addToCart, removeFromCart, setQty, saveForLater, moveToCart, clearCart, isInCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
