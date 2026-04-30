import { Link } from "wouter";
import { ShoppingBag, Star, Shield, Zap, CheckCircle, ChevronRight } from "lucide-react";
import { CATEGORIES, PRODUCTS, formatPrice, WHATSAPP_NUMBER } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

const REVIEWS = [
  { name: "Tunde A.", location: "Lagos", text: "Got my Arsenal retro jersey in 2 days. Quality is amazing, looks exactly as pictured. Abo Wears never disappoints!", rating: 5 },
  { name: "Chiamaka O.", location: "Ibadan", text: "Ordered joggers and shorts. Great fit, great price. I've already recommended this store to my friends.", rating: 5 },
  { name: "Emeka R.", location: "Ile-Ife", text: "Super Eagles jersey arrived fast and the quality is top notch. Very affordable. Will definitely order again!", rating: 5 },
  { name: "Fatima B.", location: "Abuja", text: "Love the face caps! Got 2 pieces and the delivery was quick. Packaging was neat. Trusted vendor for sure.", rating: 5 },
  { name: "Seun M.", location: "Port Harcourt", text: "Man City jersey looks premium. Price is the best I've found anywhere. Abo Wears is the real deal.", rating: 5 },
];

const WHY_CHOOSE = [
  { icon: "💰", title: "Affordable Prices", desc: "Jerseys, joggers & more at prices that won't break the bank." },
  { icon: "⭐", title: "Quality Products", desc: "Every item is carefully selected to meet high quality standards." },
  { icon: "⚡", title: "Fast Response", desc: "We respond quickly on WhatsApp. Place your order today!" },
  { icon: "✅", title: "Trusted Vendor", desc: "Hundreds of happy customers across Nigeria trust Abo Wears." },
];

const HOW_TO_BUY = [
  { step: "1", title: "Browse & Pick", desc: "Browse our catalog and pick the items you love." },
  { step: "2", title: "Add to Cart", desc: "Add selected items to your cart." },
  { step: "3", title: "Click Buy Now", desc: "Go to cart and click the Buy Now button." },
  { step: "4", title: "Send via WhatsApp", desc: "Your order is pre-filled — just hit send!" },
  { step: "5", title: "Make Payment", desc: "You'll receive account details for payment." },
  { step: "6", title: "Send Receipt", desc: "Send your payment receipt to confirm your order." },
];

const FEATURED_PRODUCTS = PRODUCTS.filter((p) => p.badge).slice(0, 4);

