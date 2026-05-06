import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { PRODUCTS, CATEGORIES } from "@/data/products";
import type { Product, Category } from "@/data/products";

function mapDbProduct(p: Record<string, unknown>): Product {
  return {
    id: p.id as string,
    name: p.name as string,
    price: p.price as number,
    category: p.category_id as Category,
    image: p.image as string,
    badge: (p.badge as string) || undefined,
    colors: (p.colors as string[]) || undefined,
    colorImages: (p.color_images as Record<string, string>) || undefined,
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

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("categories")
          .select("*")
          .eq("active", true)
          .order("sort_order");
        if (error || !data || data.length === 0) throw new Error("fallback");
        return data;
      } catch {
        return CATEGORIES.map((c, i) => ({
          id: c.id,
          label: c.label,
          icon: c.icon,
          description: c.description,
          href: (c.id === "joggers" || c.id === "shorts" || c.id === "face-caps" || c.id === "gloves")
            ? `/${c.id}`
            : "/jerseys",
          sort_order: i,
          active: true,
        }));
      }
    },
    staleTime: 5 * 60 * 1000,
  });
}
