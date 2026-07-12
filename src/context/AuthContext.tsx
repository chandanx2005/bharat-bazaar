import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

// Mock users (no backend). Demo accounts + any signed-up customers.
const SEED_USERS = [
  { name: "Admin", email: "admin@shopease.in", password: "admin123", role: "admin" },
  { name: "Customer", email: "customer@shopease.in", password: "customer123", role: "customer" },
];

const AuthContext = createContext<any>(null);
const USERS_KEY = "shopease_users";
const SESSION_KEY = "shopease_session";

export function AuthProvider({ children }: any) {
  const [users, setUsers] = useState<any[]>(SEED_USERS);
  const [user, setUser] = useState<any>(null); // logged-in user (without password)

  // load persisted users + session
  useEffect(() => {
    try {
      const rawUsers = localStorage.getItem(USERS_KEY);
      if (rawUsers) {
        const parsed = JSON.parse(rawUsers);
        // always keep seed accounts available
        const merged = [...SEED_USERS];
        for (const u of parsed as any[]) {
          if (!merged.some((m) => m.email === u.email)) merged.push(u);
        }
        setUsers(merged);
      }
      const rawSession = localStorage.getItem(SESSION_KEY);
      if (rawSession) setUser(JSON.parse(rawSession));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    } catch {
      /* ignore */
    }
  }, [users]);

  const persistSession = (u: any) => {
    setUser(u);
    try {
      if (u) localStorage.setItem(SESSION_KEY, JSON.stringify(u));
      else localStorage.removeItem(SESSION_KEY);
    } catch {
      /* ignore */
    }
  };

  const login = (email: string, password: string) => {
    const found = users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password,
    );
    if (!found) {
      toast.error("Invalid email or password");
      return false;
    }
    persistSession({ name: found.name, email: found.email, role: found.role });
    toast.success(`Welcome back, ${found.name}!`);
    return true;
  };

  const signup = (name: string, email: string, password: string) => {
    const exists = users.some((u) => u.email.toLowerCase() === email.trim().toLowerCase());
    if (exists) {
      toast.error("An account with this email already exists");
      return false;
    }
    const newUser = { name: name.trim(), email: email.trim(), password, role: "customer" };
    setUsers((prev) => [...prev, newUser]);
    persistSession({ name: newUser.name, email: newUser.email, role: newUser.role });
    toast.success("Account created successfully!");
    return true;
  };

  const logout = () => {
    persistSession(null);
    toast("Logged out");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
