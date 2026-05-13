import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { PRODUCTS, CATEGORIES } from "@/data/products";
import type { Product, Category } from "@/data/products";

function mapDbProduct(p: Record<string, unknown>): Product {
  const rawColorImages = p.color_images as Record<string, unknown> | null;
  const colorImages = rawColorImages
    ? Object.fromEntries(
        Object.entries(rawColorImages).map(([k, v]) => [
          k,
          Array.isArray(v) ? (v as string[]) : [v as string],
        ])
      )
    : undefined;
  const rawImages = p.images as string[] | null;
  return {
    id: p.id as string,
    name: p.name as string,
    price: p.price as number,
    category: p.category_id as Category,
    image: p.image as string,
    images: rawImages?.length ? rawImages : undefined,
    badge: (p.badge as string) || undefined,
    colors: (p.colors as string[]) || undefined,
    colorImages,
  };
}

export function useProducts(categoryId?: string) {
  return useQuery<Product[]>({
    queryKey: ["products", categoryId ?? "all"],
    queryFn: async () => {
      try {
        let query = supabase.from("products").select("*").eq("active", true);
        if (categoryId) query = query.eq("category_id", categoryId);
        const { data, error } = await query.order("created_at", { ascending: true });
        if (error || !data || data.length === 0) throw new Error("fallback");
        return data.map(mapDbProduct);
      } catch {
        const local = categoryId
          ? PRODUCTS.filter((p) => p.category === (categoryId as Category))
          : PRODUCTS;
        return local;
      }
    },
    staleTime: 2 * 60 * 1000,
  });
}

export function useAdminProducts() {
  return useQuery<Product[]>({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []).map(mapDbProduct);
    },
    staleTime: 30 * 1000,
  });
}

export type CategoryItem = {
  id: string;
  label: string;
  icon: string;
  description: string;
  href: string;
  sort_order: number;
  active: boolean;
};

const JERSEY_SUB_IDS = new Set([
  "club-jerseys", "retro-jerseys", "country-jerseys",
  "nfl-jerseys", "basketball-jerseys", "baseball-jerseys",
]);

function categoryHref(id: string): string {
  if (JERSEY_SUB_IDS.has(id)) return `/jerseys/${id}`;
  if (id === "gloves") return "/gym-wears";
  return `/${id}`;
}

export function useCategories() {
  return useQuery<CategoryItem[]>({
    queryKey: ["categories"],
    queryFn: async (): Promise<CategoryItem[]> => {
      try {
        const { data, error } = await supabase
          .from("categories")
          .select("*")
          .eq("active", true)
          .order("sort_order");
        if (error || !data || data.length === 0) throw new Error("fallback");
        return data.map((c: Record<string, unknown>) => ({
          id: c.id as string,
          label: c.label as string,
          icon: (c.id === "gloves" ? "🏋️‍♂️" : c.icon) as string,
          description: (c.description ?? "") as string,
          href: categoryHref(c.id as string),
          sort_order: (c.sort_order ?? 0) as number,
          active: (c.active ?? true) as boolean,
        }));
      } catch {
        return CATEGORIES.map((c, i) => ({
          id: c.id,
          label: c.label,
          icon: c.icon,
          description: c.description,
          href: categoryHref(c.id),
          sort_order: i,
          active: true,
        }));
      }
    },
    staleTime: 5 * 60 * 1000,
  });
}
