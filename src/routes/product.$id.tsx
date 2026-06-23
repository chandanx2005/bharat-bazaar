import { createFileRoute, Link, useNavigate, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Star, Truck, RotateCcw, Shield, Tag } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { QuantitySelector } from "@/components/QuantitySelector";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { getProduct, relatedProducts, discountPct, formatINR } from "@/data/products";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — ShopEase India` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: loaderData.product.name },
          { property: "og:description", content: loaderData.product.description },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [],
  }),
  component: ProductDetails,
  notFoundComponent: () => (
    <div className="py-20 text-center">
      <p className="text-lg font-semibold">Product not found</p>
      <Link to="/products" className="mt-3 inline-block text-brand-blue hover:underline">
        Browse all products
      </Link>
    </div>
  ),
});

const REVIEWS = [
  { name: "Rahul S.", rating: 5, text: "Excellent product, great value for money. Delivery was quick!" },
  { name: "Priya M.", rating: 4, text: "Good quality as described. Packaging could be better." },
  { name: "Amit K.", rating: 5, text: "Totally worth the price. Highly recommended." },
];

function ProductDetails() {
  const { product } = Route.useLoaderData();
  const { addToCart } = useCart();
  const { has, toggle } = useWishlist();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  const off = discountPct(product);
  const related = relatedProducts(product);

  const buyNow = () => {
    addToCart(product.id, qty);
    navigate({ to: "/cart" });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <nav className="mb-4 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-brand-blue">Home</Link> /{" "}
        <Link to="/products" search={{ category: product.category }} className="hover:text-brand-blue">
          {product.category}
        </Link>{" "}
        / <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Gallery */}
        <div className="lg:flex lg:gap-3">
          <div className="order-2 mt-3 flex gap-3 lg:order-1 lg:mt-0 lg:flex-col">
            {product.images.map((img: string, i: number) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveImg(i)}
                className={`h-16 w-16 overflow-hidden rounded-md border-2 ${activeImg === i ? "border-brand-blue" : "border-border"}`}
              >
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
          <div className="order-1 flex-1 lg:order-2">
            <div className="relative overflow-hidden rounded-lg border border-border bg-card">
              <img src={product.images[activeImg]} alt={product.name} className="aspect-square w-full object-cover" />
              <button
                type="button"
                onClick={() => toggle(product.id)}
                aria-label="Wishlist"
                className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-card shadow"
              >
                <Heart className={`h-5 w-5 ${has(product.id) ? "fill-destructive text-destructive" : "text-muted-foreground"}`} />
              </button>
            </div>
            <div className="mt-3 hidden gap-3 lg:flex">
              <button
                onClick={() => addToCart(product.id, qty)}
                className="h-12 flex-1 rounded-md bg-accent text-sm font-bold text-accent-foreground hover:brightness-95"
              >
                Add to Cart
              </button>
              <button
                onClick={buyNow}
                className="h-12 flex-1 rounded-md bg-brand-blue text-sm font-bold text-primary-foreground hover:bg-brand-blue-dark"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Info */}
        <div>
          <p className="text-sm font-semibold text-brand-blue">{product.brand}</p>
          <h1 className="mt-1 text-xl font-bold text-foreground sm:text-2xl">{product.name}</h1>

          <div className="mt-2 flex items-center gap-2">
            <span className="flex items-center gap-0.5 rounded bg-success px-2 py-0.5 text-xs font-bold text-primary-foreground">
              {product.rating} <Star className="h-3 w-3 fill-current" />
            </span>
            <span className="text-sm text-muted-foreground">{product.ratingCount.toLocaleString("en-IN")} ratings & reviews</span>
          </div>

          <div className="mt-4 flex flex-wrap items-baseline gap-3">
            <span className="text-3xl font-extrabold text-foreground">{formatINR(product.price)}</span>
            <span className="text-base text-muted-foreground line-through">{formatINR(product.originalPrice)}</span>
            <span className="text-base font-bold text-success">{off}% off</span>
          </div>

          {/* Offers */}
          <div className="mt-5 rounded-lg border border-border bg-card p-4">
            <h3 className="flex items-center gap-1.5 text-sm font-bold text-foreground">
              <Tag className="h-4 w-4 text-success" /> Available Offers
            </h3>
            <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
              <li>• Bank Offer: 10% off on ShopEase Pay UPI, up to ₹100</li>
              <li>• No Cost EMI available on orders above ₹3,000</li>
              <li>• Use code <span className="font-bold text-foreground">SAVE10</span> for extra 10% off at cart</li>
            </ul>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs">
            <div className="rounded-lg border border-border bg-card p-3">
              <Truck className="mx-auto h-5 w-5 text-brand-blue" />
              <p className="mt-1 font-medium">Free Delivery</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3">
              <RotateCcw className="mx-auto h-5 w-5 text-brand-blue" />
              <p className="mt-1 font-medium">7-Day Returns</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3">
              <Shield className="mx-auto h-5 w-5 text-brand-blue" />
              <p className="mt-1 font-medium">Warranty</p>
            </div>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            Delivery by <span className="font-semibold text-foreground">{deliveryDate()}</span> · Cash on Delivery available
          </p>

          <div className="mt-5 flex items-center gap-4">
            <span className="text-sm font-semibold">Quantity</span>
            <QuantitySelector qty={qty} onChange={setQty} />
          </div>

          {/* Mobile action buttons */}
          <div className="mt-5 flex gap-3 lg:hidden">
            <button
              onClick={() => addToCart(product.id, qty)}
              className="h-12 flex-1 rounded-md bg-accent text-sm font-bold text-accent-foreground"
            >
              Add to Cart
            </button>
            <button
              onClick={buyNow}
              className="h-12 flex-1 rounded-md bg-brand-blue text-sm font-bold text-primary-foreground"
            >
              Buy Now
            </button>
          </div>

          <button
            onClick={() => toggle(product.id)}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-md border border-border py-2.5 text-sm font-semibold lg:w-auto lg:px-6"
          >
            <Heart className={`h-4 w-4 ${has(product.id) ? "fill-destructive text-destructive" : ""}`} />
            {has(product.id) ? "In Wishlist" : "Add to Wishlist"}
          </button>
        </div>
      </div>

      {/* Description + specs */}
      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="text-lg font-bold text-foreground">Description</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground">Specifications</h2>
          <table className="mt-2 w-full text-sm">
            <tbody>
              {Object.entries(product.specs).map(([k, v]) => (
                <tr key={k} className="border-b border-border">
                  <td className="py-2 pr-4 font-medium text-muted-foreground">{k}</td>
                  <td className="py-2 text-foreground">{v as string}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-10">
        <h2 className="text-lg font-bold text-foreground">Customer Reviews</h2>
        <div className="mt-3 space-y-3">
          {REVIEWS.map((r) => (
            <div key={r.name} className="rounded-lg border border-border bg-card p-4">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-0.5 rounded bg-success px-1.5 py-0.5 text-xs font-bold text-primary-foreground">
                  {r.rating} <Star className="h-2.5 w-2.5 fill-current" />
                </span>
                <span className="text-sm font-semibold text-foreground">{r.name}</span>
              </div>
              <p className="mt-1.5 text-sm text-muted-foreground">{r.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-10">
          <h2 className="mb-4 text-lg font-bold text-foreground">Related Products</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function deliveryDate() {
  const d = new Date();
  d.setDate(d.getDate() + 4);
  return d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
}
