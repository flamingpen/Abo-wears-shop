import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
  color?: string;
}

interface CartContextValue {
  items: CartItem[];
  addToCart: (product: Product, color?: string) => void;
  removeFromCart: (productId: string, color?: string) => void;
  updateQuantity: (productId: string, quantity: number, color?: string) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextValue | null>(null);

const CART_KEY = "abo-wears-cart";

function sameItem(item: CartItem, productId: string, color?: string) {
  return item.product.id === productId && item.color === color;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = useCallback((product: Product, color?: string) => {
    setItems((prev) => {
      const existing = prev.find((i) => sameItem(i, product.id, color));
      if (existing) {
        return prev.map((i) =>
          sameItem(i, product.id, color) ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { product, quantity: 1, color }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string, color?: string) => {
    setItems((prev) => prev.filter((i) => !sameItem(i, productId, color)));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number, color?: string) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => !sameItem(i, productId, color)));
    } else {
      setItems((prev) =>
        prev.map((i) => sameItem(i, productId, color) ? { ...i, quantity } : i)
      );
    }
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, total, itemCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
