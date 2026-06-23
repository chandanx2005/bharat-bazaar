import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { CheckCircle2, Package } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/order-success")({
  validateSearch: (s: Record<string, unknown>) => ({
    id: typeof s.id === "string" ? s.id : "OD000000000",
  }),
  head: () => ({ meta: [{ title: "Order Placed — ShopEase India" }] }),
  component: OrderSuccess,
});

function OrderSuccess() {
  const { id } = Route.useSearch();

  useEffect(() => {
    toast.success("Order placed successfully!");
  }, []);

  const delivery = new Date();
  delivery.setDate(delivery.getDate() + 5);
  const deliveryStr = delivery.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });

  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-16 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success/15">
        <CheckCircle2 className="h-12 w-12 text-success" />
      </div>
      <h1 className="mt-5 text-2xl font-bold text-foreground">Your order has been placed successfully!</h1>
      <p className="mt-2 text-sm text-muted-foreground">Thank you for shopping with ShopEase India.</p>

      <div className="mt-6 w-full rounded-lg border border-border bg-card p-5 text-left">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Order ID</span>
          <span className="text-sm font-bold text-foreground">{id}</span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Estimated Delivery</span>
          <span className="text-sm font-bold text-foreground">{deliveryStr}</span>
        </div>
        <div className="mt-4 flex items-center gap-2 rounded-md bg-muted p-3 text-xs text-muted-foreground">
          <Package className="h-4 w-4 text-brand-blue" />
          You'll receive tracking updates via SMS and email.
        </div>
      </div>

      <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row">
        <button className="h-11 flex-1 rounded-md bg-brand-blue text-sm font-bold text-primary-foreground hover:bg-brand-blue-dark">
          Track Order
        </button>
        <Link
          to="/products"
          className="flex h-11 flex-1 items-center justify-center rounded-md border border-border text-sm font-bold text-foreground hover:bg-muted"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
