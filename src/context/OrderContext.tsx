import { createContext, useContext, useEffect, useState } from "react";

// Fake orders saved to localStorage. Customers see their own; admin sees all.
const OrderContext = createContext(null);
const STORAGE_KEY = "shopease_orders";

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setOrders(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    } catch {
      /* ignore */
    }
  }, [orders]);

  // create a fake order and return its id
  const placeOrder = ({ userEmail, userName, items, address, payment, total }) => {
    const id = "OD" + Math.floor(100000000 + Math.random() * 900000000);
    const order = {
      id,
      userEmail,
      userName,
      items: items.map((i) => ({
        id: i.product.id,
        name: i.product.name,
        image: i.product.image,
        price: i.product.price,
        qty: i.qty,
      })),
      address,
      payment,
      total,
      status: "Confirmed",
      createdAt: new Date().toISOString(),
    };
    setOrders((prev) => [order, ...prev]);
    return id;
  };

  const ordersFor = (email) => orders.filter((o) => o.userEmail === email);

  return (
    <OrderContext.Provider value={{ orders, placeOrder, ordersFor }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used within OrderProvider");
  return ctx;
}
