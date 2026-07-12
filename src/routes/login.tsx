import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { LogIn, UserPlus, ShieldCheck, User as UserIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — ShopEase India" }] }),
  component: LoginPage,
});

function LoginPage() {
  const { login, signup, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (isAuthenticated) {
    navigate({ to: "/" });
  }

  const submit = (e: any) => {
    e.preventDefault();
    let ok = false;
    if (mode === "login") ok = login(email, password);
    else ok = signup(name, email, password);
    if (ok) navigate({ to: "/" });
  };

  const fill = (em: string, pw: string) => {
    setMode("login");
    setEmail(em);
    setPassword(pw);
  };

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
        <h1 className="text-xl font-bold text-foreground">
          {mode === "login" ? "Login to ShopEase" : "Create your account"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {mode === "login" ? "Welcome back! Please sign in." : "Sign up to shop and track orders."}
        </p>

        <form onSubmit={submit} className="mt-5 space-y-4">
          {mode === "signup" && (
            <div>
              <label className="mb-1 block text-sm font-medium">Full Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm"
              />
            </div>
          )}
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm"
            />
          </div>
          <button
            type="submit"
            className="flex h-11 w-full items-center justify-center gap-2 rounded-md bg-brand-blue text-sm font-bold text-primary-foreground hover:bg-brand-blue-dark"
          >
            {mode === "login" ? <LogIn className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
            {mode === "login" ? "Login" : "Create Account"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          {mode === "login" ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="font-bold text-brand-blue hover:underline"
          >
            {mode === "login" ? "Sign up" : "Login"}
          </button>
        </p>
      </div>

      <div className="mt-6 rounded-lg border border-dashed border-border bg-muted/40 p-4">
        <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Demo accounts</p>
        <div className="mt-3 grid gap-2">
          <button
            onClick={() => fill("admin@shopease.in", "admin123")}
            className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-left text-sm hover:border-brand-blue"
          >
            <ShieldCheck className="h-4 w-4 text-brand-blue" />
            <span className="font-semibold">Admin</span>
            <span className="text-muted-foreground">admin@shopease.in / admin123</span>
          </button>
          <button
            onClick={() => fill("customer@shopease.in", "customer123")}
            className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-left text-sm hover:border-brand-blue"
          >
            <UserIcon className="h-4 w-4 text-brand-blue" />
            <span className="font-semibold">Customer</span>
            <span className="text-muted-foreground">customer@shopease.in / customer123</span>
          </button>
        </div>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          <Link to="/" className="hover:underline">
            Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
