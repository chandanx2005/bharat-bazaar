import { Link } from "@tanstack/react-router";
import { Heart, ShoppingCart, User, Menu, ShoppingBag, LogOut, Package, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { SearchBar } from "./SearchBar";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { CATEGORIES } from "@/data/products";

function Badge({ value }: { value: number }) {
  if (!value) return null;
  return (
    <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground">
      {value}
    </span>
  );
}

export function Navbar() {
  const { count } = useCart();
  const { count: wishCount } = useWishlist();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-brand-blue text-primary-foreground shadow-md">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5 sm:gap-6">
        <Link to="/" className="flex shrink-0 items-center gap-1.5">
          <ShoppingBag className="h-6 w-6 text-accent" />
          <div className="leading-tight">
            <span className="block text-lg font-extrabold tracking-tight">ShopEase</span>
            <span className="-mt-1 block text-[10px] font-medium italic text-accent">India</span>
          </div>
        </Link>

        <div className="hidden flex-1 md:block">
          <SearchBar />
        </div>

        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          {isAuthenticated ? (
            <div className="relative hidden sm:block">
              <button
                type="button"
                onClick={() => setUserMenu((o) => !o)}
                className="flex items-center gap-1.5 text-sm font-semibold hover:text-accent"
              >
                <User className="h-5 w-5" />
                <span className="max-w-[90px] truncate">{user.name}</span>
              </button>
              {userMenu && (
                <div
                  className="absolute right-0 top-full z-50 mt-2 w-48 rounded-md border border-border bg-card py-1 text-foreground shadow-lg"
                  onMouseLeave={() => setUserMenu(false)}
                >
                  <Link
                    to="/orders"
                    onClick={() => setUserMenu(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted"
                  >
                    <Package className="h-4 w-4" /> My Orders
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setUserMenu(false)}
                      className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted"
                    >
                      <ShieldCheck className="h-4 w-4" /> Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setUserMenu(false);
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-destructive hover:bg-muted"
                  >
                    <LogOut className="h-4 w-4" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="hidden items-center gap-1.5 text-sm font-semibold hover:text-accent sm:flex">
              <User className="h-5 w-5" /> Login
            </Link>
          )}
          <Link to="/wishlist" className="relative flex items-center gap-1.5 text-sm font-semibold hover:text-accent">
            <span className="relative">
              <Heart className="h-5 w-5" />
              <Badge value={wishCount} />
            </span>
            <span className="hidden sm:inline">Wishlist</span>
          </Link>
          <Link to="/cart" className="relative flex items-center gap-1.5 text-sm font-semibold hover:text-accent">
            <span className="relative">
              <ShoppingCart className="h-5 w-5" />
              <Badge value={count} />
            </span>
            <span className="hidden sm:inline">Cart</span>
          </Link>
          <button
            type="button"
            className="md:hidden"
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </nav>
      </div>

      <div className="px-4 pb-2.5 md:hidden">
        <SearchBar />
      </div>

      <div className="border-t border-white/10 bg-brand-blue-dark">
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-2 no-scrollbar">
          {CATEGORIES.map((c) => (
            <Link
              key={c}
              to="/products"
              search={{ category: c } as never}
              className="whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium text-primary-foreground/90 transition-colors hover:bg-white/10 hover:text-accent"
            >
              {c}
            </Link>
          ))}
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-brand-blue-dark md:hidden">
          <div className="flex flex-col p-2">
            <Link to="/" className="rounded px-3 py-2 text-sm hover:bg-white/10">Home</Link>
            <Link to="/products" className="rounded px-3 py-2 text-sm hover:bg-white/10">All Products</Link>
            <Link to="/wishlist" className="rounded px-3 py-2 text-sm hover:bg-white/10">Wishlist</Link>
            <Link to="/cart" className="rounded px-3 py-2 text-sm hover:bg-white/10">Cart</Link>
            {isAuthenticated ? (
              <>
                <Link to="/orders" className="rounded px-3 py-2 text-sm hover:bg-white/10">My Orders</Link>
                {isAdmin && (
                  <Link to="/admin" className="rounded px-3 py-2 text-sm hover:bg-white/10">Admin Panel</Link>
                )}
                <button
                  onClick={() => logout()}
                  className="rounded px-3 py-2 text-left text-sm text-accent hover:bg-white/10"
                >
                  Logout ({user.name})
                </button>
              </>
            ) : (
              <Link to="/login" className="rounded px-3 py-2 text-sm hover:bg-white/10">Login / Sign up</Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
