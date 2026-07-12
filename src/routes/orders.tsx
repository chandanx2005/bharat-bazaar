import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Package, ShoppingBag } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useOrders } from "@/context/OrderContext";
import { formatINR } from "@/data/products";

export const Route = createFileRoute("/orders")({
  head: () => ({ meta: [{ title: "My Orders — ShopEase India" }] }),
  component: OrdersPage,
});

function OrdersPage() {
  const { user, isAuthenticated } = useAuth();
  const { ordersFor } = useOrders();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="text-xl font-bold text-foreground">Please login to view your orders</h1>
        <button
          onClick={() => navigate({ to: "/login" })}
          className="mt-6 rounded-md bg-brand-blue px-6 py-2.5 text-sm font-bold text-primary-foreground hover:bg-brand-blue-dark"
        >
          Login
        </button>
      </div>
    );
  }

  const myOrders = ordersFor(user.email);

  if (myOrders.length === 0) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center px-4 py-20 text-center">
        <ShoppingBag className="h-16 w-16 text-muted-foreground" />
        <h1 className="mt-4 text-xl font-bold text-foreground">No orders yet</h1>
        <p className="mt-1 text-sm text-muted-foreground">Place an order to see it here.</p>
        <Link
          to="/products"
          className="mt-6 rounded-md bg-brand-blue px-6 py-2.5 text-sm font-bold text-primary-foreground hover:bg-brand-blue-dark"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <h1 className="mb-4 text-xl font-bold text-foreground">My Orders ({myOrders.length})</h1>
      <div className="space-y-4">
        {myOrders.map((o: any) => (
          <div key={o.id} className="rounded-lg border border-border bg-card p-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
              <div>
                <p className="text-sm font-bold text-foreground">Order {o.id}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(o.createdAt).toLocaleString("en-IN")}
                </p>
              </div>
              <div className="text-right">
                <span className="rounded-full bg-success/15 px-3 py-1 text-xs font-bold text-success">
                  {o.status}
                </span>
                <p className="mt-1 text-sm font-bold text-foreground">{formatINR(o.total)}</p>
              </div>
            </div>
            <div className="mt-3 space-y-2">
              {o.items.map((i: any) => (
                <div key={i.id} className="flex items-center gap-3">
                  <img src={i.image} alt={i.name} className="h-12 w-12 rounded-md object-cover" />
                  <div className="flex-1">
                    <p className="line-clamp-1 text-sm font-medium">{i.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Qty: {i.qty} · {formatINR(i.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2 rounded-md bg-muted p-2 text-xs text-muted-foreground">
              <Package className="h-4 w-4 text-brand-blue" />
              Paid via {o.payment} · Deliver to {o.address.city} - {o.address.pincode}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
