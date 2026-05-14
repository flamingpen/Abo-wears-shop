import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ChevronDown } from "lucide-react";
import { CATEGORIES } from "@/data/products";
import type { Category } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { SearchBar } from "@/components/SearchBar";
import { useProducts } from "@/hooks/useProducts";
import { trackPageView } from "@/lib/supabase";

const STORE_TABS = [
  { id: "jerseys",   label: "Jerseys",    emoji: "⚽", href: "/jerseys"    },
  { id: "joggers",   label: "Joggers",    emoji: "👟", href: "/joggers"    },
  { id: "shorts",    label: "Shorts",     emoji: "🩳", href: "/shorts"     },
  { id: "face-caps", label: "Face Caps",  emoji: "🧢", href: "/face-caps"  },
  { id: "gym-wears", label: "Gym Wears",  emoji: "🥊", href: "/gym-wears"  },
];

const JERSEY_SUB_TABS = [
  { id: "club-jerseys",       label: "Club",       emoji: "🏆" },
  { id: "retro-jerseys",      label: "Retro",      emoji: "⚽" },
  { id: "country-jerseys",    label: "Country",    emoji: "🌍" },
  { id: "basketball-jerseys", label: "Basketball", emoji: "🏀" },
  { id: "nfl-jerseys",        label: "NFL",        emoji: "🏈" },
  { id: "baseball-jerseys",   label: "Baseball",   emoji: "⚾" },
];

interface CategoryPageProps {
  category: Category;
}

export default function CategoryPage({ category }: CategoryPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: allProducts = [], isLoading } = useProducts(category as string);

  useEffect(() => {
    trackPageView(`/category/${category}`);
  }, [category]);

  const products = searchQuery.trim()
    ? allProducts.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : allProducts;

  const catInfo = CATEGORIES.find((c) => c.id === category) ?? {
    label: category,
    icon: "📦",
    description: `Browse all ${category} products`,
  };

  const activeTab = category === "gloves" ? "gym-wears" : (category as string);
  const [jerseyExpanded, setJerseyExpanded] = useState(false);

  return (
    <div className="min-h-screen">
      <div className="bg-[#0a0a0a] text-white py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-3xl mb-2">{catInfo.icon}</div>
          <h1 className="font-display text-5xl md:text-6xl text-white mb-2">{catInfo.label}</h1>
          <p className="text-gray-400">{catInfo.description}</p>
        </div>
      </div>

      {/* Sticky all-categories tabs */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 flex gap-1 overflow-x-auto no-scrollbar py-2">
          {STORE_TABS.map((tab) => {
            if (tab.id === "jerseys") {
              return (
                <button
                  key="jerseys"
                  type="button"
                  onClick={() => setJerseyExpanded((v) => !v)}
                  className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  <span>{tab.emoji}</span>
                  {tab.label}
                  <ChevronDown size={13} className={`transition-transform ${jerseyExpanded ? "rotate-180" : ""}`} />
                </button>
              );
            }
            return (
              <Link
                key={tab.id}
                href={tab.href}
                className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-[#22c55e] text-white shadow"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span>{tab.emoji}</span>
                {tab.label}
              </Link>
            );
          })}
        </div>

        {/* Jersey sub-tabs row — expands when Jerseys is clicked */}
        {jerseyExpanded && (
          <div className="max-w-6xl mx-auto px-4 flex gap-1 overflow-x-auto no-scrollbar pb-2">
            {JERSEY_SUB_TABS.map((sub) => (
              <Link
                key={sub.id}
                href={`/jerseys/${sub.id}`}
                className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap bg-[#f0fdf4] text-[#16a34a] border border-[#bbf7d0] hover:bg-[#22c55e] hover:text-white transition-all"
              >
                <span>{sub.emoji}</span>
                {sub.label}
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="relative">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{ backgroundImage: "url('/abo-logo-watermark.jpg')", backgroundSize: "220px 220px", backgroundRepeat: "repeat" }}
        />
      <div className="relative max-w-6xl mx-auto px-4 py-10">
        <SearchBar
          placeholder={`Search ${catInfo.label}...`}
          onSearch={setSearchQuery}
          className="mb-6 max-w-md"
        />
        <p className="text-muted-foreground text-sm mb-6">
          {isLoading ? "Loading..." : `${products.length} product${products.length !== 1 ? "s" : ""} available`}
          {searchQuery && <span className="text-[#22c55e]"> matching "{searchQuery}"</span>}
        </p>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-muted rounded-xl aspect-square animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg font-semibold mb-2">No products found</p>
            <p className="text-sm">Try a different search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
