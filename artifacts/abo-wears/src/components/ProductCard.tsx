import { ShoppingCart, CheckCircle, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import type { Product } from "@/data/products";
import { formatPrice } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { ColorSwatches } from "@/components/ColorSwatches";
import { getColorHex, isLightColor } from "@/lib/colors";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.colors?.[0]
  );
  const [fading, setFading] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const displayImages = useMemo(() => {
    if (selectedColor && product.colorImages?.[selectedColor]?.length) {
      return product.colorImages[selectedColor];
    }
    if (product.images?.length) return product.images;
    return [product.image];
  }, [selectedColor, product]);

  useEffect(() => { setImgIndex(0); }, [displayImages]);

  function handleColorSelect(color: string) {
    if (color === selectedColor) return;
    setFading(true);
    setTimeout(() => {
      setSelectedColor(color);
      setFading(false);
    }, 160);
  }

  function handleAdd() {
    addToCart(product, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  function prev(e: React.MouseEvent) {
    e.stopPropagation();
    setImgIndex((i) => (i - 1 + displayImages.length) % displayImages.length);
  }

  function next(e: React.MouseEvent) {
    e.stopPropagation();
    setImgIndex((i) => (i + 1) % displayImages.length);
  }

  const hasColors = product.colors && product.colors.length > 0;
  const multiImage = displayImages.length > 1;

  return (
    <>
      <div className="product-card bg-card rounded-xl overflow-hidden border border-card-border group" data-testid={`card-product-${product.id}`}>
        <div className="relative overflow-hidden aspect-square bg-muted">
          <img
            src={displayImages[imgIndex]}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-300 cursor-zoom-in ${fading ? "opacity-0" : "opacity-100"}`}
            loading="lazy"
            onClick={() => setLightbox(true)}
          />

          {product.badge && (
            <span className="absolute top-1.5 right-1.5 bg-[#22c55e] text-black text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-tight">
              {product.badge}
            </span>
          )}

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
                {displayImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setImgIndex(i); }}
                    className={`w-1.5 h-1.5 rounded-full transition-all pointer-events-auto ${i === imgIndex ? "bg-white" : "bg-white/40"}`}
                  />
                ))}
              </div>
            </>
          )}

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

        <div className="p-3.5">
          <h3
            className="font-semibold text-sm text-foreground leading-tight mb-1.5 whitespace-pre-line line-clamp-4"
            data-testid={`text-product-name-${product.id}`}
          >
            {product.name}
          </h3>
          <p className="text-[#22c55e] font-bold text-base mb-2" data-testid={`text-price-${product.id}`}>
            {formatPrice(product.price)}
          </p>

          {hasColors && (
            <div className="mb-3">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-semibold mb-1.5">
                Colour — tap to pick
              </p>
              <ColorSwatches
                colors={product.colors!}
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
            data-testid={`button-add-cart-${product.id}`}
          >
            {added ? (
              <><CheckCircle size={15} /> Added!</>
            ) : (
              <><ShoppingCart size={15} /> Add to Cart</>
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
            src={displayImages[imgIndex]}
            alt={product.name}
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
                {displayImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setImgIndex(i); }}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${i === imgIndex ? "bg-white scale-110" : "bg-white/40"}`}
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
