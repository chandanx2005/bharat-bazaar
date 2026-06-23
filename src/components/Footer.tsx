import { Link } from "@tanstack/react-router";
import { ShoppingBag, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { CATEGORIES } from "@/data/products";

export function Footer() {
  return (
    <footer className="mt-12 bg-brand-blue-dark text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-1.5">
            <ShoppingBag className="h-6 w-6 text-accent" />
            <span className="text-lg font-extrabold">ShopEase India</span>
          </div>
          <p className="mt-3 text-sm text-primary-foreground/70">
            India's friendly online store for electronics, fashion and everyday essentials at honest prices.
          </p>
          <div className="mt-4 flex gap-3">
            <Facebook className="h-5 w-5 text-primary-foreground/80 hover:text-accent" />
            <Instagram className="h-5 w-5 text-primary-foreground/80 hover:text-accent" />
            <Twitter className="h-5 w-5 text-primary-foreground/80 hover:text-accent" />
            <Youtube className="h-5 w-5 text-primary-foreground/80 hover:text-accent" />
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-accent">Shop</h3>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            {CATEGORIES.slice(0, 6).map((c) => (
              <li key={c}>
                <Link to="/products" search={{ category: c } as never} className="hover:text-accent">
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-accent">Help</h3>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li>Customer Care</li>
            <li>Track Your Order</li>
            <li>Returns & Refunds</li>
            <li>Shipping Info</li>
            <li>FAQs</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-accent">Policy</h3>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li>Privacy Policy</li>
            <li>Terms of Use</li>
            <li>Security</li>
            <li>Sitemap</li>
            <li>Grievance Redressal</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-primary-foreground/60">
        © {new Date().getFullYear()} ShopEase India. All rights reserved. Prices in ₹ INR.
      </div>
    </footer>
  );
}
