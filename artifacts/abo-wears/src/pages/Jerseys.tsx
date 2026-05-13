import { useState, useEffect } from "react";
import { useSearch, useLocation } from "wouter";
import { ProductCard } from "@/components/ProductCard";
import { SearchBar } from "@/components/SearchBar";
import { useProducts } from "@/hooks/useProducts";
import { trackPageView } from "@/lib/supabase";

const JERSEY_TABS = [
  { id: "club-jerseys",       label: "Club Jerseys",       emoji: "🏆" },
  { id: "retro-jerseys",      label: "Retro Jerseys",       emoji: "⚽" },
  { id: "country-jerseys",    label: "Country Jerseys",     emoji: "🌍" },
  { id: "basketball-jerseys", label: "Basketball Jerseys",  emoji: "🏀" },
  { id: "nfl-jerseys",        label: "NFL Jerseys",         emoji: "🏈" },
  { id: "baseball-jerseys",   label: "Baseball Jerseys",    emoji: "⚾" },
] as const;

type JerseyTab = typeof JERSEY_TABS[number]["id"];

const VALID_TABS = JERSEY_TABS.map((t) => t.id) as readonly string[];

function getTabFromSearch(search: string): JerseyTab {
  const params = new URLSearchParams(search);
  const tab = params.get("tab");
  if (tab && VALID_TABS.includes(tab)) return tab as JerseyTab;
  return "club-jerseys";
}

export default function Jerseys() {
  const search = useSearch();
  const [, navigate] = useLocation();

  const initialTab = getTabFromSearch(search);
  const [activeTab, setActiveTab] = useState<JerseyTab>(initialTab);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const tab = getTabFromSearch(search);
    setActiveTab(tab);
    setSearchQuery("");
  }, [search]);

  function handleTabChange(tab: JerseyTab) {
    navigate(`/jerseys?tab=${tab}`);
  }

  const { data: tabProducts = [], isLoading } = useProducts(activeTab);

  useEffect(() => {
    trackPageView("/jerseys");
  }, []);

  const products = searchQuery.trim()
    ? tabProducts.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : tabProducts;

  return (
    <div className="min-h-screen">
      <div className="bg-[#0a0a0a] text-white py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-display text-5xl md:text-6xl text-white mb-2">Jerseys</h1>
          <p className="text-gray-400">
            Retro Jerseys, Club Kits, Country Jerseys, NBA, NFL & Baseball Jerseys
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
                onClick={() => handleTabChange(tab.id)}
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

      <div className="relative">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{ backgroundImage: "url('/abo-logo-watermark.jpg')", backgroundSize: "220px 220px", backgroundRepeat: "repeat" }}
        />
      <div className="relative max-w-6xl mx-auto px-4 py-10">
        <SearchBar
          placeholder={`Search ${JERSEY_TABS.find((t) => t.id === activeTab)?.label ?? "jerseys"}...`}
          onSearch={setSearchQuery}
          className="mb-6 max-w-md"
        />

        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground text-sm">
            {isLoading ? "Loading..." : `${products.length} product${products.length !== 1 ? "s" : ""} in `}
            <span className="text-foreground font-semibold">
              {JERSEY_TABS.find((t) => t.id === activeTab)?.label}
            </span>
            {searchQuery && <span className="text-[#22c55e]"> matching "{searchQuery}"</span>}
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
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
