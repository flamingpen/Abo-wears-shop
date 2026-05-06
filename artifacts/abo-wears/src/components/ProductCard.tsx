import { ShoppingCart, CheckCircle } from "lucide-react";
import { useState } from "react";
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
    product.colors && product.colors.length > 0 ? product.colors[0] : undefined
  );
  const [fading, setFading] = useState(false);

  const displayImage =
    (selectedColor && product.colorImages?.[selectedColor]) || product.image;

  function handleColorSelect(color: string) {
    if (color === selectedColor) return;
    const nextImage = product.colorImages?.[color] || product.image;
    const currentImage = (selectedColor && product.colorImages?.[selectedColor]) || product.image;
    if (nextImage !== currentImage) {
      setFading(true);
      setTimeout(() => {
        setSelectedColor(color);
        setFading(false);
      }, 160);
    } else {
      setSelectedColor(color);
    }
  }

  function handleAdd() {
    addToCart(product, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  const hasColors = product.colors && product.colors.length > 0;

  return (
    <div className="product-card bg-card rounded-xl overflow-hidden border border-card-border group" data-testid={`card-product-${product.id}`}>
      <div className="relative overflow-hidden aspect-square bg-muted">
        <img
          src={displayImage}
          alt={product.name}
          className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-300 ${fading ? "opacity-0" : "opacity-100"}`}
          loading="lazy"
        />
        {product.badge && (
          <span className="absolute top-2 left-2 bg-[#22c55e] text-black text-xs font-bold px-2 py-0.5 rounded-full">
            {product.badge}
          </span>
        )}
        {selectedColor && hasColors && (
          <span
            className="absolute bottom-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/30 shadow"
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
        <h3 className="font-semibold text-sm text-foreground leading-tight line-clamp-2 mb-1.5" data-testid={`text-product-name-${product.id}`}>
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
            <>
              <CheckCircle size={15} />
              Added!
            </>
          ) : (
            <>
              <ShoppingCart size={15} />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}
