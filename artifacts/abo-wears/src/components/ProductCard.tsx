import { ShoppingCart, CheckCircle } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/data/products";
import { formatPrice } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { ColorSwatches } from "@/components/ColorSwatches";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="product-card bg-card rounded-xl overflow-hidden border border-card-border group" data-testid={`card-product-${product.id}`}>
      <div className="relative overflow-hidden aspect-square bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {product.badge && (
          <span className="absolute top-2 left-2 bg-[#22c55e] text-black text-xs font-bold px-2 py-0.5 rounded-full">
            {product.badge}
          </span>
        )}
      </div>
      <div className="p-3.5">
        <h3 className="font-semibold text-sm text-foreground leading-tight line-clamp-2 mb-1.5" data-testid={`text-product-name-${product.id}`}>
          {product.name}
        </h3>
        <p className="text-[#22c55e] font-bold text-base mb-1" data-testid={`text-price-${product.id}`}>
          {formatPrice(product.price)}
        </p>
        {product.colors && product.colors.length > 0 && (
          <ColorSwatches colors={product.colors} />
        )}
        <button
          onClick={handleAdd}
          className={`w-full flex items-center justify-center gap-2 text-sm font-semibold py-2.5 rounded-lg transition-all duration-200 mt-3 ${
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
