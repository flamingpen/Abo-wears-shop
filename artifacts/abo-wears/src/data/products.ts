import storeImg from "@assets/2026-02-17_1777531258431.webp";
import arsenalJerseysImg from "@assets/unnamed_(3)_1777531271648.webp";
import multiClubJerseysImg from "@assets/unnamed_(1)_1777531271703.webp";
import nigeriaJerseyImg from "@assets/unnamed_(4)_1777531271737.webp";

export { storeImg, arsenalJerseysImg, multiClubJerseysImg, nigeriaJerseyImg };

export type Category = "retro-jerseys" | "club-jerseys" | "country-jerseys" | "joggers" | "shorts" | "face-caps";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  image: string;
  badge?: string;
}

export const WHATSAPP_NUMBER = "2348110951313";

export const CATEGORIES = [
  { id: "retro-jerseys", label: "Retro Jerseys", icon: "⚽", description: "Classic vintage football shirts" },
  { id: "club-jerseys", label: "Club Jerseys", icon: "🏆", description: "Latest club football jerseys" },
  { id: "country-jerseys", label: "Country Jerseys", icon: "🌍", description: "National team jerseys" },
  { id: "joggers", label: "Joggers", icon: "👟", description: "Comfortable sporty joggers" },
  { id: "shorts", label: "Shorts", icon: "🩳", description: "Training & casual shorts" },
  { id: "face-caps", label: "Face Caps", icon: "🧢", description: "Stylish sports caps" },
] as const;

// Better product-style images for non-provided categories
const JOGGER_IMG1 = "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&h=500&fit=crop&auto=format";
const JOGGER_IMG2 = "https://images.unsplash.com/photo-1617952739019-63b27b1acbc8?w=500&h=500&fit=crop&auto=format";
const JOGGER_IMG3 = "https://images.unsplash.com/photo-1599744331096-b6f99f4e5e39?w=500&h=500&fit=crop&auto=format";
const SHORTS_IMG1 = "https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=500&h=500&fit=crop&auto=format";
const SHORTS_IMG2 = "https://images.unsplash.com/photo-1562183241-b937e95585b6?w=500&h=500&fit=crop&auto=format";
const CAP_IMG1 = "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&h=500&fit=crop&auto=format";
const CAP_IMG2 = "https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=500&h=500&fit=crop&auto=format";
const CAP_IMG3 = "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=500&h=500&fit=crop&auto=format";

