import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";

export function SearchBar({ className = "" }: { className?: string }) {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/products", search: { q: q.trim() || undefined } as never });
  };

  return (
    <form onSubmit={submit} className={`relative flex-1 ${className}`}>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search for products, brands and more"
        className="h-10 w-full rounded-md border border-transparent bg-card pl-10 pr-3 text-sm text-foreground shadow-sm outline-none ring-offset-background focus:border-accent focus:ring-2 focus:ring-accent"
      />
    </form>
  );
}
