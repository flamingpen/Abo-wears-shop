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

const JERSEY_IMG = "https://images.unsplash.com/photo-1576874014000-e34a8e6ddf8e?w=400&h=400&fit=crop&auto=format";
const JERSEY_IMG2 = "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=400&h=400&fit=crop&auto=format";
const JERSEY_IMG3 = "https://images.unsplash.com/photo-1606143837820-e6fadf3e3d16?w=400&h=400&fit=crop&auto=format";
const JOGGER_IMG = "https://images.unsplash.com/photo-1503341338985-95956e674897?w=400&h=400&fit=crop&auto=format";
const SHORTS_IMG = "https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&h=400&fit=crop&auto=format";
const CAP_IMG = "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop&auto=format";

export const PRODUCTS: Product[] = [
  // Retro Jerseys
  { id: "rj-1", name: "Arsenal 2004 Retro Home", price: 15000, category: "retro-jerseys", image: JERSEY_IMG, badge: "🔥 Popular" },
  { id: "rj-2", name: "Man Utd 1999 Treble Retro", price: 16000, category: "retro-jerseys", image: JERSEY_IMG2, badge: "Classic" },
  { id: "rj-3", name: "Brazil 1970 World Cup Retro", price: 17000, category: "retro-jerseys", image: JERSEY_IMG3 },
  { id: "rj-4", name: "AC Milan 2007 Champions Retro", price: 16500, category: "retro-jerseys", image: JERSEY_IMG },
  { id: "rj-5", name: "Barcelona 2009 Treble Retro", price: 17500, category: "retro-jerseys", image: JERSEY_IMG2, badge: "Best Seller" },
  { id: "rj-6", name: "Real Madrid 2002 Champions Retro", price: 16000, category: "retro-jerseys", image: JERSEY_IMG3 },

  // Club Jerseys
  { id: "cj-1", name: "Arsenal 24/25 Home Jersey", price: 15000, category: "club-jerseys", image: JERSEY_IMG, badge: "New" },
  { id: "cj-2", name: "Man City 24/25 Home Jersey", price: 15000, category: "club-jerseys", image: JERSEY_IMG2 },
  { id: "cj-3", name: "Real Madrid 24/25 Away Jersey", price: 16000, category: "club-jerseys", image: JERSEY_IMG3 },
  { id: "cj-4", name: "PSG 24/25 Home Jersey", price: 15500, category: "club-jerseys", image: JERSEY_IMG, badge: "🔥 Hot" },
  { id: "cj-5", name: "Chelsea 24/25 Home Jersey", price: 15000, category: "club-jerseys", image: JERSEY_IMG2 },
  { id: "cj-6", name: "Bayern Munich 24/25 Home Jersey", price: 15500, category: "club-jerseys", image: JERSEY_IMG3 },
  { id: "cj-7", name: "Liverpool 24/25 Home Jersey", price: 15000, category: "club-jerseys", image: JERSEY_IMG },
  { id: "cj-8", name: "Juventus 24/25 Home Jersey", price: 14500, category: "club-jerseys", image: JERSEY_IMG2 },

  // Country Jerseys
  { id: "nj-1", name: "Nigeria Super Eagles Home Jersey", price: 14000, category: "country-jerseys", image: JERSEY_IMG, badge: "🇳🇬 Local Fave" },
  { id: "nj-2", name: "Brazil 24/25 Home Jersey", price: 16000, category: "country-jerseys", image: JERSEY_IMG2 },
  { id: "nj-3", name: "France 24/25 Home Jersey", price: 15500, category: "country-jerseys", image: JERSEY_IMG3 },
  { id: "nj-4", name: "Germany 24/25 Home Jersey", price: 15000, category: "country-jerseys", image: JERSEY_IMG },
  { id: "nj-5", name: "Spain 24/25 Home Jersey", price: 15000, category: "country-jerseys", image: JERSEY_IMG2 },
  { id: "nj-6", name: "Argentina 24/25 Home Jersey", price: 15500, category: "country-jerseys", image: JERSEY_IMG3, badge: "Best Seller" },

  // Joggers
  { id: "jg-1", name: "Classic Black Jogger Pants", price: 10000, category: "joggers", image: JOGGER_IMG },
  { id: "jg-2", name: "Navy Blue Jogger Pants", price: 10000, category: "joggers", image: JOGGER_IMG },
  { id: "jg-3", name: "All-White Sporty Joggers", price: 11000, category: "joggers", image: JOGGER_IMG, badge: "Trending" },
  { id: "jg-4", name: "Olive Green Training Joggers", price: 10500, category: "joggers", image: JOGGER_IMG },
  { id: "jg-5", name: "Charcoal Grey Joggers", price: 10000, category: "joggers", image: JOGGER_IMG },

  // Shorts
  { id: "sh-1", name: "Football Training Shorts – Black", price: 5000, category: "shorts", image: SHORTS_IMG },
  { id: "sh-2", name: "Football Training Shorts – Navy", price: 5000, category: "shorts", image: SHORTS_IMG },
  { id: "sh-3", name: "Casual Sport Shorts – Grey", price: 5500, category: "shorts", image: SHORTS_IMG, badge: "Popular" },
  { id: "sh-4", name: "Running Shorts – White", price: 5000, category: "shorts", image: SHORTS_IMG },
  { id: "sh-5", name: "Compression Shorts – Black", price: 6000, category: "shorts", image: SHORTS_IMG },

  // Face Caps
  { id: "fc-1", name: "Classic Snapback Cap – Black", price: 4000, category: "face-caps", image: CAP_IMG },
  { id: "fc-2", name: "Fitted Dad Cap – White", price: 3500, category: "face-caps", image: CAP_IMG },
  { id: "fc-3", name: "Abo Wears Branded Cap", price: 4500, category: "face-caps", image: CAP_IMG, badge: "Exclusive" },
  { id: "fc-4", name: "Sports Cap – Navy Blue", price: 3500, category: "face-caps", image: CAP_IMG },
];

export function getProductsByCategory(category: Category): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function formatPrice(price: number): string {
  return `₦${price.toLocaleString("en-NG")}`;
}
