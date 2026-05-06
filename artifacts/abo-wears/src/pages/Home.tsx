import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ShoppingBag, Star, ChevronRight } from "lucide-react";
import { PRODUCTS, formatPrice } from "@/data/products";
import { storeImg, arsenalJerseysImg, multiClubJerseysImg, nigeriaJerseyImg } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { SearchBar } from "@/components/SearchBar";
import { useProducts, useCategories } from "@/hooks/useProducts";
import { trackPageView } from "@/lib/supabase";

const REVIEWS = [
  { name: "Tunde A.",    location: "Lagos",    text: "Got my Arsenal retro jersey in 2 days. Quality is amazing, looks exactly as pictured. ABO Wears never disappoints!", rating: 5 },
  { name: "Chiamaka O.", location: "Ibadan",   text: "Ordered joggers and shorts. Great fit, great price. I've already recommended this store to my friends.", rating: 5 },
  { name: "Emeka R.",    location: "Ile-Ife",  text: "Super Eagles jersey arrived fast and the quality is top notch. Very affordable. Will definitely order again!", rating: 5 },
  { name: "Fatima B.",   location: "Illesha",  text: "Love the face caps! Got 2 pieces and the delivery was quick. Packaging was neat. Trusted vendor for sure.", rating: 5 },
  { name: "Seun M.",     location: "Osogbo",   text: "Man City jersey looks premium. Price is the best I've found anywhere. ABO Wears is the real deal.", rating: 5 },
  { name: "Biodun K.",   location: "Ekiti",    text: "Placed my order on WhatsApp, got my NFL jersey within days. Great communication and the quality exceeded my expectations!", rating: 5 },
];

const WHY_CHOOSE = [
  { icon: "💰", title: "Affordable Prices", desc: "Jerseys, joggers & more at prices that won't break the bank." },
  { icon: "⭐", title: "Quality Products",  desc: "Every item is carefully selected to meet high quality standards." },
  { icon: "⚡", title: "Fast Response",     desc: "We respond quickly on WhatsApp. Place your order today!" },
  { icon: "✅", title: "Trusted Vendor",    desc: "Hundreds of happy customers across Nigeria trust ABO Wears." },
];

const HOW_TO_BUY = [
  { step: "1", title: "Browse & Pick",  desc: "Browse our catalog and pick the items you love." },
  { step: "2", title: "Add to Cart",    desc: "Add selected items to your cart." },
  { step: "3", title: "Click Buy Now",  desc: "Go to cart and click the Buy Now button." },
  { step: "4", title: "Send via WhatsApp", desc: "Your order is pre-filled — just hit send!" },
  { step: "5", title: "Make Payment",   desc: "You'll receive account details for payment." },
  { step: "6", title: "Send Receipt",   desc: "Send your payment receipt to confirm your order." },
];

const HERO_CATEGORIES = [
  { label: "Jerseys",   href: "/jerseys",   emoji: "⚽" },
  { label: "Joggers",   href: "/joggers",   emoji: "👟" },
  { label: "Shorts",    href: "/shorts",    emoji: "🩳" },
  { label: "Face Caps", href: "/face-caps", emoji: "🧢" },
  { label: "GYM Wears", href: "/gloves",    emoji: "🥊" },
];

const SHOWCASE = [
  { img: arsenalJerseysImg,    label: "Club Jerseys",        href: "/jerseys" },
  { img: multiClubJerseysImg,  label: "All Teams Available", href: "/jerseys" },
  { img: nigeriaJerseyImg,     label: "Country Jerseys",     href: "/jerseys" },
  { img: storeImg,             label: "Browse Full Store",   href: "/jerseys" },
];

