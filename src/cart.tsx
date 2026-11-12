import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { FREE_SHIPPING, getProduct } from "./data";

export type CartLine = {
  productId: string;
  size: string;
  color: string;
  qty: number;
};

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  remainingForFreeShipping: number;
  drawerOpen: boolean;
  searchOpen: boolean;
  toast: string | null;
  openDrawer: () => void;
  closeDrawer: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  addLine: (line: Omit<CartLine, "qty">, qty?: number) => void;
  setQty: (index: number, qty: number) => void;
  removeLine: (index: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "grigastore-cart";

function loadLines(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (line) => line && getProduct(line.productId) && line.qty > 0 && line.size && line.color,
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() =>
    typeof window === "undefined" ? [] : loadLines(),
  );
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines]);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 2400);
    return () => window.clearTimeout(id);
  }, [toast]);

  useEffect(() => {
    const locked = drawerOpen || searchOpen;
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen, searchOpen]);

  const value = useMemo<CartContextValue>(() => {
    const subtotal = lines.reduce((sum, line) => {
      const product = getProduct(line.productId);
      return sum + (product ? product.price * line.qty : 0);
    }, 0);
    const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING ? 0 : 29;
    const count = lines.reduce((sum, line) => sum + line.qty, 0);

    return {
      lines,
      count,
      subtotal,
      shipping,
      total: subtotal + shipping,
      remainingForFreeShipping: Math.max(0, FREE_SHIPPING - subtotal),
      drawerOpen,
      searchOpen,
      toast,
      openDrawer: () => {
        setSearchOpen(false);
        setDrawerOpen(true);
      },
      closeDrawer: () => setDrawerOpen(false),
      openSearch: () => {
        setDrawerOpen(false);
        setSearchOpen(true);
      },
      closeSearch: () => setSearchOpen(false),
      addLine: (line, qty = 1) => {
        setLines((current) => {
          const index = current.findIndex(
            (item) =>
              item.productId === line.productId &&
              item.size === line.size &&
              item.color === line.color,
          );
          if (index === -1) return [...current, { ...line, qty }];
          return current.map((item, i) =>
            i === index ? { ...item, qty: item.qty + qty } : item,
          );
        });
        const product = getProduct(line.productId);
        setToast(product ? `${product.name} entrou na sacola` : "Adicionado à sacola");
        setSearchOpen(false);
        setDrawerOpen(true);
      },
      setQty: (index, qty) => {
        setLines((current) =>
          qty <= 0 ? current.filter((_, i) => i !== index) : current.map((item, i) => (i === index ? { ...item, qty } : item)),
        );
      },
      removeLine: (index) => {
        setLines((current) => current.filter((_, i) => i !== index));
      },
      clear: () => setLines([]),
    };
  }, [lines, drawerOpen, searchOpen, toast]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart deve ficar dentro de CartProvider");
  return ctx;
}
