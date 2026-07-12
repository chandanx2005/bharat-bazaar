import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, MapPin, CreditCard, ClipboardList } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useOrders } from "@/context/OrderContext";
import { formatINR } from "@/data/products";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — ShopEase India" }] }),
  component: CheckoutPage,
});

interface Address {
  fullName: string;
  phone: string;
  pincode: string;
  house: string;
  street: string;
  city: string;
  state: string;
  type: "Home" | "Work";
}

const emptyAddress: Address = {
  fullName: "",
  phone: "",
  pincode: "",
  house: "",
  street: "",
  city: "",
  state: "",
  type: "Home",
};

const PAYMENT_METHODS = ["Cash on Delivery", "UPI", "Debit Card", "Credit Card", "Net Banking"];

const STEPS = [
  { n: 1, label: "Delivery Address", icon: MapPin },
  { n: 2, label: "Payment Method", icon: CreditCard },
  { n: 3, label: "Order Summary", icon: ClipboardList },
];

function CheckoutPage() {
  const { items, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { placeOrder: saveOrder } = useOrders();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState<Address>(emptyAddress);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [payment, setPayment] = useState("Cash on Delivery");

  if (!isAuthenticated) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="text-xl font-bold text-foreground">Please login to checkout</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          You need an account to place an order and track it.
        </p>
        <button
          onClick={() => navigate({ to: "/login" })}
          className="mt-6 rounded-md bg-brand-blue px-6 py-2.5 text-sm font-bold text-primary-foreground hover:bg-brand-blue-dark"
        >
          Login to Continue
        </button>
      </div>
    );
  }

  const totalPrice = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const totalMRP = items.reduce((s, i) => s + i.product.originalPrice * i.qty, 0);
  const discount = totalMRP - totalPrice;
  const delivery = totalPrice >= 500 || totalPrice === 0 ? 0 : 49;
  const finalTotal = totalPrice + delivery + 5;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="text-xl font-bold">Your cart is empty</h1>
        <Link to="/products" className="mt-4 inline-block rounded-md bg-brand-blue px-6 py-2.5 text-sm font-bold text-primary-foreground">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const validateAddress = () => {
    const e: Record<string, string> = {};
    if (address.fullName.trim().length < 3) e.fullName = "Enter a valid full name";
    if (!/^[6-9]\d{9}$/.test(address.phone)) e.phone = "Enter a valid 10-digit phone number";
    if (!/^\d{6}$/.test(address.pincode)) e.pincode = "Enter a valid 6-digit pincode";
    if (!address.house.trim()) e.house = "Required";
    if (!address.street.trim()) e.street = "Required";
    if (!address.city.trim()) e.city = "Required";
    if (!address.state.trim()) e.state = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (step === 1 && !validateAddress()) return;
    setStep((s) => s + 1);
  };

  const placeOrder = () => {
    const orderId = "OD" + Math.floor(100000000 + Math.random() * 900000000);
    clearCart();
    navigate({ to: "/order-success", search: { id: orderId } });
  };

  const set = (k: keyof Address, v: string) => setAddress((a) => ({ ...a, [k]: v }));

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      {/* Stepper */}
      <div className="mb-6 flex items-center justify-between">
        {STEPS.map((s, i) => (
          <div key={s.n} className="flex flex-1 items-center">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
                  step >= s.n ? "bg-brand-blue text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {step > s.n ? <Check className="h-4 w-4" /> : s.n}
              </div>
              <span className="mt-1 hidden text-xs font-medium sm:block">{s.label}</span>
            </div>
            {i < STEPS.length - 1 && <div className={`mx-2 h-0.5 flex-1 ${step > s.n ? "bg-brand-blue" : "bg-muted"}`} />}
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="rounded-lg border border-border bg-card p-5">
          {step === 1 && (
            <div>
              <h2 className="mb-4 text-lg font-bold">Delivery Address</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full Name" value={address.fullName} onChange={(v) => set("fullName", v)} error={errors.fullName} />
                <Field label="Phone Number" value={address.phone} onChange={(v) => set("phone", v)} error={errors.phone} />
                <Field label="Pincode" value={address.pincode} onChange={(v) => set("pincode", v)} error={errors.pincode} />
                <Field label="House / Flat No." value={address.house} onChange={(v) => set("house", v)} error={errors.house} />
                <Field label="Street / Locality" value={address.street} onChange={(v) => set("street", v)} error={errors.street} className="sm:col-span-2" />
                <Field label="City" value={address.city} onChange={(v) => set("city", v)} error={errors.city} />
                <Field label="State" value={address.state} onChange={(v) => set("state", v)} error={errors.state} />
              </div>
              <div className="mt-4">
                <p className="mb-2 text-sm font-semibold">Address Type</p>
                <div className="flex gap-3">
                  {(["Home", "Work"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => set("type", t)}
                      className={`rounded-md border px-5 py-2 text-sm font-semibold ${
                        address.type === t ? "border-brand-blue bg-brand-blue/10 text-brand-blue" : "border-border"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="mb-4 text-lg font-bold">Payment Method</h2>
              <div className="space-y-2">
                {PAYMENT_METHODS.map((m) => (
                  <label
                    key={m}
                    className={`flex cursor-pointer items-center gap-3 rounded-md border p-3 text-sm font-medium ${
                      payment === m ? "border-brand-blue bg-brand-blue/10" : "border-border"
                    }`}
                  >
                    <input type="radio" name="payment" checked={payment === m} onChange={() => setPayment(m)} className="accent-brand-blue" />
                    {m}
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="mb-4 text-lg font-bold">Order Summary</h2>
              <div className="space-y-3">
                {items.map((i) => (
                  <div key={i.product.id} className="flex gap-3 border-b border-border pb-3">
                    <img src={i.product.image} alt={i.product.name} className="h-16 w-16 rounded-md object-cover" />
                    <div className="flex-1">
                      <p className="line-clamp-1 text-sm font-medium">{i.product.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {i.qty}</p>
                    </div>
                    <span className="text-sm font-bold">{formatINR(i.product.price * i.qty)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 space-y-1 text-sm">
                <SummaryRow label="Deliver to" value={`${address.fullName}, ${address.city} - ${address.pincode}`} />
                <SummaryRow label="Payment" value={payment} />
              </div>
            </div>
          )}

          <div className="mt-6 flex gap-3">
            {step > 1 && (
              <button onClick={() => setStep((s) => s - 1)} className="rounded-md border border-border px-6 py-2.5 text-sm font-semibold">
                Back
              </button>
            )}
            {step < 3 ? (
              <button onClick={next} className="rounded-md bg-brand-blue px-6 py-2.5 text-sm font-bold text-primary-foreground hover:bg-brand-blue-dark">
                Continue
              </button>
            ) : (
              <button onClick={placeOrder} className="rounded-md bg-accent px-8 py-2.5 text-sm font-bold text-accent-foreground hover:brightness-95">
                Place Order
              </button>
            )}
          </div>
        </div>

        {/* Price summary */}
        <div className="h-fit rounded-lg border border-border bg-card p-4">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted-foreground">Price Details</h2>
          <SummaryRow label="Total MRP" value={formatINR(totalMRP)} />
          <SummaryRow label="Discount" value={`- ${formatINR(discount)}`} green />
          <SummaryRow label="Delivery" value={delivery === 0 ? "FREE" : formatINR(delivery)} green={delivery === 0} />
          <SummaryRow label="Platform Fee" value={formatINR(5)} />
          <div className="my-2 border-t border-border" />
          <SummaryRow label="Total" value={formatINR(finalTotal)} bold />
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-1 block text-sm font-medium">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`h-10 w-full rounded-md border bg-background px-3 text-sm ${error ? "border-destructive" : "border-border"}`}
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function SummaryRow({ label, value, green, bold }: { label: string; value: string; green?: boolean; bold?: boolean }) {
  return (
    <div className={`flex justify-between gap-2 py-1 text-sm ${bold ? "font-bold text-foreground" : "text-muted-foreground"}`}>
      <span>{label}</span>
      <span className={`text-right ${green ? "text-success" : "text-foreground"}`}>{value}</span>
    </div>
  );
}
