import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { PRODUCTS, formatPrice } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { SearchBar } from "@/components/SearchBar";
import { trackPageView } from "@/lib/supabase";

const JERSEY_CATEGORIES = [
  "retro-jerseys",
  "club-jerseys",
  "country-jerseys",
  "basketball-jerseys",
  "nfl-jerseys",
  "baseball-jerseys",
];

type Tab = "all" | "jerseys" | "joggers" | "shorts" | "face-caps" | "gym-wears";

const TABS: { id: Tab; label: string; emoji: string }[] = [
  { id: "all",       label: "All Products", emoji: "🛍️" },
  { id: "jerseys",   label: "Jerseys",      emoji: "⚽" },
  { id: "joggers",   label: "Joggers",      emoji: "👟" },
  { id: "shorts",    label: "Shorts",       emoji: "🩳" },
  { id: "face-caps", label: "Face Caps",    emoji: "🧢" },
  { id: "gym-wears", label: "Gym Wears",    emoji: "🥊" },
];

function filterByTab(tab: Tab) {
  if (tab === "all")       return PRODUCTS;
  if (tab === "jerseys")   return PRODUCTS.filter((p) => JERSEY_CATEGORIES.includes(p.category));
  if (tab === "gym-wears") return PRODUCTS.filter((p) => p.category === "gloves");
  return PRODUCTS.filter((p) => p.category === tab);
}

export default function AllProducts() {
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const tabBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    trackPageView("/store");
  }, []);

  const byTab = filterByTab(activeTab);
  const products = searchQuery.trim()
    ? byTab.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : byTab;

  function handleTabClick(id: Tab) {
    setActiveTab(id);
    setSearchQuery("");
  }

  return (
    <div className="min-h-screen">
      <div className="bg-[#0a0a0a] text-white py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#22c55e] text-sm font-semibold uppercase tracking-widest mb-2">Full Collection</p>
          <h1 className="font-display text-5xl md:text-6xl text-white mb-2">Browse All Products</h1>
          <p className="text-gray-400">Everything ABO Wears has to offer — jerseys, joggers, shorts, caps and more.</p>
        </div>
      </div>

      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div ref={tabBarRef} className="max-w-6xl mx-auto px-4 flex gap-1 overflow-x-auto no-scrollbar py-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-[#22c55e] text-white shadow"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span>{tab.emoji}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{ backgroundImage: "url('/abo-logo-watermark.jpg')", backgroundSize: "220px 220px", backgroundRepeat: "repeat" }}
        />
        <div className="relative max-w-6xl mx-auto px-4 py-10">
          <SearchBar
            placeholder={`Search ${TABS.find((t) => t.id === activeTab)?.label ?? "products"}...`}
            onSearch={setSearchQuery}
            className="mb-6 max-w-md"
          />
          <p className="text-muted-foreground text-sm mb-6">
            {`${products.length} product${products.length !== 1 ? "s" : ""} available`}
            {searchQuery && <span className="text-[#22c55e]"> matching "{searchQuery}"</span>}
          </p>

          {products.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <p className="text-lg font-semibold mb-2">No products found</p>
              <p className="text-sm">Try a different search term or category</p>
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
