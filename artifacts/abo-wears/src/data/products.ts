import storeImg from "@assets/2026-02-17_1777531258431.webp";
import arsenalJerseysImg from "@assets/unnamed_(3)_1777531271648.webp";
import multiClubJerseysImg from "@assets/unnamed_(1)_1777531271703.webp";
import nigeriaJerseyImg from "@assets/unnamed_(4)_1777531271737.webp";
import retroJerseysImg from "@assets/IMG-20260513-WA0006_1778762099219.jpg";

export { storeImg, arsenalJerseysImg, multiClubJerseysImg, nigeriaJerseyImg, retroJerseysImg };

export type Category =
  | "retro-jerseys"
  | "club-jerseys"
  | "country-jerseys"
  | "nfl-jerseys"
  | "basketball-jerseys"
  | "baseball-jerseys"
  | "joggers"
  | "shorts"
  | "face-caps"
  | "gloves"
  | (string & {});

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  image: string;
  images?: string[];
  badge?: string;
  colors?: string[];
  colorImages?: Record<string, string[]>;
}

export const WHATSAPP_NUMBER = "2348110951313";

export const CATEGORIES = [
  { id: "club-jerseys",       label: "Club Jerseys",       icon: "🏆", description: "Latest club football jerseys" },
  { id: "retro-jerseys",      label: "Retro Jerseys",       icon: "⚽", description: "Classic vintage football shirts" },
  { id: "country-jerseys",    label: "Country Jerseys",     icon: "🌍", description: "Country football jerseys from around the world" },
  { id: "nfl-jerseys",        label: "NFL Jerseys",         icon: "🏈", description: "Official American football team jerseys" },
  { id: "basketball-jerseys", label: "Basketball Jerseys",  icon: "🏀", description: "NBA and basketball team jerseys" },
  { id: "baseball-jerseys",   label: "Baseball Jerseys",    icon: "⚾", description: "MLB and baseball team jerseys" },
  { id: "joggers",            label: "Joggers",             icon: "👟", description: "Comfortable sporty joggers" },
  { id: "shorts",             label: "Shorts",              icon: "🩳", description: "Training & casual shorts" },
  { id: "face-caps",          label: "Face Caps",           icon: "🧢", description: "Stylish sports caps" },
  { id: "gloves",             label: "GYM Wears",            icon: "🏋️‍♂️", description: "Sports & GYM training gear" },
] as const;

// Placeholder image URLs
const JOGGER_IMG1 = "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&h=500&fit=crop&auto=format";
const JOGGER_IMG2 = "https://images.unsplash.com/photo-1617952739019-63b27b1acbc8?w=500&h=500&fit=crop&auto=format";
const JOGGER_IMG3 = "https://images.unsplash.com/photo-1599744331096-b6f99f4e5e39?w=500&h=500&fit=crop&auto=format";
const SHORTS_IMG1 = "https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=500&h=500&fit=crop&auto=format";
const SHORTS_IMG2 = "https://images.unsplash.com/photo-1562183241-b937e95585b6?w=500&h=500&fit=crop&auto=format";
const CAP_IMG1 = "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&h=500&fit=crop&auto=format";
const CAP_IMG2 = "https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=500&h=500&fit=crop&auto=format";
const CAP_IMG3 = "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=500&h=500&fit=crop&auto=format";
const NFL_IMG1 = "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=500&h=500&fit=crop&auto=format";
const NFL_IMG2 = "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=500&h=500&fit=crop&auto=format";
const NFL_IMG3 = "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6?w=500&h=500&fit=crop&auto=format";
const BBALL_IMG1 = "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500&h=500&fit=crop&auto=format";
const BBALL_IMG2 = "https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?w=500&h=500&fit=crop&auto=format";
const BBALL_IMG3 = "https://images.unsplash.com/photo-1518063319789-7217e6706b04?w=500&h=500&fit=crop&auto=format";
const BASE_IMG1 = "https://images.unsplash.com/photo-1562593028-c7c77e0b7bdc?w=500&h=500&fit=crop&auto=format";
const BASE_IMG2 = "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=500&h=500&fit=crop&auto=format";
const BASE_IMG3 = "https://images.unsplash.com/photo-1508344928928-7165b67de128?w=500&h=500&fit=crop&auto=format";
const GLOVE_IMG1 = "https://images.unsplash.com/photo-1601422407692-ad6d71ca5478?w=500&h=500&fit=crop&auto=format";
const GLOVE_IMG2 = "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop&auto=format";
const GLOVE_IMG3 = "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500&h=500&fit=crop&auto=format";

