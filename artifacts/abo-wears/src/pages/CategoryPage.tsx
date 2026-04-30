import { PRODUCTS, formatPrice, CATEGORIES } from "@/data/products";
import type { Category } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

interface CategoryPageProps {
  category: Category;
}

export default function CategoryPage({ category }: CategoryPageProps) {
  const products = PRODUCTS.filter((p) => p.category === category);
  const catInfo = CATEGORIES.find((c) => c.id === category);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-[#0a0a0a] text-white py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-3xl mb-2">{catInfo?.icon}</div>
          <h1 className="font-display text-5xl md:text-6xl text-white mb-2">{catInfo?.label}</h1>
          <p className="text-gray-400">{catInfo?.description}</p>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <p className="text-muted-foreground text-sm mb-6">
          {products.length} products available
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
