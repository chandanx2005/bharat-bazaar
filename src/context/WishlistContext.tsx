import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { products, type Product } from "@/data/products";

interface WishlistContextValue {
  ids: string[];
  items: Product[];
  count: number;
  toggle: (id: string) => void;
  remove: (id: string) => void;
  has: (id: string) => boolean;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);
const STORAGE_KEY = "shopease_wishlist";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setIds(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      /* ignore */
    }
  }, [ids]);

  const toggle = (id: string) => {
    setIds((prev) => {
      if (prev.includes(id)) {
        toast("Removed from wishlist");
        return prev.filter((x) => x !== id);
      }
      toast.success("Added to wishlist");
      return [...prev, id];
    });
  };

  const remove = (id: string) => {
    setIds((prev) => prev.filter((x) => x !== id));
    toast("Removed from wishlist");
  };

  const has = (id: string) => ids.includes(id);
  const items = ids.map((id) => products.find((p) => p.id === id)!).filter(Boolean);

  return (
    <WishlistContext.Provider value={{ ids, items, count: ids.length, toggle, remove, has }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