export const PRODUCTS: Product[] = [
  { id: "rj-1", name: "Nigeria 1994 World Cup Retro",     price: 15000, category: "retro-jerseys", image: nigeriaJerseyImg,      badge: "🇳🇬 Icon",    colors: ["Green", "White", "Black"] },
  { id: "rj-2", name: "Arsenal 2004 Invincibles Retro",   price: 16000, category: "retro-jerseys", image: arsenalJerseysImg,     badge: "🔥 Popular",  colors: ["Red", "White"] },
  { id: "rj-3", name: "Man Utd 1999 Treble Retro",        price: 16000, category: "retro-jerseys", image: multiClubJerseysImg,                         colors: ["Red", "Black", "Yellow"] },
  { id: "rj-4", name: "Brazil 1970 World Cup Retro",      price: 17000, category: "retro-jerseys", image: storeImg,                                     colors: ["Yellow", "Green", "Blue"] },
  { id: "rj-5", name: "Barcelona 2009 Treble Retro",      price: 17500, category: "retro-jerseys", image: multiClubJerseysImg,   badge: "Best Seller",  colors: ["Blue", "Purple"] },
  { id: "rj-6", name: "Real Madrid 2002 Champions Retro", price: 16000, category: "retro-jerseys", image: arsenalJerseysImg,                            colors: ["White", "Gold"] },

  { id: "cj-1", name: "Arsenal 24/25 Home Jersey",     price: 15000, category: "club-jerseys", image: arsenalJerseysImg,    badge: "New",     colors: ["Red", "White"] },
  { id: "cj-2", name: "Arsenal 24/25 Away Jersey",     price: 15000, category: "club-jerseys", image: arsenalJerseysImg,                      colors: ["Yellow", "Red"] },
  { id: "cj-3", name: "Man City 24/25 Home Jersey",    price: 15000, category: "club-jerseys", image: multiClubJerseysImg,                    colors: ["Blue", "White"] },
  { id: "cj-4", name: "Real Madrid 24/25 Home Jersey", price: 16000, category: "club-jerseys", image: multiClubJerseysImg,   badge: "🔥 Hot", colors: ["White", "Gold"] },
  { id: "cj-5", name: "Chelsea 24/25 Home Jersey",     price: 15000, category: "club-jerseys", image: multiClubJerseysImg,                    colors: ["Blue", "White"] },
  { id: "cj-6", name: "Man Utd 24/25 Home Jersey",     price: 15500, category: "club-jerseys", image: multiClubJerseysImg,                    colors: ["Red", "Black"] },
  { id: "cj-7", name: "Liverpool 24/25 Home Jersey",   price: 15000, category: "club-jerseys", image: multiClubJerseysImg,                    colors: ["Red", "Green"] },
  { id: "cj-8", name: "Barcelona 24/25 Home Jersey",   price: 15500, category: "club-jerseys", image: multiClubJerseysImg,                    colors: ["Blue", "Purple", "Yellow"] },

  { id: "nj-1", name: "Nigeria Super Eagles Home Jersey", price: 14000, category: "country-jerseys", image: nigeriaJerseyImg,    badge: "🇳🇬 Local Fave", colors: ["Green", "White"] },
  { id: "nj-2", name: "Nigeria Super Eagles Away Jersey", price: 14000, category: "country-jerseys", image: nigeriaJerseyImg,                            colors: ["White", "Green"] },
  { id: "nj-3", name: "Brazil 24/25 Home Jersey",        price: 16000, category: "country-jerseys", image: multiClubJerseysImg,                          colors: ["Yellow", "Green", "Blue"] },
  { id: "nj-4", name: "France 24/25 Home Jersey",        price: 15500, category: "country-jerseys", image: multiClubJerseysImg,                          colors: ["Blue", "Red", "White"] },
  { id: "nj-5", name: "Germany 24/25 Home Jersey",       price: 15000, category: "country-jerseys", image: multiClubJerseysImg,                          colors: ["White", "Black", "Red"] },
  { id: "nj-6", name: "Argentina 24/25 Home Jersey",     price: 15500, category: "country-jerseys", image: multiClubJerseysImg,  badge: "Best Seller",   colors: ["Blue", "White"] },

  { id: "nfl-1", name: "Kansas City Chiefs Patrick Mahomes #15", price: 18000, category: "nfl-jerseys", image: NFL_IMG1, badge: "🔥 Hot" },
  { id: "nfl-2", name: "Dallas Cowboys Dak Prescott #4",         price: 17500, category: "nfl-jerseys", image: NFL_IMG2 },
  { id: "nfl-3", name: "Buffalo Bills Josh Allen #17",           price: 17500, category: "nfl-jerseys", image: NFL_IMG3 },
  { id: "nfl-4", name: "San Francisco 49ers #23 Home",           price: 17000, category: "nfl-jerseys", image: NFL_IMG1 },
  { id: "nfl-5", name: "Philadelphia Eagles #11 Away",           price: 17000, category: "nfl-jerseys", image: NFL_IMG2, badge: "Popular" },
  { id: "nfl-6", name: "Miami Dolphins #1 Home Jersey",          price: 16500, category: "nfl-jerseys", image: NFL_IMG3 },

  { id: "bb-1", name: "LA Lakers LeBron James #23",             price: 17000, category: "basketball-jerseys", image: BBALL_IMG1, badge: "🔥 Icon" },
  { id: "bb-2", name: "Chicago Bulls Michael Jordan #23 Retro",  price: 18000, category: "basketball-jerseys", image: BBALL_IMG2, badge: "Legend" },
  { id: "bb-3", name: "Golden State Warriors Stephen Curry #30", price: 17000, category: "basketball-jerseys", image: BBALL_IMG3 },
  { id: "bb-4", name: "Boston Celtics Jayson Tatum #0",          price: 16500, category: "basketball-jerseys", image: BBALL_IMG1 },
  { id: "bb-5", name: "Brooklyn Nets Kevin Durant #7",           price: 17000, category: "basketball-jerseys", image: BBALL_IMG2 },
  { id: "bb-6", name: "Miami Heat Jimmy Butler #22",             price: 16000, category: "basketball-jerseys", image: BBALL_IMG3, badge: "Popular" },

  { id: "bsb-1", name: "New York Yankees Classic Home Jersey", price: 16500, category: "baseball-jerseys", image: BASE_IMG1, badge: "Classic" },
  { id: "bsb-2", name: "LA Dodgers Away Jersey",               price: 16000, category: "baseball-jerseys", image: BASE_IMG2 },
  { id: "bsb-3", name: "Chicago Cubs Home Jersey #17",         price: 15500, category: "baseball-jerseys", image: BASE_IMG3 },
  { id: "bsb-4", name: "Boston Red Sox Home Jersey",           price: 16000, category: "baseball-jerseys", image: BASE_IMG1 },
  { id: "bsb-5", name: "Atlanta Braves Away Jersey",           price: 15500, category: "baseball-jerseys", image: BASE_IMG2, badge: "Popular" },
  { id: "bsb-6", name: "Houston Astros Home Jersey",           price: 15500, category: "baseball-jerseys", image: BASE_IMG3 },

  { id: "jg-1", name: "Classic Black Jogger Pants",   price: 10000, category: "joggers", image: JOGGER_IMG1,                    colors: ["Black", "Grey"] },
  { id: "jg-2", name: "Navy Blue Jogger Pants",       price: 10000, category: "joggers", image: JOGGER_IMG2,                    colors: ["Navy", "Blue"] },
  { id: "jg-3", name: "All-White Sporty Joggers",     price: 11000, category: "joggers", image: JOGGER_IMG3, badge: "Trending", colors: ["White", "Grey"] },
  { id: "jg-4", name: "Olive Green Training Joggers", price: 10500, category: "joggers", image: JOGGER_IMG1,                    colors: ["Olive", "Green"] },
  { id: "jg-5", name: "Charcoal Grey Joggers",        price: 10000, category: "joggers", image: JOGGER_IMG2,                    colors: ["Grey", "Black"] },

  { id: "sh-1", name: "Football Training Shorts – Black", price: 5000, category: "shorts", image: SHORTS_IMG1 },
  { id: "sh-2", name: "Football Training Shorts – Navy",  price: 5000, category: "shorts", image: SHORTS_IMG2 },
  { id: "sh-3", name: "Casual Sport Shorts – Grey",       price: 5500, category: "shorts", image: SHORTS_IMG1, badge: "Popular" },
  { id: "sh-4", name: "Running Shorts – White",           price: 5000, category: "shorts", image: SHORTS_IMG2 },
  { id: "sh-5", name: "Compression Shorts – Black",       price: 6000, category: "shorts", image: SHORTS_IMG1 },

  { id: "fc-1", name: "Classic Snapback Cap – Black", price: 4000, category: "face-caps", image: CAP_IMG1 },
  { id: "fc-2", name: "Fitted Dad Cap – White",       price: 3500, category: "face-caps", image: CAP_IMG2 },
  { id: "fc-3", name: "ABO Wears Branded Cap",        price: 4500, category: "face-caps", image: CAP_IMG3, badge: "Exclusive" },
  { id: "fc-4", name: "Sports Cap – Navy Blue",       price: 3500, category: "face-caps", image: CAP_IMG1 },

  { id: "gl-1", name: "Pro Training Gloves – Black",    price: 7000,  category: "gloves", image: GLOVE_IMG1, badge: "Best Seller" },
  { id: "gl-2", name: "Boxing Gloves – Red/Black",      price: 12000, category: "gloves", image: GLOVE_IMG2, badge: "🔥 Hot" },
  { id: "gl-3", name: "Goalkeeper Gloves – Green",      price: 9000,  category: "gloves", image: GLOVE_IMG3 },
  { id: "gl-4", name: "Fitness Grip Gloves – White",    price: 6500,  category: "gloves", image: GLOVE_IMG1 },
  { id: "gl-5", name: "Sports Compression Gloves",      price: 7500,  category: "gloves", image: GLOVE_IMG2 },
  { id: "gl-6", name: "Half-Finger Training Gloves",    price: 6000,  category: "gloves", image: GLOVE_IMG3, badge: "Popular" },
];

export function getProductsByCategory(category: string): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function formatPrice(price: number): string {
  return `₦${price.toLocaleString("en-NG")}`;
}
