import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type DbCategory = {
  id: string;
  label: string;
  icon: string;
  description: string;
  href: string;
  sort_order: number;
  active: boolean;
  created_at: string;
};

export type DbProduct = {
  id: string;
  name: string;
  price: number;
  category_id: string;
  image: string;
  badge: string | null;
  colors: string[] | null;
  active: boolean;
  created_at: string;
  updated_at: string;
};

export type DbPromo = {
  id: string;
  title: string;
  description: string | null;
  banner_image: string | null;
  banner_position: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
};

export type DbPromoProduct = {
  id: string;
  promo_id: string;
  name: string;
  image: string;
  images: string[] | null;
  colors: string[] | null;
  original_price: number;
  promo_price: number;
  sort_order: number;
  created_at: string;
};

export type DbPageView = {
  id: number;
  page: string;
  viewed_at: string;
};

export async function trackPageView(page: string) {
  try {
    await supabase.from("page_views").insert({ page });
  } catch {
    // Silently fail — analytics should never break the site
  }
}
