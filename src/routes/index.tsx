import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { products, SUBCATEGORIES } from "@/data/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ShopEase India — Big Saving Days, Up to 70% Off" },
      { name: "description", content: "Shop top deals on electronics, mobiles, fashion, shoes and home essentials. Up to 70% off with free delivery. Prices in ₹." },
      { property: "og:title", content: "ShopEase India — Big Saving Days" },
      { property: "og:description", content: "Up to 70% off on electronics, fashion and home essentials." },
      { property: "og:image", content: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=80" },
    ],
  }),
  component: Home,
});

function Section({
  title,
  link,
  children,
}: {
  title: string;
  link?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground sm:text-xl">{title}</h2>
        {link && (
          <Link to="/products" search={{ category: link } as never} className="flex items-center gap-1 text-sm font-semibold text-brand-blue hover:underline">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

function Row({ items }: { items: typeof products }) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
      {items.map((p) => (
        <div key={p.id} className="w-44 shrink-0 sm:w-52">
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  );
}

function Grid({ items }: { items: typeof products }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

function Home() {
  const topDeals = [...products].sort((a, b) => (b.originalPrice - b.price) / b.originalPrice - (a.originalPrice - a.price) / a.originalPrice).slice(0, 8);
  const electronics = products.filter((p) => p.category === "Electronics").slice(0, 8);
  const fashion = products.filter((p) => p.category === "Fashion").slice(0, 8);
  const home = products.filter((p) => ["Home Appliances", "Fans", "Stickers"].includes(p.category)).slice(0, 8);
  const budget = products.filter((p) => p.price < 500).slice(0, 8);

  return (
    <div className="pb-8">
      {/* Hero */}
      <section className="bg-gradient-to-r from-brand-blue to-brand-blue-dark text-primary-foreground">
        <div className="mx-auto grid max-w-7xl items-center gap-6 px-4 py-10 md:grid-cols-2 md:py-14">
          <div>
            <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
              LIMITED TIME OFFER
            </span>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
              Big Saving Days
              <span className="block text-accent">Up to 70% Off</span>
            </h1>
            <p className="mt-3 max-w-md text-primary-foreground/85">
              Unbeatable deals on electronics, fashion, home essentials and more. Free delivery across India.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/products"
                className="rounded-md bg-accent px-6 py-2.5 text-sm font-bold text-accent-foreground transition hover:brightness-95"
              >
                Shop Now
              </Link>
              <Link
                to="/products"
                search={{ sort: "discount" } as never}
                className="rounded-md border border-white/40 px-6 py-2.5 text-sm font-bold text-primary-foreground transition hover:bg-white/10"
              >
                Explore Deals
              </Link>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=900&q=80"
              alt="Big Saving Days sale"
              className="h-56 w-full rounded-xl object-cover shadow-2xl sm:h-72 md:h-80"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-6">
        <h2 className="mb-4 text-lg font-bold text-foreground sm:text-xl">Shop by Category</h2>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-7">
          {SUBCATEGORIES.map((c) => (
            <Link
              key={c.label}
              to="/products"
              search={{ q: c.label } as never}
              className="group flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-3 text-center transition hover:shadow-md"
            >
              <img src={c.img} alt={c.label} className="h-16 w-16 rounded-full object-cover" />
              <span className="text-xs font-medium text-foreground">{c.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <Section title="Top Deals of the Day">
        <Row items={topDeals} />
      </Section>

      <Section title="Best Electronics" link="Electronics">
        <Grid items={electronics} />
      </Section>

      <Section title="Fashion for Men & Women" link="Fashion">
        <Grid items={fashion} />
      </Section>

      <Section title="Home Essentials" link="Home Appliances">
        <Grid items={home} />
      </Section>

      <Section title="Budget Buys Under ₹499">
        <Grid items={budget} />
      </Section>

      {/* Newsletter */}
      <section className="mx-auto mt-6 max-w-7xl px-4">
        <div className="rounded-2xl bg-brand-blue px-6 py-10 text-center text-primary-foreground">
          <h2 className="text-2xl font-bold">Never miss a deal!</h2>
          <p className="mt-2 text-primary-foreground/80">Subscribe to get the latest offers and discounts.</p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mx-auto mt-5 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="h-11 flex-1 rounded-md px-4 text-sm text-foreground outline-none"
            />
            <button className="h-11 rounded-md bg-accent px-6 text-sm font-bold text-accent-foreground hover:brightness-95">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
