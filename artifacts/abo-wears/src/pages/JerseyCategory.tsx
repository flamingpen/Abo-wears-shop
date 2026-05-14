import { useState } from "react";
import { Link } from "wouter";
import { ProductCard } from "@/components/ProductCard";
import { SearchBar } from "@/components/SearchBar";
import { useProducts } from "@/hooks/useProducts";

const JERSEY_META: Record<string, { label: string; emoji: string; description: string }> = {
  "club-jerseys":       { label: "Club Jerseys",       emoji: "🏆", description: "Official and replica kits from top clubs around the world." },
  "retro-jerseys":      { label: "Retro Jerseys",       emoji: "⚽", description: "Classic throwback jerseys from legendary eras." },
  "country-jerseys":    { label: "Country Jerseys",     emoji: "🌍", description: "National team jerseys representing countries worldwide." },
  "basketball-jerseys": { label: "Basketball Jerseys",  emoji: "🏀", description: "NBA and basketball jerseys for every fan." },
  "nfl-jerseys":        { label: "NFL Jerseys",         emoji: "🏈", description: "Authentic NFL jerseys from your favourite teams." },
  "baseball-jerseys":   { label: "Baseball Jerseys",    emoji: "⚾", description: "MLB and baseball jerseys for every fan." },
};

const JERSEY_TABS = [
  { id: "club-jerseys",       label: "Club",       emoji: "🏆" },
  { id: "retro-jerseys",      label: "Retro",      emoji: "⚽" },
  { id: "country-jerseys",    label: "Country",    emoji: "🌍" },
  { id: "basketball-jerseys", label: "Basketball", emoji: "🏀" },
  { id: "nfl-jerseys",        label: "NFL",        emoji: "🏈" },
  { id: "baseball-jerseys",   label: "Baseball",   emoji: "⚾" },
];

interface Props {
  category: string;
}

export default function JerseyCategory({ category }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: allProducts = [], isLoading } = useProducts(category);

  const meta = JERSEY_META[category] ?? {
    label: category,
    emoji: "👕",
    description: `Browse all ${category} products.`,
  };

  const products = searchQuery.trim()
    ? allProducts.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : allProducts;

  return (
    <div className="min-h-screen">
      <div className="bg-[#0a0a0a] text-white py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-4xl mb-2">{meta.emoji}</div>
          <h1 className="font-display text-5xl md:text-6xl text-white mb-2">{meta.label}</h1>
          <p className="text-gray-400">{meta.description}</p>
        </div>
      </div>

      {/* Sticky jersey-type tabs */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 flex gap-1 overflow-x-auto no-scrollbar py-2">
          {JERSEY_TABS.map((tab) => (
            <Link
              key={tab.id}
              href={`/jerseys/${tab.id}`}
              className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                category === tab.id
                  ? "bg-[#22c55e] text-white shadow"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span>{tab.emoji}</span>
              {tab.label}
            </Link>
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
            placeholder={`Search ${meta.label}...`}
            onSearch={setSearchQuery}
            className="mb-6 max-w-md"
          />
          <p className="text-muted-foreground text-sm mb-6">
            {isLoading
              ? "Loading..."
              : `${products.length} product${products.length !== 1 ? "s" : ""} in `}
            <span className="text-foreground font-semibold">{meta.label}</span>
            {searchQuery && <span className="text-[#22c55e]"> matching "{searchQuery}"</span>}
          </p>

          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-muted rounded-xl aspect-square animate-pulse" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <p className="text-lg font-semibold mb-2">No products found</p>
              <p className="text-sm">Try a different search term or browse all jerseys.</p>
              <Link
                href="/jerseys"
                className="inline-block mt-4 text-[#22c55e] text-sm font-semibold hover:underline"
              >
                ← Browse All Jerseys
              </Link>
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
