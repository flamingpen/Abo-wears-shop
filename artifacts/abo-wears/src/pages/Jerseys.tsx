import { useState } from "react";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { SearchBar } from "@/components/SearchBar";

const JERSEY_TABS = [
  { id: "club-jerseys", label: "Club Jerseys", emoji: "🏆" },
  { id: "retro-jerseys", label: "Retro Jerseys", emoji: "⚽" },
  { id: "country-jerseys", label: "Country Jerseys", emoji: "🌍" },
  { id: "nfl-jerseys", label: "NFL Jerseys", emoji: "🏈" },
  { id: "basketball-jerseys", label: "Basketball Jerseys", emoji: "🏀" },
  { id: "baseball-jerseys", label: "Baseball Jerseys", emoji: "⚾" },
] as const;

type JerseyCategory =
  | "retro-jerseys"
  | "club-jerseys"
  | "country-jerseys"
  | "nfl-jerseys"
  | "basketball-jerseys"
  | "baseball-jerseys";

export default function Jerseys() {
  const [activeTab, setActiveTab] = useState<JerseyCategory>("club-jerseys");
  const [searchQuery, setSearchQuery] = useState("");

  const allTabProducts = PRODUCTS.filter((p) => p.category === activeTab);
  const products = searchQuery.trim()
    ? allTabProducts.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allTabProducts;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-[#0a0a0a] text-white py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-display text-5xl md:text-6xl text-white mb-2">Jerseys</h1>
          <p className="text-gray-400">
            Retro classics, club kits, country jerseys, NFL, Basketball & Baseball jerseys
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-16 bg-background border-b border-border z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex overflow-x-auto gap-1 py-2 scrollbar-none">
            {JERSEY_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setSearchQuery(""); }}
                className={`whitespace-nowrap font-barlow font-600 text-sm uppercase tracking-wide px-4 py-2.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? "bg-[#22c55e] text-black"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                data-testid={`tab-${tab.id}`}
              >
                <span>{tab.emoji}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Search */}
        <SearchBar
          placeholder={`Search ${JERSEY_TABS.find((t) => t.id === activeTab)?.label ?? "jerseys"}...`}
          onSearch={setSearchQuery}
          className="mb-6 max-w-md"
        />

        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground text-sm">
            {products.length} product{products.length !== 1 ? "s" : ""} in{" "}
            <span className="text-foreground font-semibold">
              {JERSEY_TABS.find((t) => t.id === activeTab)?.label}
            </span>
            {searchQuery && (
              <span className="text-[#22c55e]"> matching "{searchQuery}"</span>
            )}
          </p>
        </div>

        {products.length === 0 ? (
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
  );
}