const JERSEY_CATEGORIES = [
  { id: "retro-jerseys", label: "Retro Jerseys" },
  { id: "club-jerseys", label: "Club Jerseys" },
  { id: "country-jerseys", label: "Country Jerseys" },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-[#0a0a0a] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 30% 60%, #22c55e 0%, transparent 60%), radial-gradient(circle at 80% 20%, #16a34a 0%, transparent 50%)" }} />
        <div className="absolute inset-0" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&auto=format&fit=crop')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.12 }} />

        <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-[#22c55e]/20 border border-[#22c55e]/40 text-[#22c55e] text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
            Now Accepting Orders
          </div>

          <h1 className="font-display text-5xl md:text-7xl text-white leading-none mb-5">
            All Things Jersey<br />
            <span className="text-[#22c55e]">@ Prices You'll Love</span>
          </h1>

          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto mb-8 font-sans">
            Retro jerseys, club kits, national team jerseys, joggers, shorts & face caps. Quality gear at unbeatable prices — order via WhatsApp in minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/jerseys"
              className="inline-flex items-center justify-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] text-black font-bold px-8 py-3.5 rounded-full text-base transition-all hover:scale-105"
              data-testid="hero-shop-now-button"
            >
              <ShoppingBag size={18} />
              Shop Now
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20Abo%20Wears%2C%20I%20want%20to%20see%20your%20catalog`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-full text-base transition-all border border-white/20"
              data-testid="hero-whatsapp-button"
            >
              💬 Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Category Buttons */}
      <section className="bg-[#111111] py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {/* Jersey categories link to /jerseys */}
            {JERSEY_CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href="/jerseys"
                className="flex flex-col items-center gap-2 bg-[#1a1a1a] hover:bg-[#22c55e] hover:text-black text-white border border-gray-800 hover:border-[#22c55e] rounded-xl p-4 transition-all group text-center"
                data-testid={`category-button-${cat.id}`}
              >
                <span className="text-2xl">⚽</span>
                <span className="font-barlow text-xs font-600 uppercase tracking-wide leading-tight">{cat.label}</span>
              </Link>
            ))}
            <Link href="/joggers" className="flex flex-col items-center gap-2 bg-[#1a1a1a] hover:bg-[#22c55e] hover:text-black text-white border border-gray-800 hover:border-[#22c55e] rounded-xl p-4 transition-all group text-center" data-testid="category-button-joggers">
              <span className="text-2xl">👟</span>
              <span className="font-barlow text-xs font-600 uppercase tracking-wide">Joggers</span>
            </Link>
            <Link href="/shorts" className="flex flex-col items-center gap-2 bg-[#1a1a1a] hover:bg-[#22c55e] hover:text-black text-white border border-gray-800 hover:border-[#22c55e] rounded-xl p-4 transition-all group text-center" data-testid="category-button-shorts">
              <span className="text-2xl">🩳</span>
              <span className="font-barlow text-xs font-600 uppercase tracking-wide">Shorts</span>
            </Link>
            <Link href="/face-caps" className="flex flex-col items-center gap-2 bg-[#1a1a1a] hover:bg-[#22c55e] hover:text-black text-white border border-gray-800 hover:border-[#22c55e] rounded-xl p-4 transition-all group text-center" data-testid="category-button-face-caps">
              <span className="text-2xl">🧢</span>
              <span className="font-barlow text-xs font-600 uppercase tracking-wide">Face Caps</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-14 px-4 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-4xl text-foreground">Featured Items</h2>
            <p className="text-muted-foreground text-sm mt-1">Our most popular picks</p>
          </div>
          <Link href="/jerseys" className="flex items-center gap-1 text-[#22c55e] text-sm font-semibold hover:underline" data-testid="see-all-link">
            See All <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {FEATURED_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* How to Buy */}
      <section className="bg-[#0a0a0a] text-white py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-4xl text-white">How to Order</h2>
            <p className="text-gray-400 text-sm mt-2">Simple steps to get your gear delivered</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {HOW_TO_BUY.map((step, i) => (
              <div key={i} className="text-center" data-testid={`step-${step.step}`}>
                <div className="w-12 h-12 rounded-full bg-[#22c55e] text-black font-display text-2xl flex items-center justify-center mx-auto mb-3">
                  {step.step}
                </div>
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
          <h2 className="font-display text-4xl text-foreground">Why Choose Abo Wears?</h2>
          <p className="text-muted-foreground text-sm mt-2">We're built on trust, quality, and great prices</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {WHY_CHOOSE.map((item, i) => (
            <div key={i} className="bg-card border border-card-border rounded-xl p-6 text-center hover:border-[#22c55e] transition-colors group" data-testid={`why-choose-${i}`}>
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
              <div key={i} className="bg-[#111111] border border-gray-800 rounded-xl p-5 hover:border-[#22c55e]/50 transition-colors" data-testid={`review-${i}`}>
                <div className="flex items-center gap-0.5 mb-3">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} size={13} className="text-[#22c55e] fill-[#22c55e]" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">"{review.text}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#22c55e] flex items-center justify-center text-black font-bold text-sm">
                    {review.name[0]}
                  </div>
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

      {/* CTA Banner */}
      <section className="py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-5xl text-foreground mb-4">Ready to Order?</h2>
          <p className="text-muted-foreground mb-8">Browse our full collection and order via WhatsApp in minutes.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/jerseys"
              className="inline-flex items-center justify-center gap-2 bg-[#0a0a0a] hover:bg-[#22c55e] text-white hover:text-black font-bold px-8 py-3.5 rounded-full text-base transition-all"
              data-testid="cta-shop-jerseys"
            >
              Shop Jerseys
            </Link>
            <Link
              href="/cart"
              className="inline-flex items-center justify-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] text-black font-bold px-8 py-3.5 rounded-full text-base transition-all"
              data-testid="cta-view-cart"
            >
              View Cart
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