const FEATURED_PRODUCTS = PRODUCTS.filter((p) => p.badge).slice(0, 4);

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: allProducts = PRODUCTS } = useProducts();
  const { data: categories = [] } = useCategories();

  useEffect(() => {
    trackPageView("/");
  }, []);

  const searchResults = searchQuery.trim()
    ? allProducts.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const featuredProducts = allProducts.filter((p) => p.badge).slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-[#0a0a0a] text-white overflow-hidden min-h-[85vh] flex items-center">
        <img src={storeImg} alt="ABO Wears store" className="absolute inset-0 w-full h-full object-cover object-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-[#0a0a0a]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 via-transparent to-[#0a0a0a]/40" />
        <div className="relative w-full max-w-6xl mx-auto px-4 py-20 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-[#22c55e]/20 border border-[#22c55e]/40 text-[#22c55e] text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
            Now Accepting Orders
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-white leading-none mb-5">
            All Things Jersey<br />
            <span className="text-[#22c55e]">@ Prices You'll Love</span>
          </h1>
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto mb-10 font-sans">
            Retro Jerseys, club kits, country jerseys, NFL, Basketball & Baseball jerseys, joggers, shorts, face caps & GYM wears — quality gear delivered to your door.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {HERO_CATEGORIES.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="flex items-center gap-2 bg-white/10 hover:bg-[#22c55e] hover:text-black text-white font-bold px-6 py-3.5 rounded-full text-sm md:text-base transition-all duration-200 border border-white/20 hover:border-[#22c55e] backdrop-blur-sm hover:scale-105"
              >
                <span>{cat.emoji}</span>
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Strip */}
      <section className="bg-[#0a0a0a] pb-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {SHOWCASE.map((item, i) => (
              <Link key={i} href={item.href} className="relative group overflow-hidden rounded-xl aspect-square block">
                <img src={item.img} alt={item.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <span className="absolute bottom-3 left-3 right-3 text-white font-barlow font-700 text-sm uppercase tracking-wide leading-tight">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Category Nav */}
      <section className="bg-[#111111] py-6 border-y border-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 gap-2.5 max-w-xl mx-auto">
            {categories.length > 0
              ? (categories as Array<{ id: string; label: string; icon: string; href: string }>).map((c) => (
                  <Link
                    key={c.id}
                    href={c.href}
                    className="flex items-center justify-center gap-2 bg-[#1a1a1a] hover:bg-[#22c55e] hover:text-black text-white border border-gray-700 hover:border-[#22c55e] rounded-xl px-4 py-3 transition-all text-sm font-semibold text-center"
                  >
                    {c.icon} {c.label}
                  </Link>
                ))
              : /* Static fallback — arranged 2 per row, paired by type */
                [
                  { label: "⚽ Retro Jerseys",      href: "/jerseys" },
                  { label: "🏆 Club Jerseys",        href: "/jerseys" },
                  { label: "🌍 Country Jerseys",     href: "/jerseys" },
                  { label: "🏈 NFL Jerseys",         href: "/jerseys" },
                  { label: "🏀 Basketball Jerseys",  href: "/jerseys" },
                  { label: "⚾ Baseball Jerseys",    href: "/jerseys" },
                  { label: "👟 Joggers",             href: "/joggers" },
                  { label: "🩳 Shorts",              href: "/shorts" },
                  { label: "🧢 Face Caps",           href: "/face-caps" },
                  { label: "🥊 GYM Wears",          href: "/gloves" },
                ].map((c) => (
                  <Link
                    key={c.href + c.label}
                    href={c.href}
                    className="flex items-center justify-center gap-2 bg-[#1a1a1a] hover:bg-[#22c55e] hover:text-black text-white border border-gray-700 hover:border-[#22c55e] rounded-xl px-4 py-3 transition-all text-sm font-semibold text-center"
                  >
                    {c.label}
                  </Link>
                ))}
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="py-8 px-4 max-w-6xl mx-auto">
        <SearchBar
          placeholder="Search all products — jerseys, gym wears, caps and more..."
          onSearch={setSearchQuery}
          className="max-w-xl mx-auto"
        />
        {searchQuery.trim() && (
          <div className="mt-6">
            <h3 className="font-display text-2xl text-foreground mb-4">
              {searchResults.length > 0
                ? `${searchResults.length} result${searchResults.length !== 1 ? "s" : ""} for "${searchQuery}"`
                : `No results for "${searchQuery}"`}
            </h3>
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {searchResults.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">Try searching for a team name, sport, or product type.</p>
            )}
          </div>
        )}
      </section>

      {/* Featured Products */}
      {!searchQuery.trim() && (
        <section className="py-6 px-4 max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-4xl text-foreground">Featured Items</h2>
              <p className="text-muted-foreground text-sm mt-1">Our most popular picks</p>
            </div>
            <Link href="/jerseys" className="flex items-center gap-1 text-[#22c55e] text-sm font-semibold hover:underline">
              See All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {(featuredProducts.length > 0 ? featuredProducts : FEATURED_PRODUCTS).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* How to Buy */}
      <section className="bg-[#0a0a0a] text-white py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-4xl text-white">How to Order</h2>
            <p className="text-gray-400 text-sm mt-2">Simple steps to get your gear delivered</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {HOW_TO_BUY.map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 rounded-full bg-[#22c55e] text-black font-display text-2xl flex items-center justify-center mx-auto mb-3">{step.step}</div>
                <h3 className="font-barlow font-700 text-sm uppercase tracking-wide text-white mb-1">{step.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 bg-[#22c55e]/10 border border-[#22c55e]/30 rounded-xl p-5 text-center max-w-xl mx-auto">
            <p className="text-[#22c55e] text-sm font-medium">
              📩 After sending your order, you'll receive account details for payment. Send your receipt to confirm your order.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-14 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-display text-4xl text-foreground">Why Choose ABO Wears?</h2>
          <p className="text-muted-foreground text-sm mt-2">We're built on trust, quality, and great prices</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {WHY_CHOOSE.map((item, i) => (
            <div key={i} className="bg-card border border-card-border rounded-xl p-6 text-center hover:border-[#22c55e] transition-colors group">
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="font-barlow font-700 text-base uppercase tracking-wide text-foreground mb-2 group-hover:text-[#22c55e] transition-colors">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-[#0a0a0a] py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-4xl text-white">What Our Customers Say</h2>
            <p className="text-gray-400 text-sm mt-2">Real reviews from happy customers across Nigeria</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {REVIEWS.map((review, i) => (
              <div key={i} className="bg-[#111111] border border-gray-800 rounded-xl p-5 hover:border-[#22c55e]/50 transition-colors">
                <div className="flex items-center gap-0.5 mb-3">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} size={13} className="text-[#22c55e] fill-[#22c55e]" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">"{review.text}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#22c55e] flex items-center justify-center text-black font-bold text-sm">{review.name[0]}</div>
                  <div>
                    <p className="text-white font-semibold text-sm">{review.name}</p>
                    <p className="text-gray-500 text-xs">{review.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-5xl text-foreground mb-4">Ready to Order?</h2>
          <p className="text-muted-foreground mb-8">Browse our full collection and order via WhatsApp in minutes.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/jerseys" className="inline-flex items-center justify-center gap-2 bg-[#0a0a0a] hover:bg-[#22c55e] text-white hover:text-black font-bold px-8 py-3.5 rounded-full text-base transition-all">
              ⚽ Shop Jerseys
            </Link>
            <Link href="/cart" className="inline-flex items-center justify-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] text-black font-bold px-8 py-3.5 rounded-full text-base transition-all">
              <ShoppingBag size={16} /> View Cart
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
