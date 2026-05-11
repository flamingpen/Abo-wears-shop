import { useState } from "react";
import { useParams, Link } from "wouter";
import { ArrowLeft, Tag, ChevronLeft, ChevronRight, X, ShoppingBag, CheckCircle } from "lucide-react";
import { usePromo } from "@/hooks/usePromos";
import { useCart } from "@/context/CartContext";
import { ColorSwatches } from "@/components/ColorSwatches";
import { getColorHex, isLightColor } from "@/lib/colors";
import type { DbPromoProduct } from "@/lib/supabase";

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

function PromoProductCard({ item }: { item: DbPromoProduct }) {
  const { addToCart } = useCart();
  const [imgIndex, setImgIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [fading, setFading] = useState(false);
  const [added, setAdded] = useState(false);

  const images =
    item.images && item.images.filter(Boolean).length > 0
      ? item.images.filter(Boolean)
      : [item.image];
  const colors = item.colors ?? [];
  const hasColors = colors.length > 0;
  const multiImage = images.length > 1;
  const savings = item.original_price - item.promo_price;

  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    hasColors ? colors[0] : undefined
  );

  function handleColorSelect(color: string) {
    if (color === selectedColor) return;
    setFading(true);
    setTimeout(() => {
      setSelectedColor(color);
      setFading(false);
    }, 150);
  }

  function prev(e: React.MouseEvent) {
    e.stopPropagation();
    setImgIndex((i) => (i - 1 + images.length) % images.length);
  }

  function next(e: React.MouseEvent) {
    e.stopPropagation();
    setImgIndex((i) => (i + 1) % images.length);
  }

  function handleAdd() {
    addToCart(
      {
        id: item.id,
        name: item.name,
        price: item.promo_price,
        category: "club-jerseys",
        image: images[0],
        images: images.length > 1 ? images : undefined,
        colors: hasColors ? colors : undefined,
        badge: "PROMO",
      },
      selectedColor
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <>
      <div className="bg-card border border-card-border rounded-xl overflow-hidden group hover:border-red-400 transition-colors">
        {/* Image area */}
        <div
          className="relative aspect-square overflow-hidden bg-muted cursor-zoom-in"
          onClick={() => setLightbox(true)}
        >
          <img
            src={images[imgIndex]}
            alt={item.name}
            className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
              fading ? "opacity-0" : "opacity-100"
            }`}
          />

          {/* Discount badge */}
          <div className="absolute top-2 left-2">
            <DiscountBadge original={item.original_price} promo={item.promo_price} />
          </div>

          {/* Carousel controls */}
          {multiImage && (
            <>
              <button
                onClick={prev}
                className="absolute left-1 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                onClick={next}
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight size={14} />
              </button>
              <div className="absolute bottom-1.5 left-0 right-0 flex justify-center gap-1 pointer-events-none">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setImgIndex(i); }}
                    className={`w-1.5 h-1.5 rounded-full transition-all pointer-events-auto ${
                      i === imgIndex ? "bg-white" : "bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Selected color pill */}
          {selectedColor && hasColors && (
            <span
              className="absolute bottom-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/30 shadow"
              style={{
                backgroundColor: getColorHex(selectedColor),
                color: isLightColor(selectedColor) ? "#333" : "#fff",
              }}
            >
              {selectedColor}
            </span>
          )}
        </div>

        {/* Card body */}
        <div className="p-3.5">
          <h3 className="font-semibold text-sm text-foreground whitespace-pre-line mb-2 leading-snug">
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

          {/* Color swatches */}
          {hasColors && (
            <div className="mb-3">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-semibold mb-1.5">
                Colour — tap to pick
              </p>
              <ColorSwatches
                colors={colors}
                selected={selectedColor}
                onSelect={handleColorSelect}
                size="sm"
              />
            </div>
          )}

          <button
            onClick={handleAdd}
            className={`w-full flex items-center justify-center gap-2 text-sm font-semibold py-2.5 rounded-lg transition-all duration-200 ${
              added
                ? "bg-[#16a34a] text-white"
                : "bg-[#0a0a0a] hover:bg-[#22c55e] text-white hover:text-black"
            }`}
          >
            {added ? (
              <><CheckCircle size={14} /> Added!</>
            ) : (
              <><ShoppingBag size={14} /> Add to Cart</>
            )}
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/92 flex items-center justify-center p-4"
          onClick={() => setLightbox(false)}
        >
          <button
            className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/80 rounded-full p-2 z-10"
            onClick={() => setLightbox(false)}
          >
            <X size={20} />
          </button>
          <img
            src={images[imgIndex]}
            alt={item.name}
            className="max-w-full max-h-[88vh] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{ touchAction: "pinch-zoom" }}
          />
          {multiImage && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(e); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 text-white rounded-full p-2.5"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(e); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 text-white rounded-full p-2.5"
              >
                <ChevronRight size={22} />
              </button>
              <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setImgIndex(i); }}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      i === imgIndex ? "bg-white scale-110" : "bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default function PromoPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = usePromo(id);

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
        {promo.banner_image && <div className="absolute inset-0 bg-black/60" />}
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
          <h1 className="font-display text-5xl md:text-6xl text-white mb-3">{promo.title}</h1>
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
              {items.map((item) => (
                <PromoProductCard key={item.id} item={item} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
