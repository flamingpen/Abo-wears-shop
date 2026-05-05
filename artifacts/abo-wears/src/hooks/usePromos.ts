import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { DbPromo, DbPromoProduct } from "@/lib/supabase";

export function useActivePromos() {
  return useQuery<DbPromo[]>({
    queryKey: ["active-promos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("promos")
        .select("*")
        .eq("active", true)
        .order("created_at", { ascending: false });
      if (error) return [];
      return data ?? [];
    },
    staleTime: 60 * 1000,
  });
}

export function usePromo(id: string) {
  return useQuery<{ promo: DbPromo; items: DbPromoProduct[] } | null>({
    queryKey: ["promo", id],
    queryFn: async () => {
      const [promoRes, itemsRes] = await Promise.all([
        supabase.from("promos").select("*").eq("id", id).single(),
        supabase
          .from("promo_products")
          .select("*")
          .eq("promo_id", id)
          .order("sort_order"),
      ]);
      if (promoRes.error || !promoRes.data) return null;
      return { promo: promoRes.data, items: itemsRes.data ?? [] };
    },
    enabled: !!id,
    staleTime: 60 * 1000,
  });
}

export function useAllPromos() {
  return useQuery<DbPromo[]>({
    queryKey: ["all-promos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("promos")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
    staleTime: 30 * 1000,
  });
}

export function usePromoProducts(promoId: string) {
  return useQuery<DbPromoProduct[]>({
    queryKey: ["promo-products", promoId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("promo_products")
        .select("*")
        .eq("promo_id", promoId)
        .order("sort_order");
      if (error) throw error;
      return data ?? [];
    },
    enabled: !!promoId,
    staleTime: 30 * 1000,
  });
}
