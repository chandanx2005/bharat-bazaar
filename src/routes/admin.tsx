import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ShieldCheck, IndianRupee, ShoppingBag, Users } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useOrders } from "@/context/OrderContext";
import { formatINR } from "@/data/products";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — ShopEase India" }] }),
  component: AdminPage,
});

function AdminPage() {
  const { isAuthenticated, isAdmin } = useAuth();
  const { orders } = useOrders();
  const navigate = useNavigate();

  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <ShieldCheck className="mx-auto h-16 w-16 text-muted-foreground" />
        <h1 className="mt-4 text-xl font-bold text-foreground">Admin access only</h1>
        <p className="mt-1 text-sm text-muted-foreground">Login with an admin account to continue.</p>
        <button
          onClick={() => navigate({ to: "/login" })}
          className="mt-6 rounded-md bg-brand-blue px-6 py-2.5 text-sm font-bold text-primary-foreground hover:bg-brand-blue-dark"
        >
          Login
        </button>
      </div>
    );
  }

  const revenue = orders.reduce((s: number, o: any) => s + o.total, 0);
  const customers = new Set(orders.map((o: any) => o.userEmail)).size;

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <h1 className="mb-4 text-xl font-bold text-foreground">Admin Dashboard</h1>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Stat icon={ShoppingBag} label="Total Orders" value={String(orders.length)} />
        <Stat icon={IndianRupee} label="Total Revenue" value={formatINR(revenue)} />
        <Stat icon={Users} label="Customers" value={String(customers)} />
      </div>

      <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted-foreground">All Orders</h2>
      {orders.length === 0 ? (
        <p className="rounded-lg border border-border bg-card p-6 text-center text-sm text-muted-foreground">
          No orders placed yet.
        </p>
      ) : (
        <div className="space-y-3">
          {orders.map((o: any) => (
            <div key={o.id} className="rounded-lg border border-border bg-card p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-bold text-foreground">{o.id}</p>
                  <p className="text-xs text-muted-foreground">
                    {o.userName} · {o.userEmail}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-foreground">{formatINR(o.total)}</p>
                  <p className="text-xs text-muted-foreground">
                    {o.items.length} item(s) · {o.payment}
                  </p>
                </div>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {new Date(o.createdAt).toLocaleString("en-IN")} · Deliver to {o.address.city} -{" "}
                {o.address.pincode}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Stat({ icon: Icon, label, value }: any) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue/10">
          <Icon className="h-5 w-5 text-brand-blue" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-lg font-bold text-foreground">{value}</p>
        </div>
      </div>
    </div>
  );
}