export const PRODUCTS: Product[] = [
  // Retro Jerseys — use Nigeria retro + store image for variety
  { id: "rj-1", name: "Nigeria 1994 World Cup Retro", price: 15000, category: "retro-jerseys", image: nigeriaJerseyImg, badge: "🇳🇬 Icon" },
  { id: "rj-2", name: "Arsenal 2004 Invincibles Retro", price: 16000, category: "retro-jerseys", image: arsenalJerseysImg, badge: "🔥 Popular" },
  { id: "rj-3", name: "Man Utd 1999 Treble Retro", price: 16000, category: "retro-jerseys", image: multiClubJerseysImg },
  { id: "rj-4", name: "Brazil 1970 World Cup Retro", price: 17000, category: "retro-jerseys", image: storeImg },
  { id: "rj-5", name: "Barcelona 2009 Treble Retro", price: 17500, category: "retro-jerseys", image: multiClubJerseysImg, badge: "Best Seller" },
  { id: "rj-6", name: "Real Madrid 2002 Champions Retro", price: 16000, category: "retro-jerseys", image: arsenalJerseysImg },

  // Club Jerseys — use the provided multi-jersey and Arsenal images
  { id: "cj-1", name: "Arsenal 24/25 Home Jersey", price: 15000, category: "club-jerseys", image: arsenalJerseysImg, badge: "New" },
  { id: "cj-2", name: "Arsenal 24/25 Away Jersey", price: 15000, category: "club-jerseys", image: arsenalJerseysImg },
  { id: "cj-3", name: "Man City 24/25 Home Jersey", price: 15000, category: "club-jerseys", image: multiClubJerseysImg },
  { id: "cj-4", name: "Real Madrid 24/25 Home Jersey", price: 16000, category: "club-jerseys", image: multiClubJerseysImg, badge: "🔥 Hot" },
  { id: "cj-5", name: "Chelsea 24/25 Home Jersey", price: 15000, category: "club-jerseys", image: multiClubJerseysImg },
  { id: "cj-6", name: "Man Utd 24/25 Home Jersey", price: 15500, category: "club-jerseys", image: multiClubJerseysImg },
  { id: "cj-7", name: "Liverpool 24/25 Home Jersey", price: 15000, category: "club-jerseys", image: multiClubJerseysImg },
  { id: "cj-8", name: "Barcelona 24/25 Home Jersey", price: 15500, category: "club-jerseys", image: multiClubJerseysImg },

  // Country Jerseys — Nigeria uses the Nigeria image
  { id: "nj-1", name: "Nigeria Super Eagles Home Jersey", price: 14000, category: "country-jerseys", image: nigeriaJerseyImg, badge: "🇳🇬 Local Fave" },
  { id: "nj-2", name: "Nigeria Super Eagles Away Jersey", price: 14000, category: "country-jerseys", image: nigeriaJerseyImg },
  { id: "nj-3", name: "Brazil 24/25 Home Jersey", price: 16000, category: "country-jerseys", image: multiClubJerseysImg },
  { id: "nj-4", name: "France 24/25 Home Jersey", price: 15500, category: "country-jerseys", image: multiClubJerseysImg },
  { id: "nj-5", name: "Germany 24/25 Home Jersey", price: 15000, category: "country-jerseys", image: multiClubJerseysImg },
  { id: "nj-6", name: "Argentina 24/25 Home Jersey", price: 15500, category: "country-jerseys", image: multiClubJerseysImg, badge: "Best Seller" },

  // Joggers
  { id: "jg-1", name: "Classic Black Jogger Pants", price: 10000, category: "joggers", image: JOGGER_IMG1 },
  { id: "jg-2", name: "Navy Blue Jogger Pants", price: 10000, category: "joggers", image: JOGGER_IMG2 },
  { id: "jg-3", name: "All-White Sporty Joggers", price: 11000, category: "joggers", image: JOGGER_IMG3, badge: "Trending" },
  { id: "jg-4", name: "Olive Green Training Joggers", price: 10500, category: "joggers", image: JOGGER_IMG1 },
  { id: "jg-5", name: "Charcoal Grey Joggers", price: 10000, category: "joggers", image: JOGGER_IMG2 },

  // Shorts
  { id: "sh-1", name: "Football Training Shorts – Black", price: 5000, category: "shorts", image: SHORTS_IMG1 },
  { id: "sh-2", name: "Football Training Shorts – Navy", price: 5000, category: "shorts", image: SHORTS_IMG2 },
  { id: "sh-3", name: "Casual Sport Shorts – Grey", price: 5500, category: "shorts", image: SHORTS_IMG1, badge: "Popular" },
  { id: "sh-4", name: "Running Shorts – White", price: 5000, category: "shorts", image: SHORTS_IMG2 },
  { id: "sh-5", name: "Compression Shorts – Black", price: 6000, category: "shorts", image: SHORTS_IMG1 },

  // Face Caps
  { id: "fc-1", name: "Classic Snapback Cap – Black", price: 4000, category: "face-caps", image: CAP_IMG1 },
  { id: "fc-2", name: "Fitted Dad Cap – White", price: 3500, category: "face-caps", image: CAP_IMG2 },
  { id: "fc-3", name: "Abo Wears Branded Cap", price: 4500, category: "face-caps", image: CAP_IMG3, badge: "Exclusive" },
  { id: "fc-4", name: "Sports Cap – Navy Blue", price: 3500, category: "face-caps", image: CAP_IMG1 },
];

export function getProductsByCategory(category: Category): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function formatPrice(price: number): string {
  return `₦${price.toLocaleString("en-NG")}`;
}
