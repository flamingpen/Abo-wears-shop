import { useParams, Link } from "wouter";
import { ArrowLeft, ShoppingBag, Tag } from "lucide-react";
import { usePromo } from "@/hooks/usePromos";
import { useCart } from "@/context/CartContext";

function formatPrice(n: number) {
  return `₦${n.toLocaleString("en-NG")}`;
}

function DiscountBadge({ original, promo }: { original: number; promo: number }) {
  const pct = Math.round(((original - promo) / original) * 100);
  return (
    <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
      -{pct}% OFF
    </span>
  );
}

export default function PromoPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = usePromo(id);
  const { addToCart } = useCart();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#22c55e] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <Tag size={48} className="text-muted-foreground mb-4" />
        <h1 className="font-display text-4xl mb-2">Promo Not Found</h1>
        <p className="text-muted-foreground mb-6">This promo may have ended.</p>
        <Link href="/" className="bg-[#22c55e] text-black font-bold px-6 py-3 rounded-full">
          Back to Home
        </Link>
      </div>
    );
  }

  const { promo, items } = data;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div
        className="relative bg-[#0a0a0a] text-white py-14 px-4 overflow-hidden"
        style={
          promo.banner_image
            ? {
                backgroundImage: `url(${promo.banner_image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : {}
        }
      >
        {promo.banner_image && (
          <div className="absolute inset-0 bg-black/60" />
        )}
        <div className="relative max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-gray-400 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft size={14} /> Back to Store
          </Link>
          <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/40 text-red-400 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            Limited Time Offer
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-white mb-3">
            {promo.title}
          </h1>
          {promo.description && (
            <p className="text-gray-300 text-lg max-w-xl">{promo.description}</p>
          )}
        </div>
      </div>

      {/* Products */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {items.length === 0 ? (
          <p className="text-muted-foreground text-center py-12">
            No products in this promo yet.
          </p>
        ) : (
          <>
            <h2 className="font-display text-3xl mb-8">
              🔥 {items.length} Deal{items.length !== 1 ? "s" : ""} Available
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {items.map((item) => {
                const savings = item.original_price - item.promo_price;
                return (
                  <div
                    key={item.id}
                    className="bg-card border border-card-border rounded-xl overflow-hidden group hover:border-red-400 transition-colors"
                  >
                    <div className="relative aspect-square overflow-hidden bg-muted">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 left-2">
                        <DiscountBadge
                          original={item.original_price}
                          promo={item.promo_price}
                        />
                      </div>
                    </div>
                    <div className="p-3.5">
                      <h3 className="font-semibold text-sm text-foreground line-clamp-2 mb-2">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[#22c55e] font-bold text-base">
                          {formatPrice(item.promo_price)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-muted-foreground text-xs line-through">
                          {formatPrice(item.original_price)}
                        </span>
                        <span className="text-red-500 text-xs font-semibold">
                          Save {formatPrice(savings)}
                        </span>
                      </div>
                      <button
                        onClick={() =>
                          addToCart({
                            id: item.id,
                            name: item.name,
                            price: item.promo_price,
                            category: "club-jerseys",
                            image: item.image,
                            badge: `PROMO`,
                          })
                        }
                        className="w-full flex items-center justify-center gap-2 text-sm font-semibold py-2.5 rounded-lg bg-[#0a0a0a] hover:bg-[#22c55e] text-white hover:text-black transition-all"
                      >
                        <ShoppingBag size={14} />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
