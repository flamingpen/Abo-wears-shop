import { useState } from "react";
import { PRODUCTS, formatPrice } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

const JERSEY_TABS = [
  { id: "retro-jerseys", label: "Retro Jerseys" },
  { id: "club-jerseys", label: "Club Jerseys" },
  { id: "country-jerseys", label: "Country Jerseys" },
] as const;

type JerseyCategory = "retro-jerseys" | "club-jerseys" | "country-jerseys";

export default function Jerseys() {
  const [activeTab, setActiveTab] = useState<JerseyCategory>("club-jerseys");

  const products = PRODUCTS.filter((p) => p.category === activeTab);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-[#0a0a0a] text-white py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-display text-5xl md:text-6xl text-white mb-2">Jerseys</h1>
          <p className="text-gray-400">Retro classics, club kits & national team jerseys</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-16 bg-background border-b border-border z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex overflow-x-auto gap-1 py-2">
            {JERSEY_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap font-barlow font-600 text-sm uppercase tracking-wide px-5 py-2.5 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? "bg-[#22c55e] text-black"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                data-testid={`tab-${tab.id}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground text-sm">
            {products.length} products in{" "}
            <span className="text-foreground font-semibold">
              {JERSEY_TABS.find((t) => t.id === activeTab)?.label}
            </span>
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
