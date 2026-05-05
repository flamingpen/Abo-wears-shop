import { Link } from "wouter";
import { X, Tag } from "lucide-react";
import { useState } from "react";
import { useActivePromos } from "@/hooks/usePromos";

export function PromoBanner() {
  const { data: promos } = useActivePromos();
  const [dismissed, setDismissed] = useState<string[]>([]);

  const visible = (promos ?? []).filter((p) => !dismissed.includes(p.id));
  if (visible.length === 0) return null;

  const promo = visible[0];

  return (
    <div className="relative bg-gradient-to-r from-[#22c55e] via-[#16a34a] to-[#22c55e] text-black py-3 px-4">
      <div className="max-w-6xl mx-auto flex items-center justify-center gap-3">
        <Tag size={16} className="shrink-0" />
        <Link
          href={`/promo/${promo.id}`}
          className="font-bold text-sm md:text-base hover:underline text-center"
        >
          🔥 {promo.title}
          {promo.description && (
            <span className="font-normal ml-2 hidden md:inline">— {promo.description}</span>
          )}
          <span className="ml-2 underline text-xs font-semibold">View Promo →</span>
        </Link>
        <button
          onClick={() => setDismissed((d) => [...d, promo.id])}
          className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity"
          aria-label="Dismiss"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
